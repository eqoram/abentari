CREATE OR REPLACE FUNCTION
public.triggerfunction_auth_insert_before()
RETURNS TRIGGER set search_path = '' AS

$$
declare
 cnt integer;
begin

  IF(NEW.raw_user_meta_data::json->>'inviteprofile' = 'none') THEN

    IF ((NOT EXISTS (SELECT FROM public.xusers usr WHERE usr.invite_open = true AND usr.invite_email = NEW.email AND usr.invite_secret = NEW.raw_user_meta_data::json->>'invitesecret'))   ) THEN
      raise exception 'INCORRECT_SECRET';
    END IF;

  ELSE

    IF ((EXISTS (SELECT FROM public.profiles pro WHERE pro.is_active = true AND pro.is_public = true AND pro.id::text = NEW.raw_user_meta_data::json->>'inviteprofile'))   ) THEN
      EXECUTE format('INSERT INTO public.xusers (profile_id, invite_email, invite_open, is_active, is_public, invite_secret) VALUES (%L, %L, %L, %L, %L, %L);', NEW.raw_user_meta_data::json->>'inviteprofile', NEW.email, true, true, true, NOW());
    ELSE
      raise exception 'INCORRECT_PROFILE';
    END IF;

  END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;




CREATE OR REPLACE FUNCTION
public.triggerfunction_auth_insert_after()
RETURNS TRIGGER set search_path = '' AS

$$
declare
 cnt integer;
 oldrecord1 jsonb;
 oldrecord2 jsonb;
 record1 jsonb;
 record2 jsonb;
begin

    SELECT to_jsonb(u) INTO oldrecord1
    FROM public.xusers u
    WHERE u.invite_email = NEW.email;

    SELECT to_jsonb(u) INTO oldrecord2
    FROM public.c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413 u
    WHERE u.xuser_id = (SELECT id FROM public.xusers WHERE invite_email = NEW.email)::text;

    SET LOCAL session_replication_role = replica;
    UPDATE public.xusers
    SET user_id = NEW.id, invite_open = false
    WHERE invite_email = NEW.email;
    SET LOCAL session_replication_role = DEFAULT;

    -- INSERT INTO public.c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413 (user_id, name, email, owner_id)
    -- VALUES (NEW.id, NEW.email, NEW.email, NEW.id);

    SET LOCAL session_replication_role = replica;
    UPDATE public.c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413
    SET user_id = NEW.id, owner_id = (SELECT id FROM public.xusers WHERE invite_email = NEW.email), email = NEW.email, name = CASE 
             WHEN (name IS NULL OR name = '') THEN NEW.email 
             ELSE name 
           END
    WHERE xuser_id = (SELECT id FROM public.xusers WHERE invite_email = NEW.email)::text; 
    SET LOCAL session_replication_role = DEFAULT;

    -- record1 := to_jsonb(SELECT * FROM public.xusers WHERE invite_email = NEW.email);
    SELECT to_jsonb(u) INTO record1
        FROM public.xusers u
        WHERE u.invite_email = NEW.email;
    EXECUTE format('INSERT INTO public.%I (parent_id, changed_at, changed_by, action, oldrecord, newrecord) VALUES (%L,%L,%L,%L,%L,%L);' , 'i_xusers', (SELECT id FROM public.xusers WHERE invite_email = NEW.email), NOW(), '11111111-1111-1111-1111-111111111111'::uuid, 'UPDATE', oldrecord1, record1);

    -- record2 := to_jsonb(SELECT * FROM public.c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413 WHERE xuser_id = (SELECT id FROM public.xusers WHERE invite_email = NEW.email));
    SELECT to_jsonb(u) INTO record2
        FROM public.c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413 u
        WHERE u.xuser_id = (SELECT id FROM public.xusers WHERE invite_email = NEW.email)::text;
    -- EXECUTE format('INSERT INTO public.%I (parent_id, changed_at, changed_by, action, record) VALUES (%L,%L,%L,%L,%L);' , 'h_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413', (SELECT id FROM public.c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413 WHERE xuser_id = (SELECT id FROM public.xusers WHERE invite_email = NEW.email)), NOW(), '11111111-1111-1111-1111-111111111111'::uuid, 'UPDATE', record2);
    IF FOUND THEN
        EXECUTE format('INSERT INTO public.%I (parent_id, changed_at, changed_by, action, oldrecord, newrecord) VALUES (%L,%L,%L,%L,%L,%L);' , 'h_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413', (SELECT id FROM public.c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413 WHERE xuser_id = (SELECT id FROM public.xusers WHERE invite_email = NEW.email)::text), NOW(), '11111111-1111-1111-1111-111111111111'::uuid, 'UPDATE', oldrecord2, record2);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;




CREATE OR REPLACE FUNCTION
public.triggerfunction_objects_insert_after()
RETURNS TRIGGER set search_path = '' AS

$$
declare
 cnt integer;
 l_historyname text;
begin

    EXECUTE format('CREATE TABLE public.%I (
        id uuid not null default gen_random_uuid (),
        created_at timestamp with time zone not null default now(),
        created_by uuid null,
        modified_at timestamp with time zone null,
        modified_by uuid null,
        name text not null,
        owner_id uuid not null,
        search tsvector GENERATED ALWAYS AS (to_tsvector(''english'', name)) STORED,
        constraint %I_pk primary key (id)
    ) tablespace pg_default;', NEW.api_name, NEW.api_name);
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY;', NEW.api_name);

    EXECUTE format('create index %I on public.%I USING GIN (search);', CONCAT(NEW.api_name, '_search'), NEW.api_name);

    -- SELECT
    EXECUTE format(
        'DROP POLICY IF EXISTS "pal_%I" ON public.%I;
        CREATE POLICY "pal_%I" ON public.%I FOR SELECT TO authenticated
        USING (
            EXISTS (
                SELECT 1 FROM public.get_authenticated_context(%L, %L) ctx
                WHERE ctx.mfa_passed AND (ctx.has_setup_perm OR ctx.has_all_perm OR (ctx.has_owner_perm AND ctx.xuser_id = owner_id))
            )
        );', 
        NEW.api_name, NEW.api_name, NEW.api_name, NEW.api_name, 
        NEW.api_name || '.all.select', NEW.api_name || '.owner.select'
    );

    -- INSERT
    EXECUTE format(
        'DROP POLICY IF EXISTS "pai_%I" ON public.%I;
        CREATE POLICY "pai_%I" ON public.%I FOR INSERT TO authenticated
        WITH CHECK (
            EXISTS (
                SELECT 1 FROM public.get_authenticated_context(%L, %L) ctx
                WHERE ctx.mfa_passed AND (ctx.has_setup_perm OR ctx.has_all_perm OR (ctx.has_owner_perm AND ctx.xuser_id = owner_id))
            )
        );', 
        NEW.api_name, NEW.api_name, NEW.api_name, NEW.api_name, 
        NEW.api_name || '.all.insert', NEW.api_name || '.owner.insert'
    );

    -- UPDATE
    EXECUTE format(
        'DROP POLICY IF EXISTS "pau_%I" ON public.%I;
        CREATE POLICY "pau_%I" ON public.%I FOR UPDATE TO authenticated
        USING (
            EXISTS (
                SELECT 1 FROM public.get_authenticated_context(%L, %L) ctx
                WHERE ctx.mfa_passed AND (ctx.has_setup_perm OR ctx.has_all_perm OR (ctx.has_owner_perm AND ctx.xuser_id = owner_id))
            )
        )
        WITH CHECK (
            EXISTS (
                SELECT 1 FROM public.get_authenticated_context(%L, %L) ctx
                WHERE ctx.mfa_passed AND (ctx.has_setup_perm OR ctx.has_all_perm OR (ctx.has_owner_perm AND ctx.xuser_id = owner_id))
            )
        );', 
        NEW.api_name, NEW.api_name, NEW.api_name, NEW.api_name, 
        NEW.api_name || '.all.update', NEW.api_name || '.owner.update',
        NEW.api_name || '.all.update', NEW.api_name || '.owner.update'
    );

    -- DELETE
    EXECUTE format(
        'DROP POLICY IF EXISTS "pad_%I" ON public.%I;
        CREATE POLICY "pad_%I" ON public.%I FOR DELETE TO authenticated
        USING (
            EXISTS (
                SELECT 1 FROM public.get_authenticated_context(%L, %L) ctx
                WHERE ctx.mfa_passed AND (ctx.has_setup_perm OR ctx.has_all_perm OR (ctx.has_owner_perm AND ctx.xuser_id = owner_id))
            )
        );', 
        NEW.api_name, NEW.api_name, NEW.api_name, NEW.api_name, 
        NEW.api_name || '.all.delete', NEW.api_name || '.owner.delete'
    );

    -- SELECT
    EXECUTE format(
        'DROP POLICY IF EXISTS "pus_%I" ON public.%I;
        CREATE POLICY "pus_%I" ON public.%I FOR SELECT TO anon
        USING (
            EXISTS (
                SELECT 1 FROM public.get_unauth_context(%L, %L) ctx
                WHERE ctx.has_all_perm OR (ctx.has_owner_perm AND owner_id = ''00000000-0000-0000-0000-000000000000''::uuid)
            )
        );', 
        NEW.api_name, NEW.api_name, NEW.api_name, NEW.api_name, 
        NEW.api_name || '.all.select', NEW.api_name || '.owner.select'
    );

    -- INSERT
    EXECUTE format(
        'DROP POLICY IF EXISTS "pui_%I" ON public.%I;
        CREATE POLICY "pui_%I" ON public.%I FOR INSERT TO anon
        WITH CHECK (
            EXISTS (
                SELECT 1 FROM public.get_unauth_context(%L, %L) ctx
                WHERE ctx.has_all_perm OR (ctx.has_owner_perm AND owner_id = ''00000000-0000-0000-0000-000000000000''::uuid)
            )
        );', 
        NEW.api_name, NEW.api_name, NEW.api_name, NEW.api_name, 
        NEW.api_name || '.all.insert', NEW.api_name || '.owner.insert'
    );

    -- UPDATE
    EXECUTE format(
        'DROP POLICY IF EXISTS "puu_%I" ON public.%I;
        CREATE POLICY "puu_%I" ON public.%I FOR UPDATE TO anon
        USING (
            EXISTS (
                SELECT 1 FROM public.get_unauth_context(%L, %L) ctx
                WHERE ctx.has_all_perm OR (ctx.has_owner_perm AND owner_id = ''00000000-0000-0000-0000-000000000000''::uuid)
            )
        )
        WITH CHECK (
            EXISTS (
                SELECT 1 FROM public.get_unauth_context(%L, %L) ctx
                WHERE ctx.has_all_perm OR (ctx.has_owner_perm AND owner_id = ''00000000-0000-0000-0000-000000000000''::uuid)
            )
        );', 
        NEW.api_name, NEW.api_name, NEW.api_name, NEW.api_name, 
        NEW.api_name || '.all.update', NEW.api_name || '.owner.update',
        NEW.api_name || '.all.update', NEW.api_name || '.owner.update'
    );

    -- DELETE
    EXECUTE format(
        'DROP POLICY IF EXISTS "pud_%I" ON public.%I;
        CREATE POLICY "pud_%I" ON public.%I FOR DELETE TO anon
        USING (
            EXISTS (
                SELECT 1 FROM public.get_unauth_context(%L, %L) ctx
                WHERE ctx.has_all_perm OR (ctx.has_owner_perm AND owner_id = ''00000000-0000-0000-0000-000000000000''::uuid)
            )
        );', 
        NEW.api_name, NEW.api_name, NEW.api_name, NEW.api_name, 
        NEW.api_name || '.all.delete', NEW.api_name || '.owner.delete'
    );
    


    EXECUTE format('INSERT INTO public.permissionoptions (name) VALUES (%L);', CONCAT(NEW.api_name,'.all.select'));
    EXECUTE format('INSERT INTO public.permissionoptions (name) VALUES (%L);', CONCAT(NEW.api_name,'.all.insert'));
    EXECUTE format('INSERT INTO public.permissionoptions (name) VALUES (%L);', CONCAT(NEW.api_name,'.all.update'));
    EXECUTE format('INSERT INTO public.permissionoptions (name) VALUES (%L);', CONCAT(NEW.api_name,'.all.delete'));
    EXECUTE format('INSERT INTO public.permissionoptions (name) VALUES (%L);', CONCAT(NEW.api_name,'.owner.select'));
    EXECUTE format('INSERT INTO public.permissionoptions (name) VALUES (%L);', CONCAT(NEW.api_name,'.owner.insert'));
    EXECUTE format('INSERT INTO public.permissionoptions (name) VALUES (%L);', CONCAT(NEW.api_name,'.owner.update'));
    EXECUTE format('INSERT INTO public.permissionoptions (name) VALUES (%L);', CONCAT(NEW.api_name,'.owner.delete'));

    EXECUTE format('
        DROP TRIGGER IF EXISTS %I_ua ON public.%I;
        CREATE TRIGGER
        %I_ua
        before UPDATE ON public.%I
        FOR EACH ROW
        EXECUTE PROCEDURE
            public.triggerfunction_beforeupdate_checkidandcreatedat();
    ', NEW.api_name, NEW.api_name, NEW.api_name, NEW.api_name);

    EXECUTE format('
        DROP TRIGGER IF EXISTS %I_bi ON public.%I;
        CREATE TRIGGER
        %I_bi
        before INSERT ON public.%I
        FOR EACH ROW
        EXECUTE PROCEDURE
            public.triggerfunction_beforeinsert_overwriteid();
    ', NEW.api_name, NEW.api_name, NEW.api_name, NEW.api_name);

    EXECUTE format('
        DROP TRIGGER IF EXISTS %I_a4 ON public.%I;
        CREATE TRIGGER
        %I_a4
        after INSERT OR UPDATE ON public.%I
        FOR EACH ROW
        EXECUTE PROCEDURE
            public.checkdropdown();
    ', NEW.api_name, NEW.api_name, NEW.api_name, NEW.api_name);

    EXECUTE format('
        DROP TRIGGER IF EXISTS %I_a6 ON public.%I;
        CREATE TRIGGER
        %I_a6
        after INSERT OR UPDATE ON public.%I
        FOR EACH ROW
        EXECUTE PROCEDURE
            public.trigger_checkrequired();
    ', NEW.api_name, NEW.api_name, NEW.api_name, NEW.api_name);

    EXECUTE format('
        DROP TRIGGER IF EXISTS %I_bd ON public.%I;
        CREATE TRIGGER
        %I_bd
        before DELETE ON public.%I
        FOR EACH ROW
        EXECUTE PROCEDURE
            public.deleterelation();
    ', NEW.api_name, NEW.api_name, NEW.api_name, NEW.api_name);


    --history
    if NEW.history = true then
        l_historyname := (SELECT 'h_' || substring(NEW.api_name FROM 3));

        EXECUTE format('INSERT INTO public.objecthistories (api_name, name) VALUES (%L, %L);', l_historyname, NEW.name );

    end if;


    EXECUTE format('INSERT INTO public.appoptions (name, label, type, item_id) VALUES (%L, %L, %L, %L);', NEW.api_name, NEW.name, 'object', NEW.id);

    EXECUTE format('create index %I on public.%I (created_at);', CONCAT(NEW.api_name, '_created_at'), NEW.api_name);

    EXECUTE format('create index %I on public.%I (name);', CONCAT(NEW.api_name, '_name'), NEW.api_name);

    EXECUTE format('create index %I on public.%I (owner_id);', CONCAT(NEW.api_name, '_owner_id'), NEW.api_name);


    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


CREATE OR REPLACE FUNCTION public.trigger_checkrequired()
RETURNS TRIGGER SET search_path = '' AS
$$
declare
    fieldid text;
    my_row RECORD;
    helper text;

    tableid uuid;
    fieldlist public.fields[];
    field public.fields;

    relationmultifieldlist public.fields[];
    relationmultifield public.fields;
begin
    SELECT * from public.objects WHERE api_name = TG_TABLE_NAME INTO my_row;
    -- RAISE EXCEPTION 'SUCC my_row.id : %' , my_row.id;

    IF (my_row.trigger_checkrequired) THEN
        
        -- required
        SELECT ARRAY(SELECT f FROM public.fields f WHERE f.required = true AND f.parent_id = my_row.id) INTO fieldlist;
        FOREACH field IN ARRAY fieldlist
        LOOP

            helper := to_jsonb(NEW) ->> field.api_name;

            IF (field.type != 'display' AND field.api_name != 'user_id') THEN
                IF helper IS NULL OR helper = '' THEN
                    RAISE EXCEPTION 'The field % is required.' , field.name;
                END IF;
            END IF;



        END LOOP;

    END IF;

    RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


CREATE OR REPLACE FUNCTION public.deleterelation()
RETURNS TRIGGER SET search_path = '' AS
$$
declare
    fieldid text;
    my_row RECORD;

    tableid uuid;
    relationfieldlist public.fields[];
    relationfield public.fields;

    relationmultifieldlist public.fields[];
    relationmultifield public.fields;
begin
    PERFORM set_config('app.deleting_id', OLD.id::text, true);
    SELECT * from public.objects WHERE api_name = TG_TABLE_NAME INTO my_row;
    -- RAISE EXCEPTION 'SUCC my_row.id : %' , my_row.id;

    IF (my_row.trigger_deleterelation) THEN
        -- relation
        SELECT ARRAY(SELECT f FROM public.fields f WHERE f.type = 'relation' and f.relation_id = my_row.id) INTO relationfieldlist;
        FOREACH relationfield IN ARRAY relationfieldlist
        LOOP
            
            -- This update triggers checkdropdown()
            EXECUTE format('UPDATE public.%I SET %I = NULL WHERE %I = %L;', relationfield.parent_apiname, relationfield.api_name, relationfield.api_name, OLD.id);

        END LOOP;

        -- relationmulti
        SELECT ARRAY(SELECT f FROM public.fields f WHERE f.type = 'relationmulti' and f.relation_id = my_row.id) INTO relationmultifieldlist;
        FOREACH relationmultifield IN ARRAY relationmultifieldlist
        LOOP

            EXECUTE format('UPDATE public.%I SET %I = NULLIF(ARRAY_REMOVE(%I, %L), ''{}'') WHERE %L = ANY(%I);', relationmultifield.parent_apiname, relationmultifield.api_name, relationmultifield.api_name, OLD.id, OLD.id, relationmultifield.api_name);

        END LOOP;
    END IF;

    RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


CREATE OR REPLACE FUNCTION public.checkdropdown()
RETURNS TRIGGER SET search_path = '' AS
$$
declare
  tableid uuid;
  currently_deleting text;
  my_row RECORD;

  relationfieldlist public.fields[];
  relationfield public.fields;
  relationrowexists bool := false;
  relationhelper text;

  relationmultifieldlist public.fields[];
  relationmultifield public.fields;
  relationmultirowexists bool := false;
  relationmultihelper text;
  relationmultihelper1 text[];
  relationmulticounter int;

  picklistfieldlist public.fields[];
  picklistfield public.fields;
  picklistrowexists bool := false;
  picklisthelper text;
  item text;

  picklistmultifieldlist public.fields[];
  picklistmultifield public.fields;
  picklistmultirowexists bool := false;
  picklistmultihelper text;
  picklistmultihelperarray text[];
  value1 text;
  item1 text;
begin
    currently_deleting := current_setting('app.deleting_id', true);
    SELECT * from public.objects WHERE api_name = TG_TABLE_NAME INTO my_row;

    IF (my_row.trigger_checkdropdown) THEN
        -- relation
        SELECT ARRAY(SELECT f FROM public.fields f WHERE f.type = 'relation' and f.parent_id = my_row.id) INTO relationfieldlist;
        FOREACH relationfield IN ARRAY relationfieldlist
        LOOP

            -- this gets the value of the relation field
            relationhelper := to_jsonb(NEW) ->> relationfield.api_name;

            IF relationhelper IS NULL THEN
                CONTINUE; 
            END IF;

            IF (relationhelper = currently_deleting) THEN
                relationrowexists := true;
            ELSE
                EXECUTE format('SELECT EXISTS (SELECT 1 FROM public.%I WHERE id = $1)', relationfield.relation_apiname) 
                INTO relationrowexists 
                USING relationhelper::uuid;
            END IF;

            IF NOT relationrowexists THEN
            RAISE EXCEPTION 'b0f5e1ba-0eb9-4f6c-98e9-c204cf7ce95c; RELATION: Record in field % (ID: %) does not exist in table %', 
                relationfield.api_name, relationhelper, relationfield.relation_apiname;
            END IF;
        END LOOP;

        -- relationmulti
        SELECT ARRAY(SELECT f FROM public.fields f WHERE f.type = 'relationmulti' and f.parent_id = my_row.id) INTO relationmultifieldlist;
        --RAISE EXCEPTION 'relationmultifieldlist: %', relationmultifieldlist;
        FOREACH relationmultifield IN ARRAY relationmultifieldlist
        LOOP

            -- this gets the value of the relation field
            relationmultihelper := (to_jsonb(NEW) ->> relationmultifield.api_name);
            
            IF relationmultihelper IS NULL THEN
                CONTINUE; 
            END IF;

            relationmultihelper1 := ARRAY(
            SELECT jsonb_array_elements_text(
                to_jsonb(NEW) -> relationmultifield.api_name
            )
            );

            IF (currently_deleting::text = ANY(relationmultihelper1)) THEN
                relationmultihelper1 := array_remove(relationmultihelper1, currently_deleting::text);
            END IF;

            IF array_length(relationmultihelper1, 1) IS NULL THEN
                CONTINUE; 
            END IF;
            
            EXECUTE format('(SELECT count(id) FROM public.%I WHERE id = ANY($1))', relationmultifield.relation_apiname) 
            INTO relationmulticounter 
            USING relationmultihelper1::uuid[];
            
            IF NOT (relationmulticounter = array_length(relationmultihelper1, 1)) THEN
            RAISE EXCEPTION 'b0f5e1ba-0eb9-4f6c-98e9-c204cf7ce95c; RELATIONMULTI: Record in field % (ID: %) does not exist in table %', 
                relationmultifield.api_name, relationmultihelper, relationmultifield.relation_apiname;
            END IF; 

        END LOOP;

        -- picklist
        SELECT ARRAY(SELECT f FROM public.fields f WHERE f.type = 'picklist' and f.parent_id = my_row.id) INTO picklistfieldlist;
        FOREACH picklistfield IN ARRAY picklistfieldlist
        LOOP
            -- this gets the value of the picklist field
            picklisthelper := to_jsonb(NEW) ->> picklistfield.api_name;

            --RAISE EXCEPTION 'SUCC picklisthelper: %', picklisthelper;

            IF picklisthelper IS NULL THEN
                CONTINUE; 
            END IF;

            --RAISE EXCEPTION 'SUCC picklistfield.picklist_values: %', picklistfield.picklist_values;

            FOREACH item IN ARRAY picklistfield.picklist_values
            LOOP
                IF (split_part(item, ';', 1)::uuid = picklisthelper::uuid) THEN
                    IF (split_part(item, ';', 3)::boolean) THEN
                            picklistrowexists := false;
                        ELSE
                            picklistrowexists := true;
                    END IF;
                END IF;
            END LOOP;

            IF NOT picklistrowexists THEN
            RAISE EXCEPTION 'b0f5e1ba-0eb9-4f6c-98e9-c204cf7ce95c; PICKLIST: Record in field % (ID: %) does not exist in table %', 
                picklistfield.api_name, picklisthelper, picklistfield.relation_apiname;
            END IF;

        END LOOP;

        -- picklistmulti
        SELECT ARRAY(SELECT f FROM public.fields f WHERE f.type = 'picklistmulti' and f.parent_id = my_row.id) INTO picklistmultifieldlist;
        FOREACH picklistmultifield IN ARRAY picklistmultifieldlist
        LOOP
            -- this gets the value of the picklist field
            picklistmultihelper := to_jsonb(NEW) ->> picklistmultifield.api_name;

            --RAISE EXCEPTION 'SUCC picklistmultihelper: %', picklistmultihelper;

            IF picklistmultihelper IS NULL THEN
                CONTINUE; 
            END IF;

            picklistmultihelperarray := ARRAY(
            SELECT jsonb_array_elements_text(
                (to_jsonb(NEW) ->> picklistmultifield.api_name)::jsonb
            )
            );

            FOREACH value1 IN ARRAY picklistmultihelperarray
            LOOP

            picklistmultirowexists := false;
            FOREACH item1 IN ARRAY picklistmultifield.picklist_values
            LOOP
                IF (split_part(item1, ';', 1)::uuid = value1::uuid) THEN
                    IF (split_part(item1, ';', 3)::boolean) THEN
                            picklistmultirowexists := false;
                        ELSE
                            picklistmultirowexists := true;
                    END IF;
                END IF;
            END LOOP;

            IF NOT picklistmultirowexists THEN
            RAISE EXCEPTION 'b0f5e1ba-0eb9-4f6c-98e9-c204cf7ce95c; PICKLISTMULTI: Record in field % (ID: %) does not exist in table %', 
                picklistmultifield.api_name, value1, picklistmultifield.relation_apiname;
            END IF;

            END LOOP;

        END LOOP;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


CREATE OR REPLACE FUNCTION
public.triggerfunction_objects_update_after()
RETURNS TRIGGER set search_path = '' AS

$$
declare
 cnt integer;
 l_historyname text;
begin

IF((OLD.api_name <> NEW.api_name) OR (OLD.id <> NEW.id) OR (OLD.created_at <> NEW.created_at)) THEN
    raise exception 'DONT UPDATE ID OR API_NAME OR CREATED_AT';
END IF;

    if OLD.history <> NEW.history AND NEW.history = true then

        EXECUTE format('INSERT INTO public.objecthistories (api_name, name) VALUES (%L, %L);', (SELECT 'h_' || substring(NEW.api_name FROM 3)), NEW.name );

    end if;


    if OLD.history <> NEW.history AND NEW.history = false then

        EXECUTE format('DELETE FROM public.objecthistories WHERE api_name = %L;', (SELECT 'h_' || substring(NEW.api_name FROM 3)));

    end if;

    if OLD.name <> NEW.name then

        EXECUTE format('UPDATE public.appoptions SET label = %L WHERE item_id = %L;', NEW.name, NEW.id);

        EXECUTE format('UPDATE public.objecthistories SET name = %L WHERE api_name = %L;', NEW.name, (SELECT 'h_' || substring(NEW.api_name FROM 3)));

    end if;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;




CREATE OR REPLACE FUNCTION
public.triggerfunction_objects_delete_after()
RETURNS TRIGGER set search_path = '' AS

$$
declare
 relexists bool;
 l_historyname text;
begin

    if(OLD.api_name = 'c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413') then
        RAISE EXCEPTION 'THIS OBJECT IS NOT DELETABLE';
    end if;

    EXECUTE format('SELECT EXISTS (SELECT 1 FROM public.fields WHERE relation_id = %L);', OLD.id) INTO relexists;
    if(relexists = true) then
        RAISE EXCEPTION 'RELATION FIELD STILL EXISTS';
    end if;

    EXECUTE format('drop policy if exists "policy_%I_select" on public.%I;', OLD.api_name, OLD.api_name);
    EXECUTE format('drop policy if exists "policy_%I_insert" on public.%I;', OLD.api_name, OLD.api_name);
    EXECUTE format('drop policy if exists "policy_%I_update" on public.%I;', OLD.api_name, OLD.api_name);
    EXECUTE format('drop policy if exists "policy_%I_delete" on public.%I;', OLD.api_name, OLD.api_name);

    EXECUTE format('drop policy if exists "policy_unauth_%I_select" on public.%I;', OLD.api_name, OLD.api_name);
    EXECUTE format('drop policy if exists "policy_unauth_%I_insert" on public.%I;', OLD.api_name, OLD.api_name);
    EXECUTE format('drop policy if exists "policy_unauth_%I_update" on public.%I;', OLD.api_name, OLD.api_name);
    EXECUTE format('drop policy if exists "policy_unauth_%I_delete" on public.%I;', OLD.api_name, OLD.api_name);

    EXECUTE format('DELETE FROM public.permissionoptions WHERE name = %L;', CONCAT(OLD.api_name, '.all.select'));
    EXECUTE format('DELETE FROM public.permissionoptions WHERE name = %L;', CONCAT(OLD.api_name, '.all.insert'));
    EXECUTE format('DELETE FROM public.permissionoptions WHERE name = %L;', CONCAT(OLD.api_name, '.all.update'));
    EXECUTE format('DELETE FROM public.permissionoptions WHERE name = %L;', CONCAT(OLD.api_name, '.all.delete'));
    EXECUTE format('DELETE FROM public.permissionoptions WHERE name = %L;', CONCAT(OLD.api_name, '.owner.select'));
    EXECUTE format('DELETE FROM public.permissionoptions WHERE name = %L;', CONCAT(OLD.api_name, '.owner.insert'));
    EXECUTE format('DELETE FROM public.permissionoptions WHERE name = %L;', CONCAT(OLD.api_name, '.owner.update'));
    EXECUTE format('DELETE FROM public.permissionoptions WHERE name = %L;', CONCAT(OLD.api_name, '.owner.delete'));

    EXECUTE format('DELETE FROM public.permissions WHERE permission = %L;', CONCAT(OLD.api_name, '.all.select'));
    EXECUTE format('DELETE FROM public.permissions WHERE permission = %L;', CONCAT(OLD.api_name, '.all.insert'));
    EXECUTE format('DELETE FROM public.permissions WHERE permission = %L;', CONCAT(OLD.api_name, '.all.update'));
    EXECUTE format('DELETE FROM public.permissions WHERE permission = %L;', CONCAT(OLD.api_name, '.all.delete'));
    EXECUTE format('DELETE FROM public.permissions WHERE permission = %L;', CONCAT(OLD.api_name, '.owner.select'));
    EXECUTE format('DELETE FROM public.permissions WHERE permission = %L;', CONCAT(OLD.api_name, '.owner.insert'));
    EXECUTE format('DELETE FROM public.permissions WHERE permission = %L;', CONCAT(OLD.api_name, '.owner.update'));
    EXECUTE format('DELETE FROM public.permissions WHERE permission = %L;', CONCAT(OLD.api_name, '.owner.delete'));

    EXECUTE format('DELETE FROM public.fields WHERE parent_id = %L;', OLD.id);


    --history 
    if OLD.history = true then

        EXECUTE format('DELETE FROM  public.objecthistories WHERE api_name = %L;', (SELECT 'h_' || substring(OLD.api_name FROM 3)));

    end if;

    EXECUTE format('DELETE FROM public.appoptions WHERE item_id = %L;', OLD.id);
    EXECUTE format('UPDATE public.apps SET items_selected = NULLIF(ARRAY_REMOVE(items_selected, %L), ''{}'') WHERE %L = ANY(items_selected);', OLD.id, OLD.id);

    EXECUTE format('DROP TABLE IF EXISTS public.%I;', OLD.api_name);
    
    RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;




-- fields
CREATE OR REPLACE FUNCTION
public.triggerfunction_fields_insert_after()
RETURNS TRIGGER set search_path = '' AS

$$
declare
 cnt integer;
begin
    if NEW.type = 'text' then
        EXECUTE format('ALTER TABLE public.%I ADD %I %I;', (SELECT api_name FROM public.objects WHERE id = NEW.parent_id), NEW.api_name, 'text');
    end if;

    if NEW.type = 'editor' then
        EXECUTE format('ALTER TABLE public.%I ADD %I %I;', (SELECT api_name FROM public.objects WHERE id = NEW.parent_id), NEW.api_name, 'text');
    end if;

     if NEW.type = 'date' then
        EXECUTE format('ALTER TABLE public.%I ADD %I %I;', (SELECT api_name FROM public.objects WHERE id = NEW.parent_id), NEW.api_name, 'date');
    end if;

     if NEW.type = 'datetime' then
        EXECUTE format('ALTER TABLE public.%I ADD %I %I;', (SELECT api_name FROM public.objects WHERE id = NEW.parent_id), NEW.api_name, 'timestamptz');
    end if;

    if NEW.type = 'number' then
        EXECUTE format('ALTER TABLE public.%I ADD %I %I;', (SELECT api_name FROM public.objects WHERE id = NEW.parent_id), NEW.api_name, 'numeric');
    end if;

    if NEW.type = 'longtext' then
        EXECUTE format('ALTER TABLE public.%I ADD %I %I;', (SELECT api_name FROM public.objects WHERE id = NEW.parent_id), NEW.api_name, 'text');
    end if;

    if NEW.type = 'bool' then
        EXECUTE format('ALTER TABLE public.%I ADD %I %I not null default false;', (SELECT api_name FROM public.objects WHERE id = NEW.parent_id), NEW.api_name, 'bool');
    end if;

    if NEW.type = 'file' then
        EXECUTE format('ALTER TABLE public.%I ADD %I %I;', (SELECT api_name FROM public.objects WHERE id = NEW.parent_id), NEW.api_name, 'text');
    end if;

    if (NEW.type = 'relation') then
        EXECUTE format('ALTER TABLE public.%I ADD %I %I;', (SELECT api_name FROM public.objects WHERE id = NEW.parent_id), NEW.api_name, 'uuid');
        EXECUTE format('UPDATE public.objects SET relations = array_append(relations, %L) WHERE id = %L;', NEW.id, NEW.relation_id);
        EXECUTE format('UPDATE public.fields SET relation_apiname = %L WHERE id = %L;', (SELECT api_name FROM public.objects WHERE id = NEW.relation_id), NEW.id);

        -- EXECUTE format('CREATE TRIGGER
        --     %I
        --     before DELETE ON public.%I
        --     FOR EACH ROW
        --     EXECUTE PROCEDURE
        --     public.triggerfunction_relationtrigger();',
        --     CONCAT('relationtrigger_', NEW.id::text),(SELECT api_name FROM public.objects WHERE id = NEW.relation_id));
    end if;

    if (NEW.type = 'relationmulti') then
        EXECUTE format('ALTER TABLE public.%I ADD %I uuid[];', (SELECT api_name FROM public.objects WHERE id = NEW.parent_id), NEW.api_name);
        EXECUTE format('UPDATE public.objects SET relations = array_append(relations, %L) WHERE id = %L;', NEW.id, NEW.relation_id);
        EXECUTE format('UPDATE public.fields SET relation_apiname = %L WHERE id = %L;', (SELECT api_name FROM public.objects WHERE id = NEW.relation_id), NEW.id);

        -- EXECUTE format('CREATE TRIGGER
        --     %I
        --     before DELETE ON public.%I
        --     FOR EACH ROW
        --     EXECUTE PROCEDURE
        --     public.triggerfunction_relationtrigger();',
        --     CONCAT('relationmultitrigger_', NEW.id::text),(SELECT api_name FROM public.objects WHERE id = NEW.relation_id));
    end if;

    if NEW.type = 'picklist' then
        EXECUTE format('ALTER TABLE public.%I ADD %I %I;', (SELECT api_name FROM public.objects WHERE id = NEW.parent_id), NEW.api_name, 'text');
    end if;

    if NEW.type = 'picklistmulti' then
        EXECUTE format('ALTER TABLE public.%I ADD %I text[];', (SELECT api_name FROM public.objects WHERE id = NEW.parent_id), NEW.api_name);
    end if;

    EXECUTE format('UPDATE public.fields SET parent_apiname = %L WHERE id = %L', (SELECT api_name FROM public.objects WHERE id = NEW.parent_id), NEW.id);

    if NEW.trigger_addfieldtolayout then
        EXECUTE format(
            'UPDATE public.objects 
            SET fields_selected = array_append(COALESCE(fields_selected, ARRAY[]::uuid[]), %L::uuid) 
            WHERE id = %L 
            AND NOT (%L::uuid = ANY(COALESCE(fields_selected, ARRAY[]::uuid[])));', 
            NEW.id, 
            NEW.parent_id, 
            NEW.id
        );
    end if;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;




CREATE OR REPLACE FUNCTION
public.triggerfunction_fields_update_after()
RETURNS TRIGGER set search_path = '' AS

$$
declare
 cnt integer;
 nnt text[];
 nnta text[];
 old_filtered jsonb;
 new_filtered jsonb;
 my_row RECORD;
begin

    old_filtered := to_jsonb(OLD) - 'modified_by' - 'modified_at' - 'description';
        new_filtered := to_jsonb(NEW) - 'modified_by' - 'modified_at' - 'description';

    if((old_filtered IS DISTINCT FROM new_filtered) AND (OLD.api_name = 'email' OR OLD.api_name = 'user_id' OR OLD.api_name = 'xuser_id')) then
            RAISE EXCEPTION 'THIS FIELD IS NOT UPDATABLE';
        end if;

    IF((OLD.api_name <> NEW.api_name) OR (OLD.id <> NEW.id) OR (OLD.created_at <> NEW.created_at) OR (OLD.type <> NEW.type) OR (OLD.relation_apiname <> NEW.relation_apiname) OR (OLD.relation_id <> NEW.relation_id)) THEN
        raise exception 'DONT UPDATE ID OR API_NAME OR CREATED_AT OR TYPE OR RELATION';
    END IF;


    SELECT * from public.objects WHERE id = NEW.parent_id INTO my_row;
    IF (my_row.trigger_deletepicklist) THEN
        IF NEW.type = 'picklist' THEN
            SELECT ARRAY(
                SELECT split_part(o.val, ';', 1)
                FROM unnest(OLD.picklist_values) AS o(val)
                WHERE split_part(o.val, ';', 1) NOT IN (
                    SELECT split_part(n.val, ';', 1)
                    FROM unnest(NEW.picklist_values) AS n(val)
                )
            ) INTO nnt;

            IF array_length(nnt, 1) > 0 THEN
                FOR i IN array_lower(nnt, 1)..array_upper(nnt, 1) LOOP
                    EXECUTE format(
                        'UPDATE public.%I SET %I = NULL WHERE %I = %L;',
                        (SELECT api_name FROM public.objects WHERE id = NEW.parent_id),
                        NEW.api_name,
                        NEW.api_name,
                        nnt[i]
                    );
                END LOOP;
            END IF;
        END IF;

        IF NEW.type = 'picklistmulti' THEN
            SELECT ARRAY(
                SELECT split_part(o.val, ';', 1)
                FROM unnest(OLD.picklist_values) AS o(val)
                WHERE split_part(o.val, ';', 1) NOT IN (
                    SELECT split_part(n.val, ';', 1)
                    FROM unnest(NEW.picklist_values) AS n(val)
                )
            ) INTO nnt;

            IF array_length(nnt, 1) > 0 THEN
                FOR i IN array_lower(nnt, 1)..array_upper(nnt, 1) LOOP
                    EXECUTE format('UPDATE public.%I SET %I = NULLIF(ARRAY_REMOVE(%I, %L), ''{}'') WHERE %L = ANY(%I);', (SELECT api_name FROM public.objects WHERE id = NEW.parent_id), NEW.api_name, NEW.api_name, nnt[i], nnt[i], NEW.api_name);
                END LOOP;
            END IF;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;




CREATE OR REPLACE FUNCTION
public.triggerfunction_fields_delete_after()
RETURNS TRIGGER set search_path = '' AS

$$
declare
 colexists bool;
begin
    if(OLD.api_name = 'email' OR OLD.api_name = 'user_id' OR OLD.api_name = 'xuser_id') then
        RAISE EXCEPTION 'THIS FIELD IS NOT DELETABLE';
    end if;

    --RAISE WARNING 'db1';
    EXECUTE format('SELECT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema=%L AND table_name=%L AND column_name=%L)', 'public', (SELECT api_name FROM public.objects WHERE id = OLD.parent_id), OLD.api_name) INTO colexists;
    --RAISE WARNING 'db2(%)', colexists::text;

    EXECUTE format('UPDATE public.objects SET fields_selected = NULLIF(ARRAY_REMOVE(fields_selected, %L), ''{}'') WHERE id = %L;', OLD.id, OLD.parent_id);

    if(colexists = true) then
        EXECUTE format('ALTER TABLE public.%I DROP COLUMN %I;', (SELECT api_name FROM public.objects WHERE id = OLD.parent_id), OLD.api_name);
    end if;

    if(old.type = 'relation' OR old.type = 'relationmulti') then
        EXECUTE format('UPDATE public.objects SET relations = NULLIF(ARRAY_REMOVE(relations, %L), ''{}'') WHERE id = %L;', OLD.id, OLD.relation_id);
    end if;

    RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


CREATE OR REPLACE FUNCTION
public.triggerfunction_profiles_insert_after()
RETURNS TRIGGER set search_path = '' AS

$$
declare
 cnt integer;
begin

    EXECUTE format('INSERT INTO public.permissions (permission, profile_id, is_active) VALUES (%L, %L, %L);', 'show.apps', NEW.id, true);
    EXECUTE format('INSERT INTO public.permissions (permission, profile_id, is_active) VALUES (%L, %L, %L);', 'show.pages', NEW.id, true);
    EXECUTE format('INSERT INTO public.permissions (permission, profile_id, is_active) VALUES (%L, %L, %L);', 'show.objects', NEW.id, true);
    EXECUTE format('INSERT INTO public.permissions (permission, profile_id, is_active) VALUES (%L, %L, %L);', 'show.history', NEW.id, true);
    EXECUTE format('INSERT INTO public.permissions (permission, profile_id, is_active) VALUES (%L, %L, %L);', 'show.mfa', NEW.id, true);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


CREATE OR REPLACE FUNCTION
public.triggerfunction_profiles_update_after()
RETURNS TRIGGER set search_path = '' AS

$$
declare
 cnt integer;
  old_filtered jsonb;
 new_filtered jsonb;
 diff_keys text[];
begin

    old_filtered := to_jsonb(OLD) - 'modified_by' - 'modified_at' - 'description' - 'home_message';
    new_filtered := to_jsonb(NEW) - 'modified_by' - 'modified_at' - 'description' - 'home_message';

    SELECT coalesce(array_agg(key), '{}')
    INTO diff_keys
    FROM (
        SELECT key
        FROM jsonb_each(old_filtered) o
        FULL JOIN jsonb_each(new_filtered) n USING (key)
        WHERE o.value IS DISTINCT FROM n.value
    ) t;

if((old_filtered IS DISTINCT FROM new_filtered) AND (OLD.api_name = 'admin' OR OLD.api_name = 'unauthenticated')) then
       RAISE EXCEPTION 'THIS PROFILE IS NOT UPDATABLE (EXCEPT FOR description AND home_message). Changed columns: %', diff_keys;
    end if;

IF((OLD.api_name <> NEW.api_name) OR (OLD.id <> NEW.id) OR (OLD.created_at <> NEW.created_at)) THEN
    raise exception 'DONT UPDATE ID OR API_NAME OR CREATED_AT';
END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;




CREATE OR REPLACE FUNCTION
public.triggerfunction_profiles_delete_after()
RETURNS TRIGGER set search_path = '' AS

$$
declare
 colexists bool;
begin
    if(OLD.api_name = 'admin' OR OLD.api_name = 'unauthenticated') then
        RAISE EXCEPTION 'THIS PROFILE IS NOT DELETABLE';
    end if;

    EXECUTE format('DELETE FROM public.permissions WHERE profile_id = %L;', OLD.id);

    RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;




-- xuser
-- insertafter
CREATE OR REPLACE FUNCTION
public.triggerfunction_xusers_insert_after()
RETURNS TRIGGER set search_path = '' AS

$$
declare
 cnt integer;
begin
if(NEW.is_unauthenticated = true OR NEW.is_superuser = true OR NEW.profile_id = '43bf8fe6-9add-4ff4-b759-f8e1445f5914'::uuid) then
        RAISE EXCEPTION 'ONLY ONE SUPERUSER OR UNAUTHENTICATED USER IS ALLOWED';
    end if;

    IF(NEW.skip_puser = false) THEN
        INSERT INTO public.c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413 (name, email, xuser_id, owner_id)
        VALUES (NEW.invite_email, NEW.invite_email, NEW.id::text, NEW.id);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;




-- updateafter
CREATE OR REPLACE FUNCTION
public.triggerfunction_xusers_update_after()
RETURNS TRIGGER set search_path = '' AS

$$
declare
 cnt integer;
 old_filtered jsonb;
 new_filtered jsonb;
begin

    old_filtered := to_jsonb(OLD) - 'mfa_enabled' - 'modified_by' - 'modified_at';
    new_filtered := to_jsonb(NEW) - 'mfa_enabled' - 'modified_by' - 'modified_at';

    if(OLD.is_superuser = true AND (old_filtered IS DISTINCT FROM new_filtered)) then
        RAISE EXCEPTION 'THIS USER IS NOT UPDATABLE (EXCEPT FOR THE MFA FIELD)';
    end if;

    if(OLD.is_unauthenticated = true) then
        RAISE EXCEPTION 'THIS USER IS NOT UPDATABLE';
    end if;

    if(NEW.is_unauthenticated = true OR (OLD.is_superuser = false AND NEW.is_superuser = true) OR NEW.profile_id = '43bf8fe6-9add-4ff4-b759-f8e1445f5914'::uuid) then
        RAISE EXCEPTION 'ONLY ONE SUPERUSER OR UNAUTHENTICATED USER IS ALLOWED';
    end if;

IF((OLD.id <> NEW.id) OR (OLD.created_at <> NEW.created_at) OR (OLD.skip_puser <> NEW.skip_puser)) THEN
    raise exception 'DONT UPDATE ID OR CREATED_AT OR SKIP_PUSER';
END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;





-- deleteafter
CREATE OR REPLACE FUNCTION
public.triggerfunction_xusers_delete_after()
RETURNS TRIGGER set search_path = '' AS

$$
declare
 cnt integer;
begin
    if(OLD.is_unauthenticated = true OR OLD.is_superuser = true) then
        RAISE EXCEPTION 'THIS USER IS NOT DELETABLE';
    end if;

    EXECUTE format('DELETE FROM auth.users WHERE id = %L;', OLD.user_id);
    EXECUTE format('DELETE FROM public.c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413 WHERE xuser_id = %L;', OLD.id::text);

    RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;




-- permission
CREATE OR REPLACE FUNCTION
public.triggerfunction_permissions_insert_after()
RETURNS TRIGGER set search_path = '' AS

$$
declare
 cnt integer;
 l_historyname text;
begin

    IF (NEW.profile_id = '43bf8fe6-9add-4ff4-b759-f8e1445f5914'::uuid AND (NEW.permission = 'setup' OR NEW.permission = 'setuplimited')) THEN
        RAISE EXCEPTION 'UNAUTHENTICATED PROFILE CANNOT HAVE SETUP OR SETUPLIMTED PERMISSIONS'; 
    ELSE
         cnt := 0;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


CREATE OR REPLACE FUNCTION
public.triggerfunction_permissions_update_after()
RETURNS TRIGGER set search_path = '' AS

$$
declare
 cnt integer;
 old_filtered jsonb;
 new_filtered jsonb;
begin

    old_filtered := to_jsonb(OLD) - 'modified_by' - 'modified_at' - 'description';
    new_filtered := to_jsonb(NEW) - 'modified_by' - 'modified_at' - 'description';

if((old_filtered IS DISTINCT FROM new_filtered) AND (OLD.permission = 'setup' AND OLD.profile_id = 'cc2e9937-e7db-4853-b66e-68a606bbce93'::uuid)) then
        RAISE EXCEPTION 'THIS PERMISSION IS NOT UPDATABLE';
    end if;

IF (NEW.profile_id = '43bf8fe6-9add-4ff4-b759-f8e1445f5914'::uuid AND (NEW.permission = 'setup' OR NEW.permission = 'setuplimited')) THEN
    RAISE EXCEPTION 'UNAUTHENTICATED PROFILE CANNOT HAVE SETUP OR SETUPLIMTED PERMISSIONS'; 
ELSE
        cnt := 0;
END IF;

IF((OLD.id <> NEW.id) OR (OLD.created_at <> NEW.created_at)) THEN
    raise exception 'DONT UPDATE ID OR CREATED_AT';
END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;




-- deleteafter
CREATE OR REPLACE FUNCTION
public.triggerfunction_permissions_delete_after()
RETURNS TRIGGER set search_path = '' AS

$$
declare
 cnt integer;
begin
    if(OLD.permission = 'setup' AND OLD.profile_id = 'cc2e9937-e7db-4853-b66e-68a606bbce93'::uuid) then
        RAISE EXCEPTION 'THIS PERMISSION IS NOT DELETABLE';
    end if;

    RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;




-- permissionoptions
-- updateafter
CREATE OR REPLACE FUNCTION
public.triggerfunction_permissionoptions_update_after()
RETURNS TRIGGER set search_path = '' AS

$$
declare
 cnt integer;
begin

if(OLD.name = 'setup') then
        RAISE EXCEPTION 'THIS PERMISSIONOPTION IS NOT UPDATABLE';
    end if;

IF((OLD.id <> NEW.id) OR (OLD.created_at <> NEW.created_at)) THEN
    raise exception 'DONT UPDATE ID OR CREATED_AT';
END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;




-- deleteafter
CREATE OR REPLACE FUNCTION
public.triggerfunction_permissionoptions_delete_after()
RETURNS TRIGGER set search_path = '' AS

$$
declare
 cnt integer;
begin
    if(OLD.name = 'setup') then
        RAISE EXCEPTION 'THIS PERMISSIONOPTION IS NOT DELETABLE';
    end if;


    RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;




-- CUSTOM Object
-- triggerfunction_beforeinsert_overwriteid
CREATE OR REPLACE FUNCTION
public.triggerfunction_beforeinsert_overwriteid()
RETURNS TRIGGER set search_path = '' AS

$$
declare
 cnt integer;
 nnta text;
 is_api_request bool;
 auth_notnull bool;
 lxuserid uuid;
begin

    SELECT current_user INTO nnta;
    is_api_request := (SELECT current_setting('request.headers', true) IS NOT NULL);
    auth_notnull := (SELECT auth.uid() IS NOT NULL);
    lxuserid := (SELECT id FROM public.xusers WHERE user_id = auth.uid());

    
    NEW.created_at := NOW();
    IF (auth_notnull = false AND is_api_request = false) THEN
        NEW.created_by := '11111111-1111-1111-1111-111111111111'::uuid;
        IF (NEW.id IS NULL) THEN
            NEW.id := gen_random_uuid();
        END IF;
    END IF;
    IF (auth_notnull = false AND is_api_request = true) THEN
        NEW.id := gen_random_uuid();
        NEW.created_by := '00000000-0000-0000-0000-000000000000'::uuid;
    END IF;
    IF (auth_notnull = true AND is_api_request = true) THEN
        NEW.id := gen_random_uuid();
        NEW.created_by := lxuserid;
    END IF;
    NEW.modified_at := null;
    NEW.modified_by := null;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;



-- triggerfunction_beforeinsert_nooverwrite
CREATE OR REPLACE FUNCTION
public.triggerfunction_beforeinsert_nooverwrite()
RETURNS TRIGGER set search_path = '' AS

$$
declare
 cnt integer;
 nnta text;
 is_api_request bool;
 auth_notnull bool;
 lxuserid uuid;
 check_apiname bool;
begin

    SELECT current_user INTO nnta;
    is_api_request := (SELECT current_setting('request.headers', true) IS NOT NULL);
    auth_notnull := (SELECT auth.uid() IS NOT NULL);
    lxuserid := (SELECT id FROM public.xusers WHERE user_id = auth.uid());


    check_apiname := true;
    IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = TG_TABLE_SCHEMA
          AND table_name   = TG_TABLE_NAME
          AND column_name  = 'api_name'
    ) THEN
        
        -- IF NEW.api_name IS NULL THEN
        --     RAISE EXCEPTION 'api_name must be provided';
        -- END IF;
        IF TG_TABLE_NAME = 'fields' AND NEW.api_name IN ('xuser_id', 'user_id', 'email' ) THEN
            check_apiname := false;
        END IF;
        IF TG_TABLE_NAME = 'objecthistories' THEN
            check_apiname := false;
        END IF;
        IF TG_TABLE_NAME = 'profiles' AND NEW.api_name IN ('admin', 'unauthenticated') THEN
            check_apiname := false;
        END IF;
        IF TG_TABLE_NAME = 'settings' AND NEW.api_name IN ('allowresetmfa', 'allowresetpassword', 'countersetuphistory', 'countersetup', 'counterhistory') THEN
            check_apiname := false;
        END IF;
        IF check_apiname THEN
            IF NEW.api_name !~ 
            '^c_[a-z0-9]{1,20}__[0-9a-f]{8}_[0-9a-f]{4}_[0-9a-f]{4}_[0-9a-f]{4}_[0-9a-f]{12}$'
            THEN
                RAISE EXCEPTION
                    'Invalid api_name format. Expected c_<1-20 lowercase alnum>__<uuid_with_underscores>';
            END IF;
        END IF;

    END IF;


    NEW.created_at := NOW();
    IF (auth_notnull = false AND is_api_request = false) THEN
        NEW.created_by := '11111111-1111-1111-1111-111111111111'::uuid;
    END IF;
    IF (auth_notnull = false AND is_api_request = true) THEN
        NEW.created_by := '00000000-0000-0000-0000-000000000000'::uuid;
    END IF;
    IF (auth_notnull = true AND is_api_request = true) THEN
        NEW.created_by := lxuserid;
    END IF;
    NEW.modified_at := null;
    NEW.modified_by := null;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;




-- triggerfunction_beforeupdate_checkidandcreatedat
CREATE OR REPLACE FUNCTION
public.triggerfunction_beforeupdate_checkidandcreatedat()
RETURNS TRIGGER set search_path = '' AS

$$
declare
 cnt integer;
 nnta text;
 is_api_request bool;
 auth_notnull bool;
 lxuserid uuid;
 column_name TEXT;
  column_diff BOOLEAN;
  all_different BOOLEAN := TRUE;
begin

SET search_path TO public; -- Or your default schema

IF((OLD.id <> NEW.id) OR (OLD.created_at <> NEW.created_at) OR (OLD.created_by <> NEW.created_by)) THEN
    raise exception 'DONT UPDATE ID OR CREATED_AT OR CREATED_BY';
END IF;

IF to_jsonb(NEW) ? 'api_name' THEN
    IF (OLD.api_name <> NEW.api_name) THEN
        raise exception 'DONT UPDATE API_NAME';
    END IF;
END IF;


IF (NEW IS DISTINCT FROM OLD) THEN

    SELECT current_user INTO nnta;
    is_api_request := (SELECT current_setting('request.headers', true) IS NOT NULL);
    auth_notnull := (SELECT auth.uid() IS NOT NULL);
    lxuserid := (SELECT id FROM public.xusers WHERE user_id = auth.uid());

    NEW.modified_at := NOW();

    IF (auth_notnull = false AND is_api_request = false) THEN
        NEW.modified_by := '11111111-1111-1111-1111-111111111111'::uuid;
    END IF;
    IF (auth_notnull = false AND is_api_request = true) THEN
        NEW.modified_by := '00000000-0000-0000-0000-000000000000'::uuid;
    END IF;
    IF (auth_notnull = true AND is_api_request = true) THEN
        NEW.modified_by := lxuserid;
    END IF;

END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


CREATE OR REPLACE FUNCTION history_function()
RETURNS TRIGGER set search_path = '' AS $$
DECLARE
 l_userid uuid;
 l_objectname text;
 is_api_request bool;
 auth_notnull bool;
 new_data JSONB;
 lxuserid uuid;
 changed_cols text[];
BEGIN

IF (NEW IS DISTINCT FROM OLD) THEN

    -- -- get what column was changed
    -- SELECT array_agg(key)
    -- INTO changed_cols
    -- FROM jsonb_each_text(to_jsonb(NEW))
    -- WHERE to_jsonb(OLD) ->> key IS DISTINCT FROM value;

    -- RAISE EXCEPTION 'Changed columns: %', changed_cols;


    is_api_request := (SELECT current_setting('request.headers', true) IS NOT NULL);
    auth_notnull := (SELECT auth.uid() IS NOT NULL);
    lxuserid := (SELECT id FROM public.xusers WHERE user_id = auth.uid());

    IF (auth_notnull = false AND is_api_request = false) THEN
        l_userid := '11111111-1111-1111-1111-111111111111'::uuid;
    END IF;
    IF (auth_notnull = false AND is_api_request = true) THEN
        l_userid := '00000000-0000-0000-0000-000000000000'::uuid;
    END IF;
    IF (auth_notnull = true AND is_api_request = true) THEN
        l_userid := lxuserid;
    END IF;

    IF (l_userid IS NULL) THEN
        RAISE EXCEPTION 'THIS USER IS NOT DELETABLE';
    END IF;


    IF (TG_OP = 'DELETE') THEN
        -- BEGIN
        --     EXECUTE format('INSERT INTO public.%I (parent_id, changed_at, changed_by, action, record, name) VALUES (%L,%L,%L,%L,%L,%L);' , TG_NAME, OLD.id, NOW(), l_userid, 'DELETE', to_jsonb(OLD), OLD.name);
        -- EXCEPTION
        --     WHEN others THEN
        --         EXECUTE format('INSERT INTO public.%I (parent_id, changed_at, changed_by, action, record) VALUES (%L,%L,%L,%L,%L);' , TG_NAME, OLD.id, NOW(), l_userid, 'DELETE', to_jsonb(OLD));
        -- END;
        EXECUTE format('INSERT INTO public.%I (parent_id, changed_at, changed_by, action, oldrecord, newrecord) VALUES (%L,%L,%L,%L,%L,%L);' , TG_NAME, OLD.id, NOW(), l_userid, 'DELETE', to_jsonb(OLD), '{}'::jsonb);
        RETURN OLD;
    ELSIF (TG_OP = 'UPDATE') THEN
        -- BEGIN
        --     EXECUTE format('INSERT INTO public.%I (parent_id, changed_at, changed_by, action, record, name) VALUES (%L,%L,%L,%L,%L,%L);' , TG_NAME, NEW.id, NOW(), l_userid, 'UPDATE', to_jsonb(NEW), NEW.name);
        -- EXCEPTION
        --     WHEN others THEN
        --         EXECUTE format('INSERT INTO public.%I (parent_id, changed_at, changed_by, action, record) VALUES (%L,%L,%L,%L,%L);' , TG_NAME, NEW.id, NOW(), l_userid, 'UPDATE', to_jsonb(NEW));
        -- END;
        EXECUTE format('INSERT INTO public.%I (parent_id, changed_at, changed_by, action, oldrecord, newrecord) VALUES (%L,%L,%L,%L,%L,%L);' , TG_NAME, NEW.id, NOW(), l_userid, 'UPDATE', to_jsonb(OLD), to_jsonb(NEW));
        RETURN NEW;
    ELSIF (TG_OP = 'INSERT') THEN
        -- BEGIN
        --     EXECUTE format('INSERT INTO public.%I (parent_id, changed_at, changed_by, action, record, name) VALUES (%L,%L,%L,%L,%L,%L);' , TG_NAME, NEW.id, NOW(), l_userid, 'INSERT', to_jsonb(NEW), NEW.name);
        -- EXCEPTION
        --     WHEN others THEN
        --         EXECUTE format('INSERT INTO public.%I (parent_id, changed_at, changed_by, action, record) VALUES (%L,%L,%L,%L,%L);' , TG_NAME, NEW.id, NOW(), l_userid, 'INSERT', to_jsonb(NEW));
        -- END;
        EXECUTE format('INSERT INTO public.%I (parent_id, changed_at, changed_by, action, oldrecord, newrecord) VALUES (%L,%L,%L,%L,%L,%L);' , TG_NAME, NEW.id, NOW(), l_userid, 'INSERT', '{}'::jsonb, to_jsonb(NEW));
        RETURN NEW;
    END IF;
    
END IF;

    IF (TG_OP = 'DELETE') THEN
        RETURN OLD;
    ELSIF (TG_OP = 'UPDATE') THEN
        RETURN NEW;
    ELSIF (TG_OP = 'INSERT') THEN
        RETURN NEW;
    END IF;



END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- settings
CREATE OR REPLACE FUNCTION
public.triggerfunction_settings_update_after()
RETURNS TRIGGER set search_path = '' AS

$$
declare
 cnt integer;
begin

IF((OLD.api_name <> NEW.api_name) OR (OLD.id <> NEW.id) OR (OLD.is_standard <> NEW.is_standard) 
    OR (OLD.is_standard AND OLD.description <> NEW.description) OR (OLD.is_standard AND OLD.name <> NEW.name) OR (OLD.is_standard AND OLD.rules <> NEW.rules)) THEN
    raise exception 'DONT UPDATE ID OR API_NAME OR THE DESCRIPTION OR NAME OR RULE OF A STANDARD SETTING';
END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


CREATE OR REPLACE FUNCTION
public.triggerfunction_settings_delete_after()
RETURNS TRIGGER set search_path = '' AS

$$
declare
 cnt integer;
begin

IF(OLD.is_standard) THEN
    raise exception 'DONT DELETE STANDARD SETTING';
END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- keepalive
CREATE OR REPLACE FUNCTION
public.triggerfunction_keepalive()
RETURNS TRIGGER set search_path = '' AS

$$
declare
 cnt integer;
begin
    if((OLD.id <> NEW.id)) then
        RAISE EXCEPTION 'DONT UPDATE ID';
    end if;

    NEW.changed_at := NOW();
    NEW.currentdatetime := EXTRACT(EPOCH FROM NOW());


    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- csql
CREATE OR REPLACE FUNCTION
public.triggerfunction_csql_insert_after()
RETURNS TRIGGER set search_path = '' AS

$$
declare
 cnt integer;
 l_historyname text;
begin

    IF (NEW.is_active = false) THEN
        cnt := 0;
    ELSE
        EXECUTE format('%s', NEW.bodycreate);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


CREATE OR REPLACE FUNCTION
public.triggerfunction_csql_update_after()
RETURNS TRIGGER set search_path = '' AS

$$
declare
 cnt integer;
 l_historyname text;
begin

    IF ((OLD.is_active = NEW.is_active) AND NEW.is_active = false) THEN
        cnt := 0;
    ELSIF ((OLD.is_active = NEW.is_active) AND NEW.is_active = true) THEN
        EXECUTE format('%s', NEW.bodyupdate);
    ELSIF ((OLD.is_active <> NEW.is_active) AND NEW.is_active = false) THEN
        EXECUTE format('%s', NEW.bodydelete);
    ELSIF ((OLD.is_active <> NEW.is_active) AND NEW.is_active = true) THEN
        EXECUTE format('%s', NEW.bodycreate);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


CREATE OR REPLACE FUNCTION
public.triggerfunction_csql_delete_after()
RETURNS TRIGGER set search_path = '' AS

$$
declare
 cnt integer;
 l_historyname text;
begin

    IF (OLD.is_active = false) THEN
        cnt := 0;
    ELSE
        EXECUTE format('%s', OLD.bodydelete);
    END IF;

    RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- pages
CREATE OR REPLACE FUNCTION
public.triggerfunction_pages_insert_after()
RETURNS TRIGGER set search_path = '' AS

$$
declare
 cnt integer;
 l_historyname text;
begin

    IF (NEW.is_active = false) THEN
        cnt := 0;
    ELSE
        EXECUTE format('INSERT INTO public.permissionoptions (name) VALUES (%L);', CONCAT('page.', NEW.api_name));
        EXECUTE format('INSERT INTO public.appoptions (name, label, type, item_id) VALUES (%L, %L, %L, %L);', NEW.api_name, NEW.name, 'page', NEW.id);
    END IF;

    

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


CREATE OR REPLACE FUNCTION
public.triggerfunction_pages_update_after()
RETURNS TRIGGER set search_path = '' AS

$$
declare
 cnt integer;
 l_historyname text;
begin

    

    IF ((OLD.is_active = NEW.is_active) AND NEW.is_active = false) THEN
        cnt := 0;
    ELSIF ((OLD.is_active = NEW.is_active) AND NEW.is_active = true) THEN
        if OLD.name <> NEW.name then
        EXECUTE format('UPDATE public.appoptions SET label = %L WHERE item_id = %L;', NEW.name, NEW.id);
        end if;
    ELSIF ((OLD.is_active <> NEW.is_active) AND NEW.is_active = false) THEN
        EXECUTE format('DELETE FROM public.permissionoptions WHERE name = %L;', CONCAT('page.', NEW.api_name));
        EXECUTE format('DELETE FROM public.permissions WHERE permission = %L;', CONCAT('page.', NEW.api_name));
        EXECUTE format('DELETE FROM public.appoptions WHERE item_id = %L;', NEW.id);
        EXECUTE format('UPDATE public.apps SET items_selected = NULLIF(ARRAY_REMOVE(items_selected, %L), ''{}'') WHERE %L = ANY(items_selected);', NEW.id, NEW.id);
        EXECUTE format('DELETE FROM public.appoptions WHERE item_id = %L;', NEW.id);
    ELSIF ((OLD.is_active <> NEW.is_active) AND NEW.is_active = true) THEN
        EXECUTE format('INSERT INTO public.permissionoptions (name) VALUES (%L);', CONCAT('page.', NEW.api_name));
        EXECUTE format('INSERT INTO public.appoptions (name, label, type, item_id) VALUES (%L, %L, %L, %L);', NEW.api_name, NEW.name, 'page', NEW.id);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


CREATE OR REPLACE FUNCTION
public.triggerfunction_pages_delete_after()
RETURNS TRIGGER set search_path = '' AS

$$
declare
 cnt integer;
 l_historyname text;
begin

    IF (OLD.is_active = false) THEN
        cnt := 0;
    ELSE
        EXECUTE format('DELETE FROM public.permissionoptions WHERE name = %L;', CONCAT('page.', OLD.api_name));
        EXECUTE format('DELETE FROM public.permissions WHERE permission = %L;', CONCAT('page.', OLD.api_name));
        EXECUTE format('DELETE FROM public.appoptions WHERE item_id = %L;', OLD.id);
        EXECUTE format('UPDATE public.apps SET items_selected = NULLIF(ARRAY_REMOVE(items_selected, %L), ''{}'') WHERE %L = ANY(items_selected);', OLD.id, OLD.id);
        EXECUTE format('DELETE FROM public.appoptions WHERE item_id = %L;', OLD.id);
    END IF;

    RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- cpermissions
CREATE OR REPLACE FUNCTION
public.triggerfunction_cpermissions_insert_after()
RETURNS TRIGGER set search_path = '' AS

$$
declare
 cnt integer;
 l_historyname text;
begin

    IF (NEW.is_active = false) THEN
        cnt := 0;
    ELSE
        EXECUTE format('INSERT INTO public.permissionoptions (name, description, is_custom) VALUES (%L, %L, %L);', CONCAT('custom.', NEW.api_name), NEW.description, true);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


CREATE OR REPLACE FUNCTION
public.triggerfunction_cpermissions_update_after()
RETURNS TRIGGER set search_path = '' AS

$$
declare
 cnt integer;
 l_historyname text;
begin

    IF ((OLD.is_active = NEW.is_active) AND NEW.is_active = false) THEN
        cnt := 0;
    ELSIF ((OLD.is_active = NEW.is_active) AND NEW.is_active = true) THEN
        cnt := 0;
    ELSIF ((OLD.is_active <> NEW.is_active) AND NEW.is_active = false) THEN
        EXECUTE format('DELETE FROM public.permissionoptions WHERE name = %L;', CONCAT('custom.', NEW.api_name));
        EXECUTE format('DELETE FROM public.permissions WHERE permission = %L;', CONCAT('custom.', NEW.api_name));
    ELSIF ((OLD.is_active <> NEW.is_active) AND NEW.is_active = true) THEN
        EXECUTE format('INSERT INTO public.permissionoptions (name, description, is_custom) VALUES (%L, %L, %L);', CONCAT('custom.', NEW.api_name), NEW.description, true);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


CREATE OR REPLACE FUNCTION
public.triggerfunction_cpermissions_delete_after()
RETURNS TRIGGER set search_path = '' AS

$$
declare
 cnt integer;
 l_historyname text;
begin

    IF (OLD.is_active = false) THEN
        cnt := 0;
    ELSE
        EXECUTE format('DELETE FROM public.permissionoptions WHERE name = %L;', CONCAT('custom.', OLD.api_name));
        EXECUTE format('DELETE FROM public.permissions WHERE permission = %L;', CONCAT('custom.', OLD.api_name));
    END IF;

    RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- actions
CREATE OR REPLACE FUNCTION
public.triggerfunction_actions_insert_after()
RETURNS TRIGGER set search_path = '' AS

$$
declare
 cnt integer;
 l_historyname text;
begin

    IF (NEW.is_active = false) THEN
        cnt := 0;
    ELSE
        EXECUTE format('INSERT INTO public.permissionoptions (name, description, is_custom) VALUES (%L, %L, %L);', CONCAT('action.', NEW.api_name), NEW.description, true);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


CREATE OR REPLACE FUNCTION
public.triggerfunction_actions_update_after()
RETURNS TRIGGER set search_path = '' AS

$$
declare
 cnt integer;
 l_historyname text;
begin

    IF ((OLD.is_active = NEW.is_active) AND NEW.is_active = false) THEN
        cnt := 0;
    ELSIF ((OLD.is_active = NEW.is_active) AND NEW.is_active = true) THEN
        cnt := 0;
    ELSIF ((OLD.is_active <> NEW.is_active) AND NEW.is_active = false) THEN
        EXECUTE format('DELETE FROM public.permissionoptions WHERE name = %L;', CONCAT('action.', NEW.api_name));
        EXECUTE format('DELETE FROM public.permissions WHERE permission = %L;', CONCAT('action.', NEW.api_name));
    ELSIF ((OLD.is_active <> NEW.is_active) AND NEW.is_active = true) THEN
        EXECUTE format('INSERT INTO public.permissionoptions (name, description, is_custom) VALUES (%L, %L, %L);', CONCAT('action.', NEW.api_name), NEW.description, true);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


CREATE OR REPLACE FUNCTION
public.triggerfunction_actions_delete_after()
RETURNS TRIGGER set search_path = '' AS

$$
declare
 cnt integer;
 l_historyname text;
begin

    IF (OLD.is_active = false) THEN
        cnt := 0;
    ELSE
        EXECUTE format('DELETE FROM public.permissionoptions WHERE name = %L;', CONCAT('action.', OLD.api_name));
        EXECUTE format('DELETE FROM public.permissions WHERE permission = %L;', CONCAT('action.', OLD.api_name));
    END IF;

    RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- apps
CREATE OR REPLACE FUNCTION
public.triggerfunction_apps_insert_after()
RETURNS TRIGGER set search_path = '' AS

$$
declare
 cnt integer;
 l_historyname text;
begin

    IF (NEW.is_active = false) THEN
        cnt := 0;
    ELSE
        EXECUTE format('INSERT INTO public.permissionoptions (name) VALUES (%L);', CONCAT('app.', NEW.api_name));
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


CREATE OR REPLACE FUNCTION
public.triggerfunction_apps_update_after()
RETURNS TRIGGER set search_path = '' AS

$$
declare
 cnt integer;
 l_historyname text;
begin

    IF ((OLD.is_active = NEW.is_active) AND NEW.is_active = false) THEN
        cnt := 0;
    ELSIF ((OLD.is_active = NEW.is_active) AND NEW.is_active = true) THEN
        cnt := 0;
    ELSIF ((OLD.is_active <> NEW.is_active) AND NEW.is_active = false) THEN
        EXECUTE format('DELETE FROM public.permissionoptions WHERE name = %L;', CONCAT('app.', OLD.api_name));
        EXECUTE format('DELETE FROM public.permissions WHERE permission = %L;', CONCAT('app.', OLD.api_name));
    ELSIF ((OLD.is_active <> NEW.is_active) AND NEW.is_active = true) THEN
        EXECUTE format('INSERT INTO public.permissionoptions (name) VALUES (%L);', CONCAT('app.', NEW.api_name));
    END IF;
    

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


CREATE OR REPLACE FUNCTION
public.triggerfunction_apps_delete_after()
RETURNS TRIGGER set search_path = '' AS

$$
declare
 cnt integer;
 l_historyname text;
begin

    IF (OLD.is_active = false) THEN
        cnt := 0;
    ELSE
        EXECUTE format('DELETE FROM public.permissionoptions WHERE name = %L;', CONCAT('app.', OLD.api_name));
    EXECUTE format('DELETE FROM public.permissions WHERE permission = %L;', CONCAT('app.', OLD.api_name));
    END IF;

    

    RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- objecthistories
CREATE OR REPLACE FUNCTION
public.triggerfunction_objecthistories_insert_after()
RETURNS TRIGGER set search_path = '' AS

$$
declare
 cnt integer;
 l_historyname text;
begin

    EXECUTE format('CREATE TABLE public.%I (
            id uuid not null default gen_random_uuid (),
            parent_id uuid not null,
            changed_at timestamp with time zone not null default now(),
            changed_by TEXT not null,
            action TEXT not null,
            oldrecord JSONB not null,
            newrecord JSONB not null,
            constraint %I_pk primary key (id)
        ) tablespace pg_default;', NEW.api_name ,NEW.api_name );
        EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY;', NEW.api_name );


        -- EXECUTE format(
        --     'drop policy if exists "pal_%I" on public.%I;
        --     create policy "pal_%I"
        --     on public.%I for select
        --     to authenticated
        --     using (
        --     public.can_access_with_optional_mfa((select auth.uid()), (select auth.jwt() ->> ''aal'')) AND (
        --         public.policyfunction_checkallpermission((select auth.uid()), ((select auth.jwt()) ->> ''email''), ''%I.all.select'') )
        --     );'
        --     , NEW.api_name , NEW.api_name , NEW.api_name , NEW.api_name , NEW.api_name , NEW.api_name
        -- );

        EXECUTE format(
            'DROP POLICY IF EXISTS "pal_%I" ON public.%I;
            CREATE POLICY "pal_%I" ON public.%I FOR SELECT TO authenticated
            USING (
                EXISTS (
                    SELECT 1 FROM public.get_authenticated_context(%L, NULL) ctx
                    WHERE ctx.mfa_passed = true 
                    AND (ctx.has_setup_perm OR ctx.has_all_perm = true)
                )
            );'
            , NEW.api_name, NEW.api_name, NEW.api_name, NEW.api_name, 
            NEW.api_name || '.all.select'
        );


        -- EXECUTE format(
        --     'drop policy if exists "pus_%I" on public.%I;
        --     create policy "pus_%I"
        --     on public.%I for select
        --     to anon
        --     using (
        --         public.policyfunction_unauth_checkallpermission(''%I.all.select'')
        --     );'
        --     , NEW.api_name, NEW.api_name, NEW.api_name, NEW.api_name, NEW.api_name, NEW.api_name
        -- );

        EXECUTE format(
            'DROP POLICY IF EXISTS "pus_%I" ON public.%I;
            CREATE POLICY "pus_%I" ON public.%I FOR SELECT TO anon
            USING (
                EXISTS (
                    SELECT 1 FROM public.get_unauth_context(%L, NULL) ctx
                    WHERE ctx.has_all_perm = true
                )
            );'
            , NEW.api_name, NEW.api_name, NEW.api_name, NEW.api_name, 
            NEW.api_name || '.all.select'
        );


        EXECUTE format('INSERT INTO public.permissionoptions (name, description) VALUES (%L, %L);', CONCAT(NEW.api_name,'.all.select'), '' );


        EXECUTE format('
            CREATE TRIGGER %I
            AFTER INSERT OR UPDATE OR DELETE ON public.%I
            FOR EACH ROW
            EXECUTE FUNCTION public.history_function();
        ', NEW.api_name, (SELECT 'c_' || substring(NEW.api_name FROM 3)));

        EXECUTE format('create index %I on public.%I (changed_at);', CONCAT(NEW.api_name, '_changed_at'), NEW.api_name);
        EXECUTE format('create index %I on public.%I (parent_id);', CONCAT(NEW.api_name, '_parent_id'), NEW.api_name);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


CREATE OR REPLACE FUNCTION
public.triggerfunction_objecthistories_update_after()
RETURNS TRIGGER set search_path = '' AS

$$
declare
 cnt integer;
 l_historyname text;
begin    

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


CREATE OR REPLACE FUNCTION
public.triggerfunction_objecthistories_delete_after()
RETURNS TRIGGER set search_path = '' AS

$$
declare
 cnt integer;
 l_historyname text;
begin

    EXECUTE format('drop policy if exists "policy_%I_select" on public.%I;', OLD.api_name, OLD.api_name);

    EXECUTE format('drop policy if exists "policy_unauth_%I_select" on public.%I;', OLD.api_name, OLD.api_name);

    EXECUTE format('DELETE FROM public.permissionoptions WHERE name = %L;', CONCAT(OLD.api_name, '.all.select'));

    EXECUTE format('DELETE FROM public.permissions WHERE permission = %L;', CONCAT(OLD.api_name, '.all.select'));

    EXECUTE format('
        DROP TRIGGER IF EXISTS %I on public.%I;
    ', OLD.api_name, (SELECT 'c_' || substring(OLD.api_name FROM 3)));

    EXECUTE format('DROP TABLE IF EXISTS public.%I;', OLD.api_name);

    RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
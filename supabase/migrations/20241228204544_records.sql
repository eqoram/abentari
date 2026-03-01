-- c_pusers

-- http://localhost:9000/#/main/objects/c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413
--ALTER TABLE public.objects DISABLE TRIGGER trigger_objects_insert_after;
BEGIN;
INSERT INTO public.objects (id, api_name, name, show_counter)
VALUES ('abfe9125-deb6-4d0f-8bc5-9d2d0700f413'::uuid, 'c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413','users', true);
COMMIT;

ALTER TABLE c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413 DISABLE TRIGGER c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413_bi;
BEGIN;
UPDATE public.objects
SET fields_selected = ARRAY[(SELECT id from public.fields WHERE api_name = 'email')]
WHERE api_name = 'c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413';
COMMIT;
--ALTER TABLE public.objects ENABLE TRIGGER trigger_objects_insert_after;

--ALTER TABLE public.fields DISABLE TRIGGER trigger_fields_insert_after;
ALTER TABLE public.fields DISABLE TRIGGER trigger_fields_update_after;
BEGIN;
INSERT INTO public.fields (id, api_name, name, parent_id, type, required, is_standard)
VALUES ('3fa00d30-52e3-414b-9fbe-c6a2cc6b1638'::uuid, 'email','email', (SELECT id FROM public.objects WHERE api_name = 'c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413'), 'text', true, true);
COMMIT;

BEGIN;
UPDATE public.objects
SET fields_selected = ARRAY[(SELECT id from public.fields WHERE api_name = 'email' AND parent_id = (SELECT id FROM public.objects WHERE api_name = 'c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413'))]
WHERE api_name = 'c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413';
COMMIT;
ALTER TABLE public.fields ENABLE TRIGGER trigger_fields_update_after;

ALTER TABLE public.fields DISABLE TRIGGER trigger_fields_update_after;
BEGIN;
INSERT INTO public.fields (id, api_name, name, parent_id, type, required, is_standard)
VALUES ('fd097deb-93da-45bc-b8a9-79e3bac670c4'::uuid, 'user_id','user_id', (SELECT id FROM public.objects WHERE api_name = 'c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413'), 'text', true, true);
COMMIT;

BEGIN;
UPDATE public.objects
SET fields_selected = array_append(fields_selected, (SELECT id from public.fields WHERE api_name = 'user_id' AND parent_id = (SELECT id FROM public.objects WHERE api_name = 'c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413')))
WHERE api_name = 'c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413'
AND NOT ((SELECT id from public.fields WHERE api_name = 'user_id' AND parent_id = (SELECT id FROM public.objects WHERE api_name = 'c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413')) = ANY(COALESCE(fields_selected, ARRAY[]::uuid[])));
COMMIT;
-- BEGIN;
-- ALTER TABLE public.c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413
-- ADD xuser_id uuid;
-- COMMIT;
ALTER TABLE public.fields DISABLE TRIGGER trigger_fields_update_after;
BEGIN;
INSERT INTO public.fields (id, api_name, name, parent_id, type, required, is_standard)
VALUES ('03b07e91-bc04-4563-a080-ee8bce371c13'::uuid, 'xuser_id','xuser_id', (SELECT id FROM public.objects WHERE api_name = 'c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413'), 'text', true, true);
COMMIT;
ALTER TABLE public.fields ENABLE TRIGGER trigger_fields_update_after;

BEGIN;
UPDATE public.objects
SET fields_selected = array_append(fields_selected, (SELECT id from public.fields WHERE api_name = 'xuser_id' AND parent_id = (SELECT id FROM public.objects WHERE api_name = 'c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413')))
WHERE api_name = 'c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413'
AND NOT ((SELECT id from public.fields WHERE api_name = 'xuser_id' AND parent_id = (SELECT id FROM public.objects WHERE api_name = 'c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413')) = ANY(COALESCE(fields_selected, ARRAY[]::uuid[])));
COMMIT;
ALTER TABLE c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413 ENABLE TRIGGER c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413_bi;

BEGIN;
CREATE OR REPLACE FUNCTION
public.triggerfunction_pusers_update_after()
RETURNS TRIGGER set search_path = '' AS

$$
declare
 cnt integer;
begin

IF((OLD.id <> NEW.id) OR (OLD.created_at <> NEW.created_at) OR (OLD.owner_id <> NEW.owner_id) OR (OLD.user_id <> NEW.user_id) OR (OLD.email <> NEW.email) OR (OLD.xuser_id <> NEW.xuser_id)) THEN
    raise exception 'DONT UPDATE STANDARD PUSER FIELDS';
END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
COMMIT;

BEGIN;
do $$
begin

--DROP TRIGGER IF EXISTS trigger_pusers_update_after ON public.c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413;
CREATE TRIGGER
  trigger_pusers_update_after
  after UPDATE ON public.c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_pusers_update_after();
end$$;
COMMIT;




-- other
INSERT INTO public.profiles (id, name, api_name, is_active, is_public, is_unauthenticated, is_standard, mfa_enabled)
VALUES ('cc2e9937-e7db-4853-b66e-68a606bbce93'::uuid, 'admin', 'admin', true, false, false, true, true);

INSERT INTO public.profiles (id, name, api_name, is_active, is_public, is_unauthenticated, is_standard, mfa_enabled)
VALUES ('43bf8fe6-9add-4ff4-b759-f8e1445f5914'::uuid, 'unauthenticated', 'unauthenticated', true, false, true, true, false);

-- setup
INSERT INTO public.permissionoptions (id, name, description, is_standard)
VALUES ('48c25c0f-4455-44f2-b5ef-0a2e137114b8'::uuid, 'setup', 'gives unlimited setup access', true);

-- setuplimited
INSERT INTO public.permissionoptions (id, name, description, is_standard)
VALUES ('ee7ee56b-d461-4e6d-b290-5898f1ca8fff'::uuid, 'setuplimited', 'gives limited setup access', true);


INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('dfb7f18c-eaea-49eb-8de3-5b58552693d6'::uuid, 'xusers.setup.select', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('98674032-d23d-4cbc-b78e-2c339f7aeea6'::uuid, 'xusers.setup.insert', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('a7c1732e-731b-498b-9f03-5c500370b670'::uuid, 'xusers.setup.update', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('92593aaf-9eb9-48b0-9b21-e746ca70607e'::uuid, 'xusers.setup.delete', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');


INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('6e9dd26f-d326-478e-b889-fb66a92c0add'::uuid, 'objects.setup.select', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('290b3c24-0115-4b7a-9d1d-9a8a98e62e1e'::uuid, 'objects.setup.insert', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('8d87fc50-93f2-4e3e-bea4-3aa19bbc19c0'::uuid, 'objects.setup.update', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('26285e58-7b2c-4dfc-bbff-b9be98c096dc'::uuid, 'objects.setup.delete', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');


INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('1bbd4fe6-528f-45aa-ab7a-908fbf668113'::uuid, 'profiles.setup.select', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('26702871-aeec-4241-baed-c6bee663ae65'::uuid, 'profiles.setup.insert', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('67c5f43f-6554-4006-9614-b45305d8d335'::uuid, 'profiles.setup.update', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('7036c950-c117-4589-882e-b757e92050cc'::uuid, 'profiles.setup.delete', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');


INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('18c76e7c-beec-4bfc-ab7b-20ffe3e5f4c1'::uuid, 'permissions.setup.select', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('949bae07-0cc4-4050-a35b-2ccee92fdeff'::uuid, 'permissions.setup.insert', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('5f6e6060-ffbe-4058-a1c1-74e77c3855c5'::uuid, 'permissions.setup.update', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('52faaa1e-f4e7-4470-afa6-bd3aaea094cd'::uuid, 'permissions.setup.delete', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');


INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('ed3f8543-0e39-42d3-8083-782e81b5e1cb'::uuid, 'permissionoptions.setup.select', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('f03e9722-e4fd-4653-89e8-4453410dec0f'::uuid, 'permissionoptions.setup.insert', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('ea30793c-5e7a-4804-831e-9702a79010e8'::uuid, 'permissionoptions.setup.update', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('90f7e69d-1b81-41f8-9a51-e5c7deecf3de'::uuid, 'permissionoptions.setup.delete', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');


INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('9f5ec85f-ff15-435f-987c-d977e8bfad3e'::uuid, 'fields.setup.select', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('a01f7aed-4a2b-4752-9f8f-80e1454a31c1'::uuid, 'fields.setup.insert', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('15c1ad4a-1acb-45ae-9aa9-b06d963f3411'::uuid, 'fields.setup.update', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('bf725b33-5547-4def-8a8d-3415cbf6b20a'::uuid, 'fields.setup.delete', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');


INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('231ff786-6113-4252-937d-f8aca88ec667'::uuid, 'settings.setup.select', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('f4f98eeb-c67b-4793-a336-51d06d48c149'::uuid, 'settings.setup.insert', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('170c77ca-5bdb-4996-b568-a5f853c87cdc'::uuid, 'settings.setup.update', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('563574e2-1f95-4bb2-b76d-2b404b8a28c3'::uuid, 'settings.setup.delete', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');


--history
INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('43a0f374-e204-4e9a-8f3f-5d86ae0b07bb'::uuid, 'i_fields.setup.select', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('85a62554-8bc2-41b6-88ce-bb7284690abb'::uuid, 'i_objects.setup.select', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('02ba3969-2f85-4092-a833-2700aef4a445'::uuid, 'i_permissionoptions.setup.select', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('088bca73-a9a7-492b-8cfa-a013428b22ac'::uuid, 'i_permissions.setup.select', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('1264982c-d7fc-453f-bf69-fc1d3f61d309'::uuid, 'i_profiles.setup.select', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('e8235dbf-b1c6-4b9f-af40-0b32d9c7161e'::uuid, 'i_xusers.setup.select', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('ce0ae396-21cd-498a-ac70-d2685b979a12'::uuid, 'i_settings.setup.select', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');


-- files
INSERT INTO public.permissionoptions (id, name, description, is_standard)
VALUES ('99992046-729c-4b54-ae4e-5fa6173e75cb'::uuid, 'file.select', 'needed to see files', true);

INSERT INTO public.permissionoptions (id, name, description, is_standard)
VALUES ('08bd9f0f-3824-43a9-8d5c-db76e75e14cc'::uuid, 'file.insert', 'needed to insert files', true);

-- setuppermission
INSERT INTO public.permissions (id, permission, profile_id, is_active)
VALUES ('c86000db-2c0e-4a27-bf2d-7d44073c2d31'::uuid, 'setup', (SELECT id FROM public.profiles WHERE api_name = 'admin'), true);

-- unauthenticated
SET LOCAL session_replication_role = replica;
INSERT INTO public.xusers (id, user_id, profile_id, invite_email, invite_secret, invite_open, is_active, is_public, is_unauthenticated, skip_puser, created_by)
VALUES ('00000000-0000-0000-0000-000000000000'::uuid, '00000000-0000-0000-0000-000000000000'::uuid, (SELECT id FROM public.profiles WHERE api_name = 'unauthenticated'), 'unauthenticated', gen_random_uuid(), false, true, false, true, true, '11111111-1111-1111-1111-111111111111');
SET LOCAL session_replication_role = DEFAULT;

-- admin
-- SET LOCAL session_replication_role = replica;
-- INSERT INTO public.xusers (id, profile_id, invite_email, invite_secret, invite_open, is_active, is_public, is_unauthenticated, skip_puser, is_superuser)
-- VALUES ('4ba98607-d109-449c-9773-250c592e4069'::uuid, (SELECT id FROM public.profiles WHERE api_name = 'admin'), '{{admincontactemail}}', gen_random_uuid(), true, true, false, false, true, true);
-- SET LOCAL session_replication_role = DEFAULT;


BEGIN;
CREATE OR REPLACE FUNCTION
public.function_setxusermfa_true()
RETURNS bool set search_path = '' AS

$$
declare
 cnt integer;
 luser_id UUID;
 ret_value BOOLEAN := FALSE;
 mfa_exists BOOLEAN := FALSE;
 record1 jsonb;
begin

    luser_id := auth.uid();

    SELECT EXISTS (
        SELECT 1
        FROM auth.mfa_factors
        WHERE user_id = user_id
        AND factor_type = 'totp'
        AND status = 'verified'
    ) INTO mfa_exists;

    IF (mfa_exists) THEN

        UPDATE public.xusers
        SET mfa_enabled = true
        WHERE user_id = auth.uid() AND is_active = true;

        ret_value := true;

    END IF;

    RETURN ret_value;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
COMMIT;


BEGIN;
CREATE OR REPLACE FUNCTION
public.function_setxusermfa_false()
RETURNS bool set search_path = '' AS

$$
declare
 cnt integer;
 luser_id UUID;
 ret_value BOOLEAN := FALSE;
 mfa_exists BOOLEAN := FALSE;
 mfa_setting BOOLEAN := FALSE;
 record1 jsonb;
begin

    luser_id := auth.uid();

    mfa_setting := (SELECT is_active FROM public.settings WHERE id = '1d658364-33b2-4e73-93cc-3359cd9ef2a6'::uuid);

    IF ( (auth.jwt() ->> 'aal') != 'aal2' ) THEN
        RAISE EXCEPTION 'MFA IS REQUIRED FOR function_setxusermfa_false';
    END IF;

    IF( mfa_setting = false ) THEN
        RAISE EXCEPTION 'MFA SETTING IS FALSE';
    END IF;

    UPDATE public.xusers
    SET mfa_enabled = false
    WHERE user_id = auth.uid() AND is_active = true;

    ret_value := true;

    RETURN ret_value;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
COMMIT;


-- keepalive
BEGIN;
INSERT INTO public.keepalive (id, currentdatetime)
VALUES ('9f5630bc-9b63-4053-9ceb-ee31345072bb'::uuid, EXTRACT(EPOCH FROM NOW()));
COMMIT;


--settings
BEGIN;
INSERT INTO public.settings (id, api_name, name, description, is_active, is_standard, rules)
VALUES ('cd700b62-11e1-4664-bfe9-96a8ff376a59'::uuid, 'allowresetpassword', 'allows reset password', 'Only affects frontend API might still work altough it is deactivated.', true, true, 'no rules');
COMMIT;

BEGIN;
INSERT INTO public.settings (id, api_name, name, description, is_active, is_standard, rules)
VALUES ('1d658364-33b2-4e73-93cc-3359cd9ef2a6'::uuid, 'allowresetmfa', 'allows reset mfa', 'Only affects frontend API might still work altough it is deactivated.', true, true, 'no rules');
COMMIT;

BEGIN;
INSERT INTO public.settings (id, api_name, name, description, is_active, is_standard, rules)
VALUES ('490fc8d6-9ff6-4b0d-8035-71e3702b43b6'::uuid, 'countersetup', 'counter setup', 'Shows counter for setup lists.', true, true, 'no rules');
COMMIT;

BEGIN;
INSERT INTO public.settings (id, api_name, name, description, is_active, is_standard, rules)
VALUES ('0d87f494-4fd4-439e-adb3-71ed4fcfcb04'::uuid, 'countersetuphistory', 'counter setup history', 'Shows counter for setup history lists.', true, true, 'no rules');
COMMIT;

BEGIN;
INSERT INTO public.settings (id, api_name, name, description, is_active, is_standard, rules)
VALUES ('2cd767b2-ebb8-4023-9df7-1b22a0f13d3e'::uuid, 'counterhistory', 'counter history', 'Shows counter for history lists.', true, true, 'no rules');
COMMIT;


-- csql
INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('c714b0b4-2082-4fd8-ac93-5d82024363b2'::uuid, 'csql.setup.select', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('43df9d70-ea42-4268-8a9d-0620f3590e88'::uuid, 'csql.setup.insert', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('212f5baf-941a-489b-a8bc-4e071eb36a64'::uuid, 'csql.setup.update', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('12329ded-4b54-46b5-bf05-836220a800bf'::uuid, 'csql.setup.delete', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('be5b5c97-3541-4beb-92af-cc15c916fcd2'::uuid, 'i_csql.setup.select', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');


-- pages
INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('a7993498-c594-4210-9fda-88fadd265c0d'::uuid, 'pages.setup.select', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('7eb96d41-97f5-4035-afce-20d375cad5d0'::uuid, 'pages.setup.insert', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('e9fe0139-b36b-496e-92d3-8caa1f4554ab'::uuid, 'pages.setup.update', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('edf13eec-d01a-4348-8d33-f3134120397a'::uuid, 'pages.setup.delete', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('1e57713d-a1e3-4ea2-a125-284498a63c17'::uuid, 'i_pages.setup.select', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');


-- cpermissions
INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('02644c22-f250-4fba-aac6-2cbf998d7423'::uuid, 'cpermissions.setup.select', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('99fd71f2-8a43-40fc-8021-e8029b2421e9'::uuid, 'cpermissions.setup.insert', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('a9aa13ec-fa75-4792-b222-0b3803886739'::uuid, 'cpermissions.setup.update', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('4516c8f2-a6ad-4f19-a1a4-f06030498267'::uuid, 'cpermissions.setup.delete', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('e8996df4-f084-4026-836a-47edd60d063e'::uuid, 'i_cpermissions.setup.select', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');


-- actions
INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('881437b9-b641-4f54-a591-077521fe9f8b'::uuid, 'actions.setup.select', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('7683cc26-0b44-48cc-8d6a-e217d4e140fe'::uuid, 'actions.setup.insert', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('3f8c6ab1-d030-44f3-a4ef-51740f0d0624'::uuid, 'actions.setup.update', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('0f636521-832a-4782-b333-8adc27256460'::uuid, 'actions.setup.delete', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('317c6090-154f-427d-b04f-635ac55b2bb6'::uuid, 'i_actions.setup.select', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');


-- appoptions
INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('84175188-ac8f-4d70-93b8-0fc61efafb2e'::uuid, 'appoptions.setup.select', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('afe52682-0ddc-4eeb-bc20-f1239512b9dc'::uuid, 'appoptions.setup.insert', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('cbd39643-4b78-45e8-b109-be6567f6e517'::uuid, 'appoptions.setup.update', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('d0c34085-5c9f-4211-9738-703718ac8656'::uuid, 'appoptions.setup.delete', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('8ceb7ad1-f0d8-41c9-8feb-78387247595a'::uuid, 'i_appoptions.setup.select', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');


-- show
INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('b12a10f2-36ea-4bb6-832e-1b8089020d03'::uuid, 'show.apps', true, 'allows to see apps in nav bar');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('00fb2e12-86e2-47c9-bb7c-ccfbb636a88f'::uuid, 'show.pages', true, 'allows to see pages in nav bar');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('59a28cfc-41ca-4fa2-93be-d34e7ead49dd'::uuid, 'show.objects', true, 'allows to see objects in nav bar');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('fde58bef-e2f4-49cf-8c56-d17055242b41'::uuid, 'show.history', true, 'allows to see object history in nav bar');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('dea8a7a7-7b4e-44c7-bace-ee11848c16a5'::uuid, 'show.mfa', true, 'allows to see mfa in nav bar');


-- showall
INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('aba15638-8c0e-48c5-9128-2b8170af8e18'::uuid, 'showall.apps', true, 'might be needed for custom sharing policies');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('083bf8ab-4d55-449e-8ea4-72a94b5483ee'::uuid, 'showall.actions', true, 'might be needed for custom sharing policies');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('1e3f50e4-ee7f-4884-bf60-4ecfae4de95b'::uuid, 'showall.objecthistories', true, 'might be needed for custom sharing policies');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('72d32414-bc79-49b1-a6cd-24af706bb9e6'::uuid, 'showall.objects', true, 'might be needed for custom sharing policies');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('842bd8ee-18c2-4bb9-9269-d96ea9f67e09'::uuid, 'showall.pages', true, 'might be needed for custom sharing policies');


-- apps
INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('c71f5df4-6126-460e-a641-099e334a8196'::uuid, 'apps.setup.select', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('307b15fc-054a-4303-b183-0d93e326162a'::uuid, 'apps.setup.insert', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('7e3f78b2-c197-4fec-aad8-1761e8761b2f'::uuid, 'apps.setup.update', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('2dfc2d15-a41e-410d-8a06-f42d940c1a15'::uuid, 'apps.setup.delete', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('d3cac895-d6d1-4a07-adab-322ac46b8a3c'::uuid, 'i_apps.setup.select', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');


-- run
INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('9ad2fdf4-fb03-4221-a11f-3b625a188aa8'::uuid, 'run.setup', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

create or replace function runsql(query text)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  result json;
  permissionsetup bool;
  permissionsetuplimited bool;
  permissionsetuprun bool;
  l_userid uuid;
    l_objectname text;
    is_api_request bool;
    auth_notnull bool;
    new_data JSONB;
    lxuserid uuid;
    helperjson text;
begin
    permissionsetup := false;
    permissionsetuplimited := false;
    permissionsetuprun := false;
    
    helperjson := '{}';

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


    SELECT (EXISTS (
        SELECT 1
        FROM public.permissions
        WHERE (permission = 'setup') AND is_active = true AND profile_id =
        ( SELECT id FROM public.profiles WHERE is_active = true AND id = (SELECT profile_id FROM public.xusers WHERE user_id = auth.uid() AND is_active = true) )
    )) INTO permissionsetup;

    SELECT (EXISTS (
        SELECT 1
        FROM public.permissions
        WHERE (permission = 'setuplimited') AND is_active = true AND profile_id =
        ( SELECT id FROM public.profiles WHERE is_active = true AND id = (SELECT profile_id FROM public.xusers WHERE user_id = auth.uid() AND is_active = true) )
    )) INTO permissionsetuplimited;

    SELECT (EXISTS (
        SELECT 1
        FROM public.permissions
        WHERE (permission = 'run.setup') AND is_active = true AND profile_id =
        ( SELECT id FROM public.profiles WHERE is_active = true AND id = (SELECT profile_id FROM public.xusers WHERE user_id = auth.uid() AND is_active = true) )
    )) INTO permissionsetuprun;

    IF (permissionsetup OR (permissionsetuplimited AND permissionsetuprun)) THEN
        EXECUTE format('INSERT INTO public.%I (parent_id, changed_at, changed_by, action, oldrecord, newrecord) VALUES (%L,%L,%L,%L,%L,%L);' , 'i_run', gen_random_uuid(), NOW(), l_userid, 'INSERT', to_jsonb(helperjson), to_jsonb(query));
        BEGIN
        EXECUTE format('SELECT json_agg(t) FROM (%s) t', query) INTO result;
        IF result IS NULL THEN
            return 'Query succeeded but returned no rows.';
        ELSE
            RETURN format('Query succeeded. Result: %s', result);
        END IF;
    EXCEPTION
        WHEN OTHERS THEN
            RETURN format('Error occurred: %s', SQLERRM);
    END;
    ELSE
        raise exception 'Permission denied: user lacks required setup permissions';
    END IF;

    return result;
end;
$$;


INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('0ea7a7da-a241-4205-bc26-915a66cc1aa2'::uuid, 'i_run.setup.select', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');


INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('ec24412a-c49a-44b9-b2c4-896ff6e77a3b'::uuid, 'i_objecthistories.setup.select', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');


INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('9dcee447-e260-4584-9ccc-99a311272ad8'::uuid, 'retrieve.setup', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('29c349de-dc4f-4a8d-9936-53d27aa94755'::uuid, 'deploy.setup', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('c4aca35e-a71a-4e9c-90a1-dae4f0937216'::uuid, 'i_retrieve.setup.select', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

INSERT INTO public.permissionoptions (id, name, is_standard, description)
VALUES ('04b5fb55-c08a-4551-8872-2366ecc2bbbf'::uuid, 'i_deploy.setup.select', true, 'NOTICE: setup or setuplimited permissions are needed for history to be working');

-- delete
DELETE FROM public.apps WHERE api_name NOT IN ('c_firstapp__d042baa4_8d02_4476_a5fe_1333603255d4');
DELETE FROM public.pages WHERE api_name NOT IN ('c_quasar__933e3b15_2f41_4ed1_9b7a_16817aea1cc2', 'c_travelmap__cb1fe846_fd17_4ca3_b503_5378c0d16376', 'c_html__d42e30d6_f0ca_418d_b6ed_f0257aa52987');
DELETE FROM public.profiles WHERE api_name NOT IN ('admin', 'unauthenticated', 'c_pwadmin__e8554b6f_0b3d_4cd6_9c1c_aedbb2358372', 'c_pwuser__26c7320f_49af_4cb2_a1a5_197669492ed8', 'c_nothing__7fa22aab_4178_460d_97c4_70eeea767748');
DELETE FROM public.permissions WHERE id NOT IN ('f59c9f7d-03cd-4645-839d-860b3623dfe0', 'c86000db-2c0e-4a27-bf2d-7d44073c2d31') AND permission NOT IN ('show.apps', 'show.history', 'show.mfa', 'show.objects', 'show.pages');
-- DELETE FROM public.xusers WHERE invite_email NOT IN ('admin@abentari.invalid', 'unauthenticated', 'nothing@abentari.invalid', 'pw_user@abentari.invalid', 'pw_admin@abentari.invalid');
DELETE FROM public.objects WHERE api_name NOT IN ('c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413', 'c_atestwheels__42906140_4339_44a3_8c98_8740e6c98624', 'c_atestcars__c34ecab4_4658_4f5e_87da_f31adc51958b');
DELETE FROM public.fields WHERE api_name NOT IN ('email', 'user_id', 'xuser_id', 'c_atestpicklistmulti__4e6f918d_9b54_4d38_995c_6c1585acdbff', 'c_atestpicklist__a2083e6b_570a_4a8f_a84e_a2dba20dde08', 'c_atestdisplay__db19a070_30bb_4cb1_a610_2a40b0ebcd86', 'c_atestfile__9150c7a1_58d2_4121_bb29_4c8eda3f20ad', 'c_atestbool__cd517ee9_f593_42d4_96c4_2c4f22a96ded', 'c_atestlongtext__30a35a60_8f8a_49c4_951a_51b70d67045a', 'c_atestnumber__e730b596_efd6_4670_a3da_8f45c8731df1', 'c_atestdatetime__0703ff4e_abda_491a_8ae3_0f3e0d6fe007', 'c_atestdate__a086e0ae_0fb2_46b9_8ffc_76cc688c1317', 'c_atestrelationmulti__90dc549e_84f9_49b9_b285_07946d5d0530', 'c_atestrelationcar__9136e4d2_4be5_41ba_8d98_f798dc60ef9c', 'c_atestposition__8560e48a_361a_4512_b519_0fce37152919', 'c_atestbrand__f561e0df_7250_446a_90c7_844e32cd1cd8');
DELETE FROM public.cpermissions WHERE api_name NOT IN ('00000000-0000-0000-0000-000000000000');
DELETE FROM public.actions WHERE api_name NOT IN ('c_actionnumber1__9dd72492_63ff_4614_a702_ccfc832472db');
DELETE FROM public.csql WHERE api_name NOT IN ('00000000-0000-0000-0000-000000000000');
DELETE FROM public.settings WHERE api_name NOT IN ('allowresetmfa', 'allowresetpassword', 'countersetuphistory', 'countersetup', 'counterhistory');

DELETE FROM public.objecthistories WHERE api_name NOT IN ('h_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413', 'h_atestcars__c34ecab4_4658_4f5e_87da_f31adc51958b', 'h_atestwheels__42906140_4339_44a3_8c98_8740e6c98624');
DELETE FROM public.permissionoptions WHERE name NOT IN ('c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413.all.select', 'c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413.all.insert', 'c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413.all.update', 'c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413.all.delete', 'c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413.owner.select', 'c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413.owner.insert', 'c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413.owner.update', 'c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413.owner.delete', 'h_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413.all.select', 'setup', 'setuplimited', 'xusers.setup.select', 'xusers.setup.insert', 'xusers.setup.update', 'xusers.setup.delete', 'objects.setup.select', 'objects.setup.insert', 'objects.setup.update', 'objects.setup.delete', 'profiles.setup.select', 'profiles.setup.insert', 'profiles.setup.update', 'profiles.setup.delete', 'permissions.setup.select', 'permissions.setup.insert', 'permissions.setup.update', 'permissions.setup.delete', 'permissionoptions.setup.select', 'permissionoptions.setup.insert', 'permissionoptions.setup.update', 'permissionoptions.setup.delete', 'fields.setup.select', 'fields.setup.insert', 'fields.setup.update', 'fields.setup.delete', 'settings.setup.select', 'settings.setup.insert', 'settings.setup.update', 'settings.setup.delete', 'i_fields.setup.select', 'i_objects.setup.select', 'i_permissionoptions.setup.select', 'i_permissions.setup.select', 'i_profiles.setup.select', 'i_xusers.setup.select', 'i_settings.setup.select', 'file.select', 'file.insert', 'csql.setup.select', 'csql.setup.insert', 'csql.setup.update', 'csql.setup.delete', 'i_csql.setup.select', 'pages.setup.select', 'pages.setup.insert', 'pages.setup.update', 'pages.setup.delete', 'i_pages.setup.select', 'cpermissions.setup.select', 'cpermissions.setup.insert', 'cpermissions.setup.update', 'cpermissions.setup.delete', 'i_cpermissions.setup.select', 'actions.setup.select', 'actions.setup.insert', 'actions.setup.update', 'actions.setup.delete', 'i_actions.setup.select', 'appoptions.setup.select', 'appoptions.setup.insert', 'appoptions.setup.update', 'appoptions.setup.delete', 'i_appoptions.setup.select', 'show.apps', 'show.pages', 'show.objects', 'show.history', 'show.mfa', 'apps.setup.select', 'apps.setup.insert', 'apps.setup.update', 'apps.setup.delete', 'i_apps.setup.select', 'run.setup', 'i_run.setup.select', 'i_objecthistories.setup.select', 'retrieve.setup', 'deploy.setup', 'i_retrieve.setup.select', 'i_deploy.setup.select', 'c_atestcars__c34ecab4_4658_4f5e_87da_f31adc51958b.all.select', 'c_atestcars__c34ecab4_4658_4f5e_87da_f31adc51958b.all.insert', 'c_atestcars__c34ecab4_4658_4f5e_87da_f31adc51958b.all.update', 'c_atestcars__c34ecab4_4658_4f5e_87da_f31adc51958b.all.delete', 'c_atestcars__c34ecab4_4658_4f5e_87da_f31adc51958b.owner.select', 'c_atestcars__c34ecab4_4658_4f5e_87da_f31adc51958b.owner.insert', 'c_atestcars__c34ecab4_4658_4f5e_87da_f31adc51958b.owner.update', 'c_atestcars__c34ecab4_4658_4f5e_87da_f31adc51958b.owner.delete', 'h_atestcars__c34ecab4_4658_4f5e_87da_f31adc51958b.all.select', 'c_atestwheels__42906140_4339_44a3_8c98_8740e6c98624.all.select', 'c_atestwheels__42906140_4339_44a3_8c98_8740e6c98624.all.insert', 'c_atestwheels__42906140_4339_44a3_8c98_8740e6c98624.all.update', 'c_atestwheels__42906140_4339_44a3_8c98_8740e6c98624.all.delete', 'c_atestwheels__42906140_4339_44a3_8c98_8740e6c98624.owner.select', 'c_atestwheels__42906140_4339_44a3_8c98_8740e6c98624.owner.insert', 'c_atestwheels__42906140_4339_44a3_8c98_8740e6c98624.owner.update', 'c_atestwheels__42906140_4339_44a3_8c98_8740e6c98624.owner.delete', 'h_atestwheels__42906140_4339_44a3_8c98_8740e6c98624.all.select', 'page.c_travelmap__cb1fe846_fd17_4ca3_b503_5378c0d16376', 'app.c_firstapp__d042baa4_8d02_4476_a5fe_1333603255d4', 'action.c_actionnumber1__9dd72492_63ff_4614_a702_ccfc832472db', 'page.c_html__d42e30d6_f0ca_418d_b6ed_f0257aa52987', 'page.c_quasar__933e3b15_2f41_4ed1_9b7a_16817aea1cc2', 'showall.apps', 'showall.actions', 'showall.objecthistories', 'showall.objects', 'showall.pages');

DELETE FROM public.c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413 WHERE email NOT IN ('nothing@abentari.invalid');
DELETE FROM public.keepalive WHERE id NOT IN ('9f5630bc-9b63-4053-9ceb-ee31345072bb');
DELETE FROM public.testtable WHERE id NOT IN ('00000000-0000-0000-0000-000000000000');

--DELETE FROM storage.objects WHERE bucket_id = 'storage1';
--DELETE FROM storage.objects;

DELETE FROM public.i_appoptions WHERE id NOT IN ('00000000-0000-0000-0000-000000000000');
DELETE FROM public.i_apps WHERE id NOT IN ('00000000-0000-0000-0000-000000000000');
DELETE FROM public.i_actions WHERE id NOT IN ('00000000-0000-0000-0000-000000000000');
DELETE FROM public.i_cpermissions WHERE id NOT IN ('00000000-0000-0000-0000-000000000000');
DELETE FROM public.i_csql WHERE id NOT IN ('00000000-0000-0000-0000-000000000000');
DELETE FROM public.i_deploy WHERE id NOT IN ('00000000-0000-0000-0000-000000000000');
DELETE FROM public.i_fields WHERE id NOT IN ('00000000-0000-0000-0000-000000000000');
DELETE FROM public.i_objecthistories WHERE id NOT IN ('00000000-0000-0000-0000-000000000000');
DELETE FROM public.i_objects WHERE id NOT IN ('00000000-0000-0000-0000-000000000000');
DELETE FROM public.i_pages WHERE id NOT IN ('00000000-0000-0000-0000-000000000000');
DELETE FROM public.i_permissionoptions WHERE id NOT IN ('00000000-0000-0000-0000-000000000000');
DELETE FROM public.i_permissions WHERE id NOT IN ('00000000-0000-0000-0000-000000000000');
DELETE FROM public.i_profiles WHERE id NOT IN ('00000000-0000-0000-0000-000000000000');
DELETE FROM public.i_retrieve WHERE id NOT IN ('00000000-0000-0000-0000-000000000000');
DELETE FROM public.i_run WHERE id NOT IN ('00000000-0000-0000-0000-000000000000');
DELETE FROM public.i_settings WHERE id NOT IN ('00000000-0000-0000-0000-000000000000');
DELETE FROM public.i_xusers WHERE id NOT IN ('00000000-0000-0000-0000-000000000000');


-- CREATE OR REPLACE FUNCTION public.countrows(ptablename text, ptime text, psearch bool, psearchtext text)
-- RETURNS integer
-- LANGUAGE plpgsql
-- SECURITY DEFINER
-- SET search_path = ''
-- AS $$
-- DECLARE
--     counter integer := 0;
--     haspermissionall bool := false;
--     haspermissionowner bool := false;
--     sql text := '';
-- BEGIN

--     SELECT (EXISTS (
--         SELECT 1
--         FROM public.permissions
--         WHERE
--         (
--         permission LIKE CONCAT(ptablename, '.all.select')
--         OR permission = 'setup'
--         )
--         AND is_active = true AND profile_id =
--         ( SELECT id FROM public.profiles WHERE is_active = true AND id = (SELECT profile_id FROM public.xusers WHERE user_id = auth.uid() AND is_active = true) )
--     )) INTO haspermissionall;

--     SELECT (EXISTS (
--         SELECT 1
--         FROM public.permissions
--         WHERE
--         (
--         permission LIKE CONCAT(ptablename, '.owner.select')
--         OR permission = 'setup'
--         )
--         AND is_active = true AND profile_id =
--         ( SELECT id FROM public.profiles WHERE is_active = true AND id = (SELECT profile_id FROM public.xusers WHERE user_id = auth.uid() AND is_active = true) )
--     )) INTO haspermissionowner;

--     IF (haspermissionall = false AND haspermissionowner = false) THEN
--         RAISE EXCEPTION 'OBEJECT PERMISSION IS MISSING FOR SEARCH';
--     END IF;

--     IF (haspermissionall = true) THEN
--         sql := format('SELECT count(id) FROM public.%I', ptablename);
--         EXECUTE sql INTO counter;
--         RETURN counter;
--     END IF;

--     IF (haspermissionowner = true) THEN
--         sql := format('SELECT count(id) FROM public.%I WHERE owner_id = %L', ptablename, (SELECT id FROM public.xusers WHERE user_id = auth.uid() AND is_active = true));
--         EXECUTE sql INTO counter;
--         RETURN counter;
--     END IF;
   
-- END;
-- $$;


-- CREATE OR REPLACE FUNCTION public.run_remote_migrations_http()
-- RETURNS text
-- LANGUAGE plpgsql
-- SECURITY DEFINER
-- SET search_path = ''
-- AS $$
-- DECLARE
--     -- The http extension returns a record/composite type
--     http_resp    record; 
    
--     files        jsonb;
--     filename     text;
--     sql_body     text;

--     migraurl     text;
--     cnt          integer := 0;
--     need_cooldown boolean := false;
-- BEGIN
--     -- 1. Check for advisory lock to prevent concurrent migrations
--     IF NOT pg_try_advisory_lock(123456) THEN
--         RETURN 'LOCKED';
--     END IF;

--     BEGIN
--         -- 2. Fetch the base URL from config
--         SELECT value
--         INTO migraurl
--         FROM public.zconfig
--         WHERE name = 'migrationurl'
--           AND is_active = true
--         LIMIT 1;

--         IF migraurl IS NULL THEN
--             PERFORM pg_advisory_unlock(123456);
--             RETURN 'NO MIGRATION URL SET';
--         END IF;

--         -- Ensure the extension is available in the expected schema
--         CREATE EXTENSION IF NOT EXISTS http WITH SCHEMA extensions;

--         ----------------------------------------------------------------
--         -- Fetch index.json
--         ----------------------------------------------------------------
--         SELECT * INTO http_resp FROM extensions.http_get(migraurl || 'index.json');

--         IF http_resp.status <> 200 THEN
--             RAISE EXCEPTION 'HTTP % fetching index.json', http_resp.status;
--         END IF;

--         -- 'content' is text, cast it to jsonb
--         files := http_resp.content::jsonb;

--         ----------------------------------------------------------------
--         -- Loop migrations
--         ----------------------------------------------------------------
--         FOR filename IN
--             SELECT jsonb_array_elements_text(files)
--         LOOP
--             -- Skip if already applied
--             IF EXISTS (
--                 SELECT 1
--                 FROM public.zmigrations
--                 WHERE migration = filename
--             ) THEN
--                 CONTINUE;
--             END IF;

--             ------------------------------------------------------------
--             -- Fetch migration SQL
--             ------------------------------------------------------------
--             SELECT * INTO http_resp FROM extensions.http_get(migraurl || filename);

--             IF http_resp.status <> 200 THEN
--                 RAISE EXCEPTION 'HTTP % fetching %', http_resp.status, filename;
--             END IF;

--             sql_body := http_resp.content;

--             -- Execute the migration SQL
--             EXECUTE sql_body;

--             -- Record completion
--             INSERT INTO public.zmigrations (migration)
--             VALUES (filename);

--             cnt := cnt + 1;
--             need_cooldown := true;
--         END LOOP;

--         -- Optional cooldown period
--         IF need_cooldown THEN
--             PERFORM pg_sleep(1);
--         END IF;

--         PERFORM pg_advisory_unlock(123456);
--         RETURN CONCAT('applied migration files: ', cnt);

--     EXCEPTION WHEN OTHERS THEN
--         PERFORM pg_advisory_unlock(123456);
--         RAISE;
--     END;
-- END;
-- $$;
CREATE OR REPLACE FUNCTION
public.policyfunction_storageinsert(pxuserid uuid, ptable text, pcolumn text, plink text, pfolderuserid text)
RETURNS bool set search_path = '' AS $$
DECLARE
 lownerid uuid;
 lpermissioninsertall text;
 lpermissionupdateall text;
 lpermissioninsertowner text;
 lpermissionupdateowner text;
BEGIN

    -- EXECUTE format('SELECT owner_id FROM public.%I WHERE %I = %L;',ptable, pcolumn, plink) into lownerid;

    lpermissioninsertall := CONCAT(ptable, '.all.insert');
    lpermissionupdateall := CONCAT(ptable, '.all.update');
    lpermissioninsertowner := CONCAT(ptable, '.owner.insert');
    lpermissionupdateowner := CONCAT(ptable, '.owner.update');

    RETURN (
        (pxuserid::text = pfolderuserid::text)
        AND 
        (
            EXISTS (
                SELECT 1
                FROM public.permissions
                WHERE permission = 'setup' AND is_active = true AND profile_id =
                ( SELECT id FROM public.profiles WHERE is_active = true AND id = (SELECT profile_id FROM public.xusers WHERE id = pxuserid AND is_active = true) )
            )
            OR
            (
                EXISTS (
                    SELECT 1
                    FROM public.permissions
                    WHERE permission = 'file.insert' AND is_active = true AND profile_id =
                    ( SELECT id FROM public.profiles WHERE is_active = true AND id = (SELECT profile_id FROM public.xusers WHERE id = pxuserid AND is_active = true) )
                )
                AND
                EXISTS (
                    SELECT 1
                    FROM public.permissions
                    WHERE (permission = lpermissioninsertall
                    OR permission = lpermissionupdateall
                    OR permission = lpermissioninsertowner
                    OR permission = lpermissionupdateowner)
                    AND is_active = true AND profile_id =
                    ( SELECT id FROM public.profiles WHERE is_active = true AND id = (SELECT profile_id FROM public.xusers WHERE id = pxuserid AND is_active = true) )
                )
            )
        )
    );

END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


CREATE OR REPLACE FUNCTION
public.policyfunction_storageselect(pxuserid uuid, ptable text, pcolumn text, plink text, pfolderuserid text)
RETURNS bool set search_path = '' AS $$
DECLARE
 lownerid uuid;
 lpermissionselectall text;
 lpermissionselectowner text;
BEGIN

    RAISE WARNING 'am2(%)', format('SELECT owner_id FROM public.%I WHERE %I = %L;',ptable, pcolumn, plink)::text;

    EXECUTE format('SELECT owner_id FROM public.%I WHERE %I = %L;',ptable, pcolumn, plink) into lownerid;

    lpermissionselectall := CONCAT(ptable, '.all.select');
    lpermissionselectowner := CONCAT(ptable, '.owner.select');

    RAISE WARNING 'bc1 pxuserid (%)', (pxuserid)::text;

    RETURN (
        -- -- users can read their own files if they have file select or setup permission
        -- (EXISTS (
        --     SELECT 1
        --     FROM public.permissions
        --     WHERE permission = 'file.select' AND is_active = true AND profile_id =
        --     ( SELECT id FROM public.profiles WHERE is_active = true AND id = (SELECT profile_id FROM public.xusers WHERE id = pxuserid AND is_active = true) )
        -- )
        -- AND
        -- (pxuserid::text = pfolderuserid::text))
        -- OR

        (
            EXISTS (
                SELECT 1
                FROM public.permissions
                WHERE permission = 'setup' AND is_active = true AND profile_id =
                ( SELECT id FROM public.profiles WHERE is_active = true AND id = (SELECT profile_id FROM public.xusers WHERE id = pxuserid AND is_active = true) )
            )
            OR
            (
                EXISTS (
                    SELECT 1
                    FROM public.permissions
                    WHERE permission = 'file.select' AND is_active = true AND profile_id =
                    ( SELECT id FROM public.profiles WHERE is_active = true AND id = (SELECT profile_id FROM public.xusers WHERE id = pxuserid AND is_active = true) )
                )
                AND
                EXISTS (
                    SELECT 1
                    FROM public.permissions
                    WHERE permission = lpermissionselectall
                    AND is_active = true AND profile_id =
                    ( SELECT id FROM public.profiles WHERE is_active = true AND id = (SELECT profile_id FROM public.xusers WHERE id = pxuserid AND is_active = true) )
                )
            )
            OR
            (
                EXISTS (
                    SELECT 1
                    FROM public.permissions
                    WHERE permission = 'file.select' AND is_active = true AND profile_id =
                    ( SELECT id FROM public.profiles WHERE is_active = true AND id = (SELECT profile_id FROM public.xusers WHERE id = pxuserid AND is_active = true) )
                )
                AND
                EXISTS (
                    SELECT 1
                    FROM public.permissions
                    WHERE permission = lpermissionselectowner
                    AND is_active = true AND profile_id =
                    ( SELECT id FROM public.profiles WHERE is_active = true AND id = (SELECT profile_id FROM public.xusers WHERE id = pxuserid AND is_active = true) )
                )
                AND
                (lownerid = pxuserid)
            )     
            
        )
    );

END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


drop policy if exists "storageinsert" on storage.objects;
create policy "storageinsert"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'storage1'
  and (storage.foldername(name))[1] = 'objects'
  and policyfunction_storageinsert((SELECT id FROM public.xusers WHERE user_id = (select auth.uid())), (storage.foldername(name))[2]::text , (storage.foldername(name))[3]::text ,  CONCAT(array_to_string( storage.foldername(name), '/'), CONCAT('/', right(name, position('/' in reverse(name)) - 1))) , (storage.foldername(name))[4]::text)
);


drop policy if exists "storageinsertunauth" on storage.objects;
create policy "storageinsertunauth"
on storage.objects
for insert
to anon
with check (
  bucket_id = 'storage1'
  and (storage.foldername(name))[1] = 'objects'
  and policyfunction_storageinsert('00000000-0000-0000-0000-000000000000'::uuid, (storage.foldername(name))[2]::text , (storage.foldername(name))[3]::text ,  CONCAT(array_to_string( storage.foldername(name), '/'), CONCAT('/', right(name, position('/' in reverse(name)) - 1))) , (storage.foldername(name))[4]::text)
);


drop policy if exists "storageselect" on storage.objects;
create policy "storageselect"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'storage1'
  and (storage.foldername(name))[1] = 'objects'
  and (policyfunction_checkallpermission((select auth.uid()), ((select auth.jwt()) ->> 'email'), 'setup') 
  OR policyfunction_storageselect((SELECT id FROM public.xusers WHERE user_id = (select auth.uid())), (storage.foldername(name))[2]::text , (storage.foldername(name))[3]::text ,  CONCAT(array_to_string( storage.foldername(name), '/'), CONCAT('/', right(name, position('/' in reverse(name)) - 1))) , (storage.foldername(name))[4]::text))
);




-- RAISE WARNING 'bc1 pxuserid (%)', (pxuserid)::text;
--     RAISE WARNING 'bc2 ptable (%)', (ptable)::text;
--     RAISE WARNING 'bc3 pcolumn (%)', (pcolumn)::text;
--     RAISE WARNING 'bc4 plink (%)', (plink)::text;
--     RAISE WARNING 'bc5 pfolderuserid (%)', (pfolderuserid)::text;

--     RAISE WARNING 'gg1 (%)', (EXISTS (
--                 SELECT 1
--                 FROM public.permissions
--                 WHERE permission = 'setup' AND is_active = true AND profile_id =
--                 ( SELECT id FROM public.profiles WHERE is_active = true AND id = (SELECT profile_id FROM public.xusers WHERE id = pxuserid AND is_active = true) )
--             ))::text;
--     RAISE WARNING 'gg2 (%)', (EXISTS (
--                     SELECT 1
--                     FROM public.permissions
--                     WHERE permission = 'file.insert' AND is_active = true AND profile_id =
--                     ( SELECT id FROM public.profiles WHERE is_active = true AND id = (SELECT profile_id FROM public.xusers WHERE id = pxuserid AND is_active = true) )
--                 ))::text;
--     RAISE WARNING 'gg3 (%)', (EXISTS (
--                     SELECT 1
--                     FROM public.permissions
--                     WHERE (permission = lpermissioninsertall
--                     OR permission = lpermissionupdateall
--                     OR permission = lpermissioninsertowner
--                     OR permission = lpermissionupdateowner)
--                     AND is_active = true AND profile_id =
--                     ( SELECT id FROM public.profiles WHERE is_active = true AND id = (SELECT profile_id FROM public.xusers WHERE id = pxuserid AND is_active = true) )
--                 ))::text;

--     RAISE WARNING 'ff1 lpermissioninsertall (%)', (lpermissioninsertall)::text;
--     RAISE WARNING 'ff1 lpermissionupdateall (%)', (lpermissionupdateall)::text;
--     RAISE WARNING 'ff1 lpermissioninsertowner (%)', (lpermissioninsertowner)::text;
--     RAISE WARNING 'ff1 lpermissionupdateowner (%)', (lpermissionupdateowner)::text;

-- INSERT

-- - folder = xuserid
-- - AND ( setup
-- - OR (file.insert AND X.all.insert)
-- - OR (file.insert AND X.all.update)
-- - OR (file.insert AND X.owner.insert)
-- - OR (file.insert AND X.owner.update) )

-- Parameter: xuserid, table, column, link, folderuserid

-- SELECT

-- - setup
-- - OR (file.insert AND X.all.insert)
-- - OR (file.insert AND X.all.update)
-- - OR (file.insert AND X.owner.insert AND owner_id = xuserid)
-- - OR (file.insert AND X.owner.update AND owner_id = xuserid)

-- Parameter: xuserid, table, column, link






drop policy if exists "storageselectunauth" on storage.objects;
create policy "storageselectunauth"
on storage.objects
for select
to anon
using (
  bucket_id = 'storage1'
  and (storage.foldername(name))[1] = 'objects'
  and policyfunction_storageselect('00000000-0000-0000-0000-000000000000'::uuid, (storage.foldername(name))[2]::text , (storage.foldername(name))[3]::text ,  CONCAT(array_to_string( storage.foldername(name), '/'), CONCAT('/', right(name, position('/' in reverse(name)) - 1))) , (storage.foldername(name))[4]::text)
);




insert into storage.buckets(id, name, public, file_size_limit) values ('storage1', 'storage1', false, 52428800);




-- drop policy if exists "storagedelete" on storage.objects;
-- create policy "storagedelete"
-- on storage.objects
-- for delete
-- to authenticated
-- using (
--   bucket_id = 'storage1'
--   and (storage.foldername(name))[1] = 'objects'
--   and policyfunction_checkallpermission((select auth.uid()), ((select auth.jwt()) ->> 'email'), 'setup')
-- );


-- --["20241228204245_tables.sql","20241228204320_triggerfunctions.sql","20241228204347_triggers.sql","20241228204410_policyfunctions.sql","20241228204434_policies.sql","20241228204544_records.sql","20241228204608_policystorage.sql"]
-- INSERT INTO public.zmigrations (migration) values ('20241228204245_tables.sql');
-- INSERT INTO public.zmigrations (migration) values ('20241228204320_triggerfunctions.sql');
-- INSERT INTO public.zmigrations (migration) values ('20241228204347_triggers.sql');
-- INSERT INTO public.zmigrations (migration) values ('20241228204410_policyfunctions.sql');
-- INSERT INTO public.zmigrations (migration) values ('20241228204434_policies.sql');
-- INSERT INTO public.zmigrations (migration) values ('20241228204544_records.sql');
-- INSERT INTO public.zmigrations (migration) values ('20241228204608_policystorage.sql');
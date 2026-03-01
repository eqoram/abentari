-- -- admin
-- SET LOCAL session_replication_role = replica;
-- INSERT INTO public.xusers (id, profile_id, invite_email, invite_secret, invite_open, is_active, is_public, is_unauthenticated, skip_puser, is_superuser, created_by)
-- VALUES ('4ba98607-d109-449c-9773-250c592e4069'::uuid, (SELECT id FROM public.profiles WHERE api_name = 'admin'), '{{admincontactemail}}', '{{gen_random_uuid()}}' , true, true, false, false, true, true, '11111111-1111-1111-1111-111111111111');
-- INSERT INTO public.c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413 (name, email, user_id, xuser_id, owner_id, created_by)
-- VALUES ('ADMIN', '{{admincontactemail}}', null, '4ba98607-d109-449c-9773-250c592e4069', '4ba98607-d109-449c-9773-250c592e4069', '11111111-1111-1111-1111-111111111111');
-- SET LOCAL session_replication_role = DEFAULT;

-- BEGIN;
-- --https://github.com/orgs/supabase/discussions/5043#discussioncomment-8071683
-- CREATE OR REPLACE FUNCTION public.create_user(
--     email text,
--     password text,
--     insecret text
-- ) RETURNS uuid AS $$
-- declare
--     user_id uuid;
--     encrypted_pw text;
-- BEGIN
--     user_id := gen_random_uuid();
--     encrypted_pw := extensions.crypt(password, extensions.gen_salt('bf'));

--     INSERT INTO auth.users
--     (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token)
--     VALUES
--         ('00000000-0000-0000-0000-000000000000', user_id, 'authenticated', 'authenticated', email, encrypted_pw, '2023-05-03 19:41:43.585805+00', '2023-04-22 13:10:03.275387+00', '2023-04-22 13:10:31.458239+00', '{"provider":"email","providers":["email"]}', format('{"inviteprofile":"none","invitesecret":"%s"}', insecret)::jsonb, '2023-05-03 19:41:43.580424+00', '2023-05-03 19:41:43.585948+00', '', '', '', '');

--     INSERT INTO auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
--     VALUES
--         (gen_random_uuid(), user_id, format('{"sub":"%s","email":"%s"}', user_id::text, email)::jsonb, 'email', '2023-05-03 19:41:43.582456+00', '2023-05-03 19:41:43.582497+00', '2023-05-03 19:41:43.582497+00');

--     RETURN user_id;
-- END;
-- $$ LANGUAGE plpgsql;
-- COMMIT;

-- BEGIN;
-- do $$
-- begin
--   perform public.create_user('admin@abentari.invalid', (SELECT invite_secret from public.xusers where invite_email = 'admin@abentari.invalid'), (SELECT invite_secret from public.xusers where invite_email = 'admin@abentari.invalid'));
-- end$$;
-- COMMIT;

-- testuser_admin
INSERT INTO public.profiles (id, name, api_name, is_active, is_public, is_unauthenticated, is_standard, created_by)
VALUES ('e8554b6f-0b3d-4cd6-9c1c-aedbb2358372'::uuid, 'pw_admin', 'c_pwadmin__e8554b6f_0b3d_4cd6_9c1c_aedbb2358372', true, false, false, false, '11111111-1111-1111-1111-111111111111');

INSERT INTO public.permissions (id, permission, profile_id, is_active, created_by)
VALUES ('f59c9f7d-03cd-4645-839d-860b3623dfe0'::uuid, 'setup', (SELECT id FROM public.profiles WHERE api_name = 'c_pwadmin__e8554b6f_0b3d_4cd6_9c1c_aedbb2358372'), true, '11111111-1111-1111-1111-111111111111');

SET LOCAL session_replication_role = replica;
INSERT INTO public.xusers (id, profile_id, invite_email, invite_secret, invite_open, is_active, is_public, is_unauthenticated, skip_puser, is_superuser, created_by)
VALUES ('fca33e69-75a4-459e-b927-2ac18900fe12'::uuid, (SELECT id FROM public.profiles WHERE api_name = 'c_pwadmin__e8554b6f_0b3d_4cd6_9c1c_aedbb2358372'), 'pw_admin@abentari.invalid', gen_random_uuid(), true, true, false, false, true, false, '11111111-1111-1111-1111-111111111111');
SET LOCAL session_replication_role = DEFAULT;

BEGIN;
--https://github.com/orgs/supabase/discussions/5043#discussioncomment-8071683
CREATE OR REPLACE FUNCTION public.create_user(
    email text,
    password text,
    insecret text
) RETURNS uuid AS $$
declare
    user_id uuid;
    encrypted_pw text;
BEGIN
    user_id := gen_random_uuid();
    encrypted_pw := extensions.crypt(password, extensions.gen_salt('bf'));

    INSERT INTO auth.users
    (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token)
    VALUES
        ('00000000-0000-0000-0000-000000000000', user_id, 'authenticated', 'authenticated', email, encrypted_pw, '2023-05-03 19:41:43.585805+00', '2023-04-22 13:10:03.275387+00', '2023-04-22 13:10:31.458239+00', '{"provider":"email","providers":["email"]}', format('{"inviteprofile":"none","invitesecret":"%s"}', insecret)::jsonb, '2023-05-03 19:41:43.580424+00', '2023-05-03 19:41:43.585948+00', '', '', '', '');

    INSERT INTO auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
    VALUES
        (gen_random_uuid(), user_id, format('{"sub":"%s","email":"%s"}', user_id::text, email)::jsonb, 'email', '2023-05-03 19:41:43.582456+00', '2023-05-03 19:41:43.582497+00', '2023-05-03 19:41:43.582497+00');

    RETURN user_id;
END;
$$ LANGUAGE plpgsql;
COMMIT;

BEGIN;
do $$
begin
  perform public.create_user('pw_admin@abentari.invalid', (SELECT invite_secret from public.xusers where invite_email = 'pw_admin@abentari.invalid'), (SELECT invite_secret from public.xusers where invite_email = 'pw_admin@abentari.invalid'));
end$$;
COMMIT;


-- testuser_user
INSERT INTO public.profiles (id, name, api_name, is_active, is_public, is_unauthenticated, is_standard, created_by)
VALUES ('26c7320f-49af-4cb2-a1a5-197669492ed8'::uuid, 'pw_user', 'c_pwuser__26c7320f_49af_4cb2_a1a5_197669492ed8', true, false, false, false, '11111111-1111-1111-1111-111111111111');

SET LOCAL session_replication_role = replica;
INSERT INTO public.xusers (id, profile_id, invite_email, invite_secret, invite_open, is_active, is_public, is_unauthenticated, skip_puser, is_superuser, created_by)
VALUES ('d0565959-730e-4ac3-a278-d2e88b66f026'::uuid, (SELECT id FROM public.profiles WHERE api_name = 'c_pwuser__26c7320f_49af_4cb2_a1a5_197669492ed8'), 'pw_user@abentari.invalid', gen_random_uuid(), true, true, false, false, true, false, '11111111-1111-1111-1111-111111111111');
SET LOCAL session_replication_role = DEFAULT;

BEGIN;
do $$
begin
  perform public.create_user('pw_user@abentari.invalid', (SELECT invite_secret from public.xusers where invite_email = 'pw_user@abentari.invalid'), (SELECT invite_secret from public.xusers where invite_email = 'pw_user@abentari.invalid'));
end$$;
COMMIT;


-- drop create user function
DROP FUNCTION public.create_user;

drop policy if exists "storagedelete" on storage.objects;
create policy "storagedelete"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'storage1'
  and (storage.foldername(name))[1] = 'objects'
  and policyfunction_checkallpermission((select auth.uid()), ((select auth.jwt()) ->> 'email'), 'setup')
);
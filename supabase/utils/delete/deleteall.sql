-- 1. CLEAR AUTH USERS
-- This will delete all users. Because of foreign key constraints (ON DELETE CASCADE), 
-- it usually wipes related profile data in your public tables too.
TRUNCATE auth.users CASCADE;

-- 2. WIPE PUBLIC SCHEMA
-- This loop drops every table, view, and function you created in the public schema.
DO $$ 
DECLARE
    r RECORD;
BEGIN
    -- Drop Views
    FOR r IN (SELECT viewname FROM pg_views WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP VIEW IF EXISTS public.' || quote_ident(r.viewname) || ' CASCADE';
    END LOOP;

    -- Drop Tables
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP TABLE IF EXISTS public.' || quote_ident(r.tablename) || ' CASCADE';
    END LOOP;

    -- Drop Functions
    FOR r IN (SELECT proname, oid FROM pg_proc WHERE pronamespace = 'public'::regnamespace) LOOP
        EXECUTE 'DROP FUNCTION IF EXISTS public.' || quote_ident(r.proname) || ' CASCADE';
    END LOOP;

    -- Drop Types (Enums)
    FOR r IN (SELECT t.typname FROM pg_type t JOIN pg_namespace n ON n.oid = t.typnamespace 
              WHERE n.nspname = 'public' AND t.typtype = 'e') LOOP
        EXECUTE 'DROP TYPE IF EXISTS public.' || quote_ident(r.typname) || ' CASCADE';
    END LOOP;
END $$;
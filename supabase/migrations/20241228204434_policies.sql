DROP POLICY IF EXISTS "policy_xusers_select" ON public.xusers;
CREATE POLICY "policy_xusers_select" ON public.xusers FOR SELECT TO authenticated
USING (
    ((select auth.uid()) = user_id) 
    OR 
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('xusers.setup.select', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

DROP POLICY IF EXISTS "policy_xusers_insert" ON public.xusers;
CREATE POLICY "policy_xusers_insert" ON public.xusers FOR INSERT TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('xusers.setup.insert', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

DROP POLICY IF EXISTS "policy_xusers_update" ON public.xusers;
CREATE POLICY "policy_xusers_update" ON public.xusers FOR UPDATE TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('xusers.setup.update', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('xusers.setup.update', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

DROP POLICY IF EXISTS "policy_xusers_delete" ON public.xusers;
CREATE POLICY "policy_xusers_delete" ON public.xusers FOR DELETE TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('xusers.setup.delete', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

DROP POLICY IF EXISTS "policy_i_xusers_select" ON public.i_xusers;
CREATE POLICY "policy_i_xusers_select" ON public.i_xusers FOR SELECT TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('i_xusers.setup.select', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

-- HERE
drop policy if exists "policy_permissionoptions_select" on public.permissionoptions;
create policy "policy_permissionoptions_select"
on public.permissionoptions for select
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('permissionoptions.setup.select', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_permissionoptions_insert" on public.permissionoptions;
create policy "policy_permissionoptions_insert"
on public.permissionoptions for insert
to authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('permissionoptions.setup.insert', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_permissionoptions_update" on public.permissionoptions;
create policy "policy_permissionoptions_update"
on public.permissionoptions for update
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('permissionoptions.setup.update', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('permissionoptions.setup.update', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_permissionoptions_delete" on public.permissionoptions;
create policy "policy_permissionoptions_delete"
on public.permissionoptions for delete
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('permissionoptions.setup.delete', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

-- history
drop policy if exists "policy_i_fields_select" on public.i_fields;
create policy "policy_i_fields_select"
on public.i_fields for select
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('i_fields.setup.select', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_i_objects_select" on public.i_objects;
create policy "policy_i_objects_select"
on public.i_objects for select
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('i_objects.setup.select', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_i_permissionoptions_select" on public.i_permissionoptions;
create policy "policy_i_permissionoptions_select"
on public.i_permissionoptions for select
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('i_permissionoptions.setup.select', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_i_permissions_select" on public.i_permissions;
create policy "policy_i_permissions_select"
on public.i_permissions for select
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('i_permissions.setup.select', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_i_profiles_select" on public.i_profiles;
create policy "policy_i_profiles_select"
on public.i_profiles for select
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('i_profiles.setup.select', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

-- keepalive
drop policy if exists "policy_keepalive_select" on public.keepalive;
create policy "policy_keepalive_select"
on public.keepalive for select
to authenticated
using (
    true = true
);

drop policy if exists "policy_keepalive_update" on public.keepalive;
create policy "policy_keepalive_update"
on public.keepalive for update
to authenticated
using (
    true = true
)
WITH CHECK (
    true = true
);

drop policy if exists "policy_keepalive_unauth_select" on public.keepalive;
create policy "policy_keepalive_unauth_select"
on public.keepalive for select
to anon
using (
    true = true
);

drop policy if exists "policy_keepalive_unauth_update" on public.keepalive;
create policy "policy_keepalive_unauth_update"
on public.keepalive for update
to anon
using (
    true = true
)
WITH CHECK (
    true = true
);

-- settings
drop policy if exists "policy_settings_select" on public.settings;
create policy "policy_settings_select"
on public.settings for select
to authenticated
using (
    true = true
);

drop policy if exists "policy_settings_insert" on public.settings;
create policy "policy_settings_insert"
on public.settings for insert
to authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('settings.setup.insert', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_settings_update" on public.settings;
create policy "policy_settings_update"
on public.settings for update
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('settings.setup.update', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('settings.setup.update', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_settings_delete" on public.settings;
create policy "policy_settings_delete"
on public.settings for delete
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('settings.setup.delete', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_settings_unauth_select" on public.settings;
create policy "policy_settings_unauth_select"
on public.settings for select
to anon
using (
    true = true
);

drop policy if exists "policy_i_settings_select" on public.i_settings;
create policy "policy_i_settings_select"
on public.i_settings for select
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('i_settings.setup.select', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

-- csql
drop policy if exists "policy_csql_select" on public.csql;
create policy "policy_csql_select"
on public.csql for select
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('csql.setup.select', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_csql_insert" on public.csql;
create policy "policy_csql_insert"
on public.csql for insert
to authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('csql.setup.insert', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_csql_update" on public.csql;
create policy "policy_csql_update"
on public.csql for update
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('csql.setup.update', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('csql.setup.update', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_csql_delete" on public.csql;
create policy "policy_csql_delete"
on public.csql for delete
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('csql.setup.delete', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_i_csql_select" on public.i_csql;
create policy "policy_i_csql_select"
on public.i_csql for select
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('i_csql.setup.select', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

-- pages
drop policy if exists "policy_pages_select" on public.pages;
create policy "policy_pages_select"
on public.pages for select
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('pages.setup.select', CONCAT('page.', api_name)) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true )
            OR ctx.has_owner_perm = true)
    )
);

drop policy if exists "policy_pages_insert" on public.pages;
create policy "policy_pages_insert"
on public.pages for insert
to authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('pages.setup.insert', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_pages_update" on public.pages;
create policy "policy_pages_update"
on public.pages for update
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('pages.setup.update', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('pages.setup.update', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_pages_delete" on public.pages;
create policy "policy_pages_delete"
on public.pages for delete
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('pages.setup.delete', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_i_pages_select" on public.i_pages;
create policy "policy_i_pages_select"
on public.i_pages for select
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('i_pages.setup.select', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_pages_unauth_select" on public.pages;
create policy "policy_pages_unauth_select"
on public.pages for select
to anon
using (
    policyfunction_unauth_pageselect(api_name)
);

-- cpermissions
drop policy if exists "policy_cpermissions_select" on public.cpermissions;
create policy "policy_cpermissions_select"
on public.cpermissions for select
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('cpermissions.setup.select', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_cpermissions_insert" on public.cpermissions;
create policy "policy_cpermissions_insert"
on public.cpermissions for insert
to authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('cpermissions.setup.insert', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_cpermissions_update" on public.cpermissions;
create policy "policy_cpermissions_update"
on public.cpermissions for update
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('cpermissions.setup.update', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('cpermissions.setup.update', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_cpermissions_delete" on public.cpermissions;
create policy "policy_cpermissions_delete"
on public.cpermissions for delete
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('cpermissions.setup.delete', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_i_cpermissions_select" on public.i_cpermissions;
create policy "policy_i_cpermissions_select"
on public.i_cpermissions for select
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('i_cpermissions.setup.select', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

-- actions
drop policy if exists "policy_actions_select" on public.actions;
create policy "policy_actions_select"
on public.actions for select
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('actions.setup.select', CONCAT('action.', api_name)) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true )
            OR ctx.has_owner_perm = true)
    )
);

drop policy if exists "policy_actions_insert" on public.actions;
create policy "policy_actions_insert"
on public.actions for insert
to authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('actions.setup.insert', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_actions_update" on public.actions;
create policy "policy_actions_update"
on public.actions for update
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('actions.setup.update', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('actions.setup.update', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_actions_delete" on public.actions;
create policy "policy_actions_delete"
on public.actions for delete
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('actions.setup.delete', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_i_actions_select" on public.i_actions;
create policy "policy_i_actions_select"
on public.i_actions for select
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('i_actions.setup.select', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_actions_unauth_select" on public.actions;
create policy "policy_actions_unauth_select"
on public.actions for select
to anon
using (
    policyfunction_unauth_actionselect(api_name)
);

-- appoptions
drop policy if exists "policy_appoptions_select" on public.appoptions;
create policy "policy_appoptions_select"
on public.appoptions for select
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('appoptions.setup.select', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_appoptions_insert" on public.appoptions;
create policy "policy_appoptions_insert"
on public.appoptions for insert
to authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('appoptions.setup.insert', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_appoptions_update" on public.appoptions;
create policy "policy_appoptions_update"
on public.appoptions for update
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('appoptions.setup.update', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('appoptions.setup.update', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_appoptions_delete" on public.appoptions;
create policy "policy_appoptions_delete"
on public.appoptions for delete
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('appoptions.setup.delete', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_i_appoptions_select" on public.i_appoptions;
create policy "policy_i_appoptions_select"
on public.i_appoptions for select
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('i_appoptions.setup.select', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

-- apps
drop policy if exists "policy_apps_select" on public.apps;
create policy "policy_apps_select"
on public.apps for select
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('apps.setup.select', CONCAT('app.', api_name)) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true )
            OR ctx.has_owner_perm = true)
    )
);

drop policy if exists "policy_apps_insert" on public.apps;
create policy "policy_apps_insert"
on public.apps for insert
to authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('apps.setup.insert', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_apps_update" on public.apps;
create policy "policy_apps_update"
on public.apps for update
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('apps.setup.update', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('apps.setup.update', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_apps_delete" on public.apps;
create policy "policy_apps_delete"
on public.apps for delete
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('apps.setup.delete', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_i_apps_select" on public.i_apps;
create policy "policy_i_apps_select"
on public.i_apps for select
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('i_apps.setup.select', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_apps_unauth_select" on public.apps;
create policy "policy_apps_unauth_select"
on public.apps for select
to anon
using (
    policyfunction_unauth_appselect(api_name)
);

drop policy if exists "policy_i_run_select" on public.i_run;
create policy "policy_i_run_select"
on public.i_run for select
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('i_run.setup.select', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

DROP POLICY IF EXISTS "policy_objecthistories_select" ON public.objecthistories;
CREATE POLICY "policy_objecthistories_select"
ON public.objecthistories FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 
        FROM public.get_authenticated_context('objects.setup.select', null) AS ctx
        WHERE ctx.mfa_passed 
          AND (
            public.policyfunction_objectselect((select auth.uid()), null, 'setup', api_name)
            OR 
            (ctx.has_setuplimited_perm AND ctx.has_all_perm)
          )
    )
);
-- drop policy if exists "policy_objecthistories_select" on public.objecthistories;
-- create policy "policy_objecthistories_select"
-- on public.objecthistories for select
-- to authenticated
-- using (
--     can_access_with_optional_mfa((select auth.uid()), (select auth.jwt() ->> 'aal')) AND (
--     policyfunction_objectselect((select auth.uid()), ((select auth.jwt()) ->> 'email'), 'setup', api_name)
--     OR ( policyfunction_checkallpermission((select auth.uid()), ((select auth.jwt()) ->> 'email'), 'setuplimited')
--     AND policyfunction_checkallpermission((select auth.uid()), ((select auth.jwt()) ->> 'email'), 'objects.setup.select') ) )
-- );

drop policy if exists "policy_i_objecthistories_select" on public.i_objecthistories;
create policy "policy_i_objecthistories_select"
on public.i_objecthistories for select
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('i_objecthistories.setup.select', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_objecthistories_unauth_select" on public.objecthistories;
create policy "policy_objecthistories_unauth_select"
on public.objecthistories for select
to anon
using (
    policyfunction_unauth_objectselect(api_name)
);

drop policy if exists "policy_i_retrieve_select" on public.i_retrieve;
create policy "policy_i_retrieve_select"
on public.i_retrieve for select
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('i_retrieve.setup.select', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_i_retrieve_insert" on public.i_retrieve;
create policy "policy_i_retrieve_insert"
on public.i_retrieve for insert
to authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('retrieve.setup', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_i_deploy_select" on public.i_deploy;
create policy "policy_i_deploy_select"
on public.i_deploy for select
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('i_deploy.setup.select', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_i_deploy_insert" on public.i_deploy;
create policy "policy_i_deploy_insert"
on public.i_deploy for insert
to authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('deploy.setup', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_testtable_select" on public.testtable;
create policy "policy_testtable_select"
on public.testtable for select
to authenticated
using (
    false
);

-- drop policy if exists "policy_zmigrations_select" on public.zmigrations;
-- create policy "policy_zmigrations_select"
-- on public.zmigrations for select
-- to authenticated
-- using (
--     false
-- );

-- drop policy if exists "policy_zconfig_select" on public.zconfig;
-- create policy "policy_zconfig_select"
-- on public.zconfig for select
-- to authenticated
-- using (
--     false
-- );

-- HERE3
drop policy if exists "policy_objects_select" on public.objects;
create policy "policy_objects_select"
on public.objects for select
to authenticated
using (
    EXISTS (
        SELECT 1 
        FROM public.get_authenticated_context('objects.setup.select', null) AS ctx
        WHERE ctx.mfa_passed 
          AND (
            public.policyfunction_objectselect((select auth.uid()), null, 'setup', api_name)
            OR 
            (ctx.has_setuplimited_perm AND ctx.has_all_perm)
          )
    )
);

drop policy if exists "policy_objects_insert" on public.objects;
create policy "policy_objects_insert"
on public.objects for insert
to authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('objects.setup.insert', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_objects_update" on public.objects;
create policy "policy_objects_update"
on public.objects for update
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('objects.setup.update', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('objects.setup.update', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_objects_delete" on public.objects;
create policy "policy_objects_delete"
on public.objects for delete
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('objects.setup.delete', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_objects_unauth_select" on public.objects;
create policy "policy_objects_unauth_select"
on public.objects for select
to anon
using (
    policyfunction_unauth_objectselect(api_name)
);

drop policy if exists "policy_profiles_select" on public.profiles;
create policy "policy_profiles_select"
on public.profiles for select
to authenticated
using (
    (id = (SELECT profile_id FROM public.xusers WHERE user_id = (select auth.uid()) LIMIT 1 ) ) 
    OR 
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('profiles.setup.select', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_profiles_insert" on public.profiles;
create policy "policy_profiles_insert"
on public.profiles for insert
to authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('profiles.setup.insert', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_profiles_update" on public.profiles;
create policy "policy_profiles_update"
on public.profiles for update
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('profiles.setup.update', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('profiles.setup.update', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_profiles_delete" on public.profiles;
create policy "policy_profiles_delete"
on public.profiles for delete
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('profiles.setup.delete', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_profiles_anon_select" on public.profiles;
create policy "policy_profiles_anon_select"
on public.profiles for select
to anon
using (
    is_active = true AND (is_public = true OR is_unauthenticated = true)
);

drop policy if exists "policy_permissions_select" on public.permissions;
create policy "policy_permissions_select"
on public.permissions for select
to authenticated
using (
    EXISTS (
        SELECT 1 
        FROM public.get_authenticated_context('permissions.setup.select', null) AS ctx
        WHERE ctx.mfa_passed 
          AND (
            public.policyfunction_permissionselect((select auth.uid()), permission, id)
            OR 
            (ctx.has_setuplimited_perm AND ctx.has_all_perm)
          )
    )
);

drop policy if exists "policy_permissions_insert" on public.permissions;
create policy "policy_permissions_insert"
on public.permissions for insert
to authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('permissions.setup.insert', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_permissions_update" on public.permissions;
create policy "policy_permissions_update"
on public.permissions for update
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('permissions.setup.update', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('permissions.setup.update', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_permissions_delete" on public.permissions;
create policy "policy_permissions_delete"
on public.permissions for delete
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('permissions.setup.delete', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_unauth_permissions_select" on public.permissions;
create policy "policy_unauth_permissions_select"
on public.permissions for select
to anon
using (
    policyfunction_unauth_permissionselect(permission, id)
);

drop policy if exists "policy_fields_select" on public.fields;
create policy "policy_fields_select"
on public.fields for select
to authenticated
using (
    EXISTS (
        SELECT 1 
        FROM public.get_authenticated_context('fields.setup.select', null) AS ctx
        WHERE ctx.mfa_passed 
          AND (
            public.policyfunction_fieldselect((select auth.uid()), ((select auth.jwt()) ->> 'email'), 'setup', parent_id)
            OR 
            (ctx.has_setuplimited_perm AND ctx.has_all_perm)
          )
    )
);

drop policy if exists "policy_fields_insert" on public.fields;
create policy "policy_fields_insert"
on public.fields for insert
to authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('fields.setup.insert', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_fields_update" on public.fields;
create policy "policy_fields_update"
on public.fields for update
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('fields.setup.update', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('fields.setup.update', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_fields_delete" on public.fields;
create policy "policy_fields_delete"
on public.fields for delete
to authenticated
using (
    EXISTS (
        SELECT 1 FROM public.get_authenticated_context('fields.setup.delete', NULL) ctx
        WHERE ctx.mfa_passed = true AND
            (ctx.has_setup_perm = true
            OR (ctx.has_setuplimited_perm = true AND ctx.has_all_perm = true ))
    )
);

drop policy if exists "policy_fields_unauth_select" on public.fields;
create policy "policy_fields_unauth_select"
on public.fields for select
to anon
using (
    policyfunction_unauth_fieldselect(parent_id)
);
-- HERE4
-- HERE2
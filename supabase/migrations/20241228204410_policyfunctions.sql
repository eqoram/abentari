CREATE OR REPLACE FUNCTION public.get_authenticated_context(
    p_perm_all text, 
    p_perm_owner text
)
RETURNS TABLE (
    mfa_passed boolean,
    has_setup_perm boolean,
    has_setuplimited_perm boolean,
    has_all_perm boolean,
    has_owner_perm boolean,
    xuser_id uuid
) 
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = '' AS $$
    SELECT 
        -- MFA Logic: Access allowed if (MFA not required) OR (MFA required and user is aal2)
        (
            (u.mfa_enabled = false AND p.mfa_enabled = false)
            OR 
            ((auth.jwt() ->> 'aal') = 'aal2')
        ) AS mfa_passed,
        -- Check Permissions
        EXISTS (
            SELECT 1 FROM public.permissions perm 
            WHERE perm.profile_id = p.id 
              AND perm.is_active = true 
              AND perm.permission = 'setup'
        ) AS has_setup_perm,
        EXISTS (
            SELECT 1 FROM public.permissions perm 
            WHERE perm.profile_id = p.id 
              AND perm.is_active = true 
              AND perm.permission = 'setuplimited'
        ) AS has_setuplimited_perm,
        EXISTS (
            SELECT 1 FROM public.permissions perm 
            WHERE perm.profile_id = p.id 
              AND perm.is_active = true 
              AND perm.permission = p_perm_all
        ) AS has_all_perm,
        EXISTS (
            SELECT 1 FROM public.permissions perm 
            WHERE perm.profile_id = p.id 
              AND perm.is_active = true 
              AND perm.permission = p_perm_owner
        ) AS has_owner_perm,
        u.id AS xuser_id
    FROM public.xusers u
    JOIN public.profiles p ON u.profile_id = p.id
    WHERE u.user_id = auth.uid() 
      AND u.is_active = true 
      AND p.is_active = true
    LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.get_unauth_context(pperm_all text, pperm_owner text)
RETURNS TABLE(has_all_perm bool, has_owner_perm bool) 
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = '' AS $$
    SELECT 
        EXISTS (SELECT 1 FROM public.permissions perm WHERE perm.permission = pperm_all AND perm.is_active = true AND perm.profile_id = p.id) AS has_all_perm,
        EXISTS (SELECT 1 FROM public.permissions perm WHERE perm.permission = pperm_owner AND perm.is_active = true AND perm.profile_id = p.id) AS has_owner_perm
    FROM public.profiles p
    JOIN public.xusers u ON u.profile_id = p.id
    WHERE p.is_unauthenticated = true 
      AND p.is_active = true 
      AND u.is_unauthenticated = true 
      AND u.is_active = true
    LIMIT 1;
$$;


CREATE OR REPLACE FUNCTION
public.policyfunction_checkallpermission(puserid uuid, puseremail text, ppermission text)
RETURNS bool set search_path = '' AS $$
    SELECT (EXISTS (
        SELECT 1
        FROM public.permissions
        WHERE (permission = ppermission OR permission = 'setup') AND is_active = true AND profile_id =
        ( SELECT id FROM public.profiles WHERE is_active = true AND id = (SELECT profile_id FROM public.xusers WHERE user_id = puserid AND is_active = true) )
    ));
$$ LANGUAGE sql STABLE SECURITY DEFINER;




CREATE OR REPLACE FUNCTION
public.policyfunction_checkcolumnpermission(puserid uuid, puseremail text, ppermission text, pownerid uuid)
RETURNS bool set search_path = '' AS $$
(
    SELECT((pownerid = (SELECT id FROM public.xusers WHERE user_id = puserid) ))
    AND
    (SELECT (EXISTS (
        SELECT 1
        FROM public.permissions
        WHERE permission = ppermission AND is_active = true AND profile_id =
        ( SELECT id FROM public.profiles WHERE is_active = true AND id = (SELECT profile_id FROM public.xusers WHERE user_id = puserid AND is_active = true) )
    )))
);
$$ LANGUAGE sql STABLE SECURITY DEFINER;


CREATE OR REPLACE FUNCTION public.policyfunction_objectselect(
    puserid uuid, 
    puseremail text, 
    ppermission text, 
    papi_name text
)
RETURNS boolean 
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = '' AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.permissions perm
        INNER JOIN public.profiles p ON perm.profile_id = p.id
        INNER JOIN public.xusers u ON u.profile_id = p.id
        WHERE u.user_id = puserid
          AND u.is_active = true
          AND p.is_active = true
          AND perm.is_active = true
          AND (
              perm.permission LIKE papi_name || '.%' 
              OR perm.permission = 'setup'
          )
    );
$$;




CREATE OR REPLACE FUNCTION
public.policyfunction_fieldselect(puserid uuid, puseremail text, ppermission text, pparent_id uuid)
RETURNS bool set search_path = '' AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.xusers xu
        INNER JOIN public.profiles prof ON xu.profile_id = prof.id
        INNER JOIN public.permissions perm ON prof.id = perm.profile_id
        LEFT JOIN public.objects obj ON obj.id = pparent_id
        WHERE xu.user_id = puserid
          AND xu.is_active = true
          AND prof.is_active = true
          AND perm.is_active = true
          AND (
            perm.permission = 'setup'
            OR (obj.api_name IS NOT NULL AND perm.permission LIKE (obj.api_name || '.%'))
          )
    );
$$ LANGUAGE sql STABLE SECURITY DEFINER;




CREATE OR REPLACE FUNCTION
public.policyfunction_unauth_checkallpermission(ppermission text)
RETURNS bool set search_path = '' AS $$
    SELECT (EXISTS (
        SELECT 1
        FROM public.permissions
        WHERE (permission = ppermission) AND is_active = true AND profile_id =
        ( SELECT id FROM public.profiles WHERE is_unauthenticated = true AND is_active = true AND id = (SELECT profile_id FROM public.xusers WHERE is_unauthenticated = true AND is_active = true) )
    ));
$$ LANGUAGE sql STABLE SECURITY DEFINER;




CREATE OR REPLACE FUNCTION
public.policyfunction_unauth_checkcolumnpermission(ppermission text, pownerid uuid)
RETURNS bool set search_path = '' AS $$
(
    SELECT(('00000000-0000-0000-0000-000000000000' = pownerid))
    AND
    (SELECT (EXISTS (
        SELECT 1
        FROM public.permissions
        WHERE permission = ppermission AND is_active = true AND profile_id =
        ( SELECT id FROM public.profiles WHERE is_unauthenticated = true AND is_active = true AND id = (SELECT profile_id FROM public.xusers WHERE is_unauthenticated = true AND is_active = true) )
    )))
);
$$ LANGUAGE sql STABLE SECURITY DEFINER;


CREATE OR REPLACE FUNCTION public.policyfunction_unauth_objectselect(papi_name text)
RETURNS boolean 
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = '' AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.permissions perm
        INNER JOIN public.profiles p ON perm.profile_id = p.id
        INNER JOIN public.xusers u ON u.profile_id = p.id
        WHERE perm.permission LIKE papi_name || '.%'
          AND perm.is_active = true
          AND p.is_active = true
          AND p.is_unauthenticated = true
          AND u.is_active = true
          AND u.is_unauthenticated = true
    );
$$;



CREATE OR REPLACE FUNCTION public.policyfunction_unauth_fieldselect(
    pparent_id uuid
)
RETURNS bool 
STABLE -- Essential for RLS performance
SET search_path = '' 
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.objects obj
        INNER JOIN public.permissions perm ON perm.permission LIKE (obj.api_name || '.%')
        INNER JOIN public.profiles prof ON perm.profile_id = prof.id
        INNER JOIN public.xusers xu ON prof.id = xu.profile_id
        WHERE obj.id = pparent_id
          AND perm.is_active = true
          AND prof.is_active = true
          AND prof.is_unauthenticated = true
          AND xu.is_active = true
          AND xu.is_unauthenticated = true
    );
$$ LANGUAGE sql SECURITY DEFINER;


CREATE OR REPLACE FUNCTION public.policyfunction_permissionselect(
    puserid uuid, 
    ppermission text, 
    pid uuid
)
RETURNS bool 
SET search_path = '' 
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.xusers xu
        JOIN public.profiles prof ON xu.profile_id = prof.id
        JOIN public.permissions perm ON prof.id = perm.profile_id
        WHERE xu.user_id = puserid
          AND xu.is_active = true
          AND prof.is_active = true
          AND perm.is_active = true
          AND (
            (perm.id = pid AND perm.permission = ppermission)
            OR 
            perm.permission = 'setup'
          )
    );
$$ LANGUAGE sql STABLE SECURITY DEFINER;


CREATE OR REPLACE FUNCTION public.policyfunction_unauth_permissionselect(
    ppermission text, 
    pid uuid
)
RETURNS bool 
SET search_path = '' 
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.permissions perm
        JOIN public.profiles prof ON perm.profile_id = prof.id
        JOIN public.xusers xu ON prof.id = xu.profile_id
        WHERE xu.is_unauthenticated = true 
          AND xu.is_active = true
          AND prof.is_unauthenticated = true 
          AND prof.is_active = true
          AND perm.is_active = true
          AND (
            (perm.id = pid AND perm.permission = ppermission) 
            OR perm.permission = 'setup'
          )
    );
$$ LANGUAGE sql STABLE SECURITY DEFINER;


CREATE OR REPLACE FUNCTION public.can_access_with_optional_mfa(puserid uuid, pauthlevel text)
RETURNS boolean set search_path = ''
LANGUAGE sql STABLE
AS $$
  SELECT
    (
      -- Case 1: Both mfa_enabled are false
      EXISTS (
        SELECT 1 FROM public.xusers u
        WHERE u.user_id = puserid
          AND u.mfa_enabled = false
          AND (
            SELECT p.mfa_enabled FROM public.profiles p
            WHERE p.id = u.profile_id
          ) = false
      )
    )
    OR
    (
      -- Case 2: MFA is enabled on either and user has aal2
      (pauthlevel = 'aal2')
      AND (
        EXISTS (
          SELECT 1 FROM public.xusers u
          WHERE u.user_id = puserid
            AND u.mfa_enabled = true
        )
        OR EXISTS (
          SELECT 1 FROM public.profiles p
          WHERE p.id = (
            SELECT u.profile_id FROM public.xusers u
            WHERE u.user_id = puserid
          )
          AND mfa_enabled = true
        )
      )
    );
$$;


CREATE OR REPLACE FUNCTION public.policyfunction_unauth_pageselect(papi_name text)
RETURNS boolean 
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = '' AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.permissions perm
        INNER JOIN public.profiles p ON perm.profile_id = p.id
        INNER JOIN public.xusers u ON u.profile_id = p.id
        WHERE perm.permission = 'page.' || papi_name
          AND perm.is_active = true
          AND p.is_active = true
          AND p.is_unauthenticated = true
          AND u.is_active = true
          AND u.is_unauthenticated = true
    );
$$;


CREATE OR REPLACE FUNCTION public.policyfunction_unauth_actionselect(papi_name text)
RETURNS boolean 
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = '' AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.permissions perm
        INNER JOIN public.profiles p ON perm.profile_id = p.id
        INNER JOIN public.xusers u ON u.profile_id = p.id
        WHERE perm.permission = 'action.' || papi_name
          AND perm.is_active = true
          AND p.is_active = true
          AND p.is_unauthenticated = true
          AND u.is_active = true
          AND u.is_unauthenticated = true
    );
$$;

CREATE OR REPLACE FUNCTION public.policyfunction_unauth_appselect(papi_name text)
RETURNS boolean 
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = '' AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.permissions perm
        INNER JOIN public.profiles p ON perm.profile_id = p.id
        INNER JOIN public.xusers u ON u.profile_id = p.id
        WHERE perm.permission = 'app.' || papi_name
          AND perm.is_active = true
          AND p.is_active = true
          AND p.is_unauthenticated = true
          AND u.is_active = true
          AND u.is_unauthenticated = true
    );
$$;
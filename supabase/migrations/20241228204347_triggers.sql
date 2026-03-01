DROP TRIGGER IF EXISTS trigger_fields_ua ON public.fields;
CREATE TRIGGER
  trigger_fields_ua
  before UPDATE ON public.fields
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_beforeupdate_checkidandcreatedat();




DROP TRIGGER IF EXISTS trigger_fields_bi ON public.fields;
CREATE TRIGGER
  trigger_fields_bi
  before INSERT ON public.fields
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_beforeinsert_nooverwrite();



DROP TRIGGER IF EXISTS trigger_objects_ua ON public.objects;
CREATE TRIGGER
  trigger_objects_ua
  before UPDATE ON public.objects
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_beforeupdate_checkidandcreatedat();




DROP TRIGGER IF EXISTS trigger_objects_bi ON public.objects;
CREATE TRIGGER
  trigger_objects_bi
  before INSERT ON public.objects
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_beforeinsert_nooverwrite();




DROP TRIGGER IF EXISTS trigger_permissionoptions_ua ON public.permissionoptions;
CREATE TRIGGER
  trigger_permissionoptions_ua
  before UPDATE ON public.permissionoptions
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_beforeupdate_checkidandcreatedat();




DROP TRIGGER IF EXISTS trigger_permissionoptions_bi ON public.permissionoptions;
CREATE TRIGGER
  trigger_permissionoptions_bi
  before INSERT ON public.permissionoptions
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_beforeinsert_nooverwrite();




DROP TRIGGER IF EXISTS trigger_permissions_ua ON public.permissions;
CREATE TRIGGER
  trigger_permissions_ua
  before UPDATE ON public.permissions
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_beforeupdate_checkidandcreatedat();




DROP TRIGGER IF EXISTS trigger_permissions_bi ON public.permissions;
CREATE TRIGGER
  trigger_permissions_bi
  before INSERT ON public.permissions
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_beforeinsert_nooverwrite();




DROP TRIGGER IF EXISTS trigger_profiles_ua ON public.profiles;
CREATE TRIGGER
  trigger_profiles_ua
  before UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_beforeupdate_checkidandcreatedat();




DROP TRIGGER IF EXISTS trigger_profiles_bi ON public.profiles;
CREATE TRIGGER
  trigger_profiles_bi
  before INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_beforeinsert_nooverwrite();


DROP TRIGGER IF EXISTS trigger_profiles_insert_after ON public.profiles;
CREATE TRIGGER
  trigger_profiles_insert_after
  after INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_profiles_insert_after();


DROP TRIGGER IF EXISTS trigger_xusers_ua ON public.xusers;
CREATE TRIGGER
  trigger_xusers_ua
  before UPDATE ON public.xusers
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_beforeupdate_checkidandcreatedat();




DROP TRIGGER IF EXISTS trigger_xusers_bi ON public.xusers;
CREATE TRIGGER
  trigger_xusers_bi
  before INSERT ON public.xusers
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_beforeinsert_nooverwrite();




DROP TRIGGER IF EXISTS trigger_auth_insert_before ON auth.users;
CREATE TRIGGER
  trigger_auth_insert_before
  before INSERT ON auth.users
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_auth_insert_before();
    
    
    
    
DROP TRIGGER IF EXISTS trigger_auth_insert_after ON auth.users;
CREATE TRIGGER
  trigger_auth_insert_after
  after INSERT ON auth.users
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_auth_insert_after();
    



DROP TRIGGER IF EXISTS trigger_objects_insert_after ON public.objects;
CREATE TRIGGER
  trigger_objects_insert_after
  after INSERT ON public.objects
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_objects_insert_after();
    



DROP TRIGGER IF EXISTS trigger_objects_update_after ON public.objects;
CREATE TRIGGER
  trigger_objects_update_after
  after UPDATE ON public.objects
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_objects_update_after();




DROP TRIGGER IF EXISTS trigger_objects_delete_after ON public.objects;
CREATE TRIGGER
  trigger_objects_delete_after
  after DELETE ON public.objects
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_objects_delete_after();




-- xusers
-- insertafter 
DROP TRIGGER IF EXISTS trigger_xusers_insert_after ON public.xusers;
CREATE TRIGGER
  trigger_xusers_insert_after
  after INSERT ON public.xusers
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_xusers_insert_after();




-- updateafter
DROP TRIGGER IF EXISTS trigger_xusers_update_after ON public.xusers;
CREATE TRIGGER
  trigger_xusers_update_after
  after UPDATE ON public.xusers
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_xusers_update_after();




-- deleteafter
DROP TRIGGER IF EXISTS trigger_xusers_delete_after ON public.xusers;
CREATE TRIGGER
  trigger_xusers_delete_after
  after DELETE ON public.xusers
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_xusers_delete_after();




--fields
DROP TRIGGER IF EXISTS trigger_fields_insert_after ON public.fields;
CREATE TRIGGER
  trigger_fields_insert_after
  after INSERT ON public.fields
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_fields_insert_after();




DROP TRIGGER IF EXISTS trigger_fields_update_after ON public.fields;
CREATE TRIGGER
  trigger_fields_update_after
  after UPDATE ON public.fields
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_fields_update_after();
    
    
    
    
DROP TRIGGER IF EXISTS trigger_fields_delete_after ON public.fields;
CREATE TRIGGER
  trigger_fields_delete_after
  after DELETE ON public.fields
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_fields_delete_after();




DROP TRIGGER IF EXISTS trigger_profiles_update_after ON public.profiles;
CREATE TRIGGER
  trigger_profiles_update_after
  after UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_profiles_update_after();




DROP TRIGGER IF EXISTS trigger_profiles_delete_after ON public.profiles;
CREATE TRIGGER
  trigger_profiles_delete_after
  after DELETE ON public.profiles
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_profiles_delete_after();




-- permissions
DROP TRIGGER IF EXISTS trigger_permissions_insert_after ON public.permissions;
CREATE TRIGGER
  trigger_permissions_insert_after
  after INSERT ON public.permissions
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_permissions_insert_after();

DROP TRIGGER IF EXISTS trigger_permissions_update_after ON public.permissions;
CREATE TRIGGER
  trigger_permissions_update_after
  after UPDATE ON public.permissions
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_permissions_update_after();

DROP TRIGGER IF EXISTS trigger_permissions_delete_after ON public.permissions;
CREATE TRIGGER
  trigger_permissions_delete_after
  after DELETE ON public.permissions
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_permissions_delete_after();




-- permissionoptions
-- updateafter
DROP TRIGGER IF EXISTS trigger_permissionoptions_update_after ON public.permissionoptions;
CREATE TRIGGER
  trigger_permissionoptions_update_after
  after UPDATE ON public.permissionoptions
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_permissionoptions_update_after();




-- permissionoptions
-- updateafter
DROP TRIGGER IF EXISTS trigger_permissionoptions_delete_after ON public.permissionoptions;
CREATE TRIGGER
  trigger_permissionoptions_delete_after
  after DELETE ON public.permissionoptions
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_permissionoptions_delete_after();




DROP TRIGGER IF EXISTS i_fields ON public.fields;
CREATE TRIGGER i_fields
AFTER INSERT OR UPDATE OR DELETE ON fields
FOR EACH ROW
EXECUTE FUNCTION history_function();




DROP TRIGGER IF EXISTS i_objects ON public.objects;
CREATE TRIGGER i_objects
AFTER INSERT OR UPDATE OR DELETE ON objects
FOR EACH ROW
EXECUTE FUNCTION history_function();




DROP TRIGGER IF EXISTS i_permissionoptions ON public.permissionoptions;
CREATE TRIGGER i_permissionoptions
AFTER INSERT OR UPDATE OR DELETE ON permissionoptions
FOR EACH ROW
EXECUTE FUNCTION history_function();




DROP TRIGGER IF EXISTS i_permissions ON public.permissions;
CREATE TRIGGER i_permissions
AFTER INSERT OR UPDATE OR DELETE ON permissions
FOR EACH ROW
EXECUTE FUNCTION history_function();




DROP TRIGGER IF EXISTS i_profiles ON public.profiles;
CREATE TRIGGER i_profiles
AFTER INSERT OR UPDATE OR DELETE ON profiles
FOR EACH ROW
EXECUTE FUNCTION history_function();




DROP TRIGGER IF EXISTS i_xusers ON public.xusers;
CREATE TRIGGER i_xusers
AFTER INSERT OR UPDATE OR DELETE ON xusers
FOR EACH ROW
EXECUTE FUNCTION history_function();




-- settings
DROP TRIGGER IF EXISTS trigger_settings_bi ON public.settings;
CREATE TRIGGER
  trigger_settings_bi
  before INSERT ON public.settings
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_beforeinsert_nooverwrite();


DROP TRIGGER IF EXISTS trigger_settings_ua ON public.settings;
CREATE TRIGGER
  trigger_settings_ua
  before UPDATE ON public.settings
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_beforeupdate_checkidandcreatedat();


DROP TRIGGER IF EXISTS i_settings ON public.settings;
CREATE TRIGGER i_settings
AFTER INSERT OR UPDATE OR DELETE ON settings
FOR EACH ROW
EXECUTE FUNCTION history_function();


DROP TRIGGER IF EXISTS trigger_settings_update_after ON public.settings;
CREATE TRIGGER
  trigger_settings_update_after
  after UPDATE ON public.settings
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_settings_update_after();


DROP TRIGGER IF EXISTS trigger_settings_delete_after ON public.settings;
CREATE TRIGGER
  trigger_settings_delete_after
  after DELETE ON public.settings
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_settings_delete_after();


-- keepalive
DROP TRIGGER IF EXISTS trigger_keepalive ON public.keepalive;
CREATE TRIGGER
  trigger_keepalive
  before UPDATE ON public.keepalive
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_keepalive();


-- csql
--create table public.ztest1( id uuid not null default gen_random_uuid () ) tablespace pg_default;
DROP TRIGGER IF EXISTS trigger_csql_bi ON public.csql;
CREATE TRIGGER
  trigger_csql_bi
  before INSERT ON public.csql
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_beforeinsert_nooverwrite();


DROP TRIGGER IF EXISTS trigger_csql_ua ON public.csql;
CREATE TRIGGER
  trigger_csql_ua
  before UPDATE ON public.csql
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_beforeupdate_checkidandcreatedat();


DROP TRIGGER IF EXISTS i_csql ON public.csql;
CREATE TRIGGER i_csql
AFTER INSERT OR UPDATE OR DELETE ON csql
FOR EACH ROW
EXECUTE FUNCTION history_function();


DROP TRIGGER IF EXISTS trigger_csql_insert_after ON public.csql;
CREATE TRIGGER trigger_csql_insert_after
AFTER INSERT ON csql
FOR EACH ROW
EXECUTE FUNCTION triggerfunction_csql_insert_after();


DROP TRIGGER IF EXISTS trigger_csql_update_after ON public.csql;
CREATE TRIGGER trigger_csql_update_after
AFTER UPDATE ON csql
FOR EACH ROW
EXECUTE FUNCTION triggerfunction_csql_update_after();


DROP TRIGGER IF EXISTS trigger_csql_delete_after ON public.csql;
CREATE TRIGGER trigger_csql_delete_after
AFTER DELETE ON csql
FOR EACH ROW
EXECUTE FUNCTION triggerfunction_csql_delete_after();


-- pages
DROP TRIGGER IF EXISTS trigger_pages_bi ON public.pages;
CREATE TRIGGER
  trigger_pages_bi
  before INSERT ON public.pages
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_beforeinsert_nooverwrite();


DROP TRIGGER IF EXISTS trigger_pages_ua ON public.pages;
CREATE TRIGGER
  trigger_pages_ua
  before UPDATE ON public.pages
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_beforeupdate_checkidandcreatedat();


DROP TRIGGER IF EXISTS i_pages ON public.pages;
CREATE TRIGGER i_pages
AFTER INSERT OR UPDATE OR DELETE ON pages
FOR EACH ROW
EXECUTE FUNCTION history_function();


DROP TRIGGER IF EXISTS trigger_pages_insert_after ON public.pages;
CREATE TRIGGER trigger_pages_insert_after
AFTER INSERT ON pages
FOR EACH ROW
EXECUTE FUNCTION triggerfunction_pages_insert_after();


DROP TRIGGER IF EXISTS trigger_pages_update_after ON public.pages;
CREATE TRIGGER trigger_pages_update_after
AFTER UPDATE ON pages
FOR EACH ROW
EXECUTE FUNCTION triggerfunction_pages_update_after();


DROP TRIGGER IF EXISTS trigger_pages_delete_after ON public.pages;
CREATE TRIGGER trigger_pages_delete_after
AFTER DELETE ON pages
FOR EACH ROW
EXECUTE FUNCTION triggerfunction_pages_delete_after();


-- cpermissions
DROP TRIGGER IF EXISTS trigger_cpermissions_bi ON public.cpermissions;
CREATE TRIGGER
  trigger_cpermissions_bi
  before INSERT ON public.cpermissions
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_beforeinsert_nooverwrite();


DROP TRIGGER IF EXISTS trigger_cpermissions_ua ON public.cpermissions;
CREATE TRIGGER
  trigger_cpermissions_ua
  before UPDATE ON public.cpermissions
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_beforeupdate_checkidandcreatedat();


DROP TRIGGER IF EXISTS i_cpermissions ON public.cpermissions;
CREATE TRIGGER i_cpermissions
AFTER INSERT OR UPDATE OR DELETE ON cpermissions
FOR EACH ROW
EXECUTE FUNCTION history_function();

DROP TRIGGER IF EXISTS trigger_cpermissions_insert_after ON public.cpermissions;
CREATE TRIGGER trigger_cpermissions_insert_after
AFTER INSERT ON cpermissions
FOR EACH ROW
EXECUTE FUNCTION triggerfunction_cpermissions_insert_after();


DROP TRIGGER IF EXISTS trigger_cpermissions_update_after ON public.cpermissions;
CREATE TRIGGER trigger_cpermissions_update_after
AFTER UPDATE ON cpermissions
FOR EACH ROW
EXECUTE FUNCTION triggerfunction_cpermissions_update_after();


DROP TRIGGER IF EXISTS trigger_cpermissions_delete_after ON public.cpermissions;
CREATE TRIGGER trigger_cpermissions_delete_after
AFTER DELETE ON cpermissions
FOR EACH ROW
EXECUTE FUNCTION triggerfunction_cpermissions_delete_after();


-- actions
DROP TRIGGER IF EXISTS trigger_actions_bi ON public.actions;
CREATE TRIGGER
  trigger_actions_bi
  before INSERT ON public.actions
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_beforeinsert_nooverwrite();


DROP TRIGGER IF EXISTS trigger_actions_ua ON public.actions;
CREATE TRIGGER
  trigger_actions_ua
  before UPDATE ON public.actions
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_beforeupdate_checkidandcreatedat();


DROP TRIGGER IF EXISTS i_actions ON public.actions;
CREATE TRIGGER i_actions
AFTER INSERT OR UPDATE OR DELETE ON actions
FOR EACH ROW
EXECUTE FUNCTION history_function();

DROP TRIGGER IF EXISTS trigger_actions_insert_after ON public.actions;
CREATE TRIGGER trigger_actions_insert_after
AFTER INSERT ON actions
FOR EACH ROW
EXECUTE FUNCTION triggerfunction_actions_insert_after();


DROP TRIGGER IF EXISTS trigger_actions_update_after ON public.actions;
CREATE TRIGGER trigger_actions_update_after
AFTER UPDATE ON actions
FOR EACH ROW
EXECUTE FUNCTION triggerfunction_actions_update_after();


DROP TRIGGER IF EXISTS trigger_actions_delete_after ON public.actions;
CREATE TRIGGER trigger_actions_delete_after
AFTER DELETE ON actions
FOR EACH ROW
EXECUTE FUNCTION triggerfunction_actions_delete_after();


-- appoptions
DROP TRIGGER IF EXISTS trigger_appoptions_bi ON public.appoptions;
CREATE TRIGGER
  trigger_appoptions_bi
  before INSERT ON public.appoptions
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_beforeinsert_nooverwrite();


DROP TRIGGER IF EXISTS trigger_appoptions_ua ON public.appoptions;
CREATE TRIGGER
  trigger_appoptions_ua
  before UPDATE ON public.appoptions
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_beforeupdate_checkidandcreatedat();


DROP TRIGGER IF EXISTS i_appoptions ON public.appoptions;
CREATE TRIGGER i_appoptions
AFTER INSERT OR UPDATE OR DELETE ON appoptions
FOR EACH ROW
EXECUTE FUNCTION history_function();


-- apps
DROP TRIGGER IF EXISTS trigger_apps_bi ON public.apps;
CREATE TRIGGER
  trigger_apps_bi
  before INSERT ON public.apps
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_beforeinsert_nooverwrite();


DROP TRIGGER IF EXISTS trigger_apps_ua ON public.apps;
CREATE TRIGGER
  trigger_apps_ua
  before UPDATE ON public.apps
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_beforeupdate_checkidandcreatedat();


DROP TRIGGER IF EXISTS i_apps ON public.apps;
CREATE TRIGGER i_apps
AFTER INSERT OR UPDATE OR DELETE ON apps
FOR EACH ROW
EXECUTE FUNCTION history_function();


DROP TRIGGER IF EXISTS trigger_apps_insert_after ON public.apps;
CREATE TRIGGER trigger_apps_insert_after
AFTER INSERT ON apps
FOR EACH ROW
EXECUTE FUNCTION triggerfunction_apps_insert_after();


DROP TRIGGER IF EXISTS trigger_apps_update_after ON public.apps;
CREATE TRIGGER trigger_apps_update_after
AFTER UPDATE ON apps
FOR EACH ROW
EXECUTE FUNCTION triggerfunction_apps_update_after();


DROP TRIGGER IF EXISTS trigger_apps_delete_after ON public.apps;
CREATE TRIGGER trigger_apps_delete_after
AFTER DELETE ON apps
FOR EACH ROW
EXECUTE FUNCTION triggerfunction_apps_delete_after();


-- objecthistories
DROP TRIGGER IF EXISTS trigger_objecthistories_bi ON public.objecthistories;
CREATE TRIGGER
  trigger_objecthistories_bi
  before INSERT ON public.objecthistories
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_beforeinsert_nooverwrite();


DROP TRIGGER IF EXISTS trigger_objecthistories_ua ON public.objecthistories;
CREATE TRIGGER
  trigger_objecthistories_ua
  before UPDATE ON public.objecthistories
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.triggerfunction_beforeupdate_checkidandcreatedat();


DROP TRIGGER IF EXISTS i_objecthistories ON public.objecthistories;
CREATE TRIGGER i_objecthistories
AFTER INSERT OR UPDATE OR DELETE ON objecthistories
FOR EACH ROW
EXECUTE FUNCTION history_function();


DROP TRIGGER IF EXISTS trigger_objecthistories_insert_after ON public.objecthistories;
CREATE TRIGGER trigger_objecthistories_insert_after
AFTER INSERT ON objecthistories
FOR EACH ROW
EXECUTE FUNCTION triggerfunction_objecthistories_insert_after();


DROP TRIGGER IF EXISTS trigger_objecthistories_update_after ON public.objecthistories;
CREATE TRIGGER trigger_objecthistories_update_after
AFTER UPDATE ON objecthistories
FOR EACH ROW
EXECUTE FUNCTION triggerfunction_objecthistories_update_after();


DROP TRIGGER IF EXISTS trigger_objecthistories_delete_after ON public.objecthistories;
CREATE TRIGGER trigger_objecthistories_delete_after
AFTER DELETE ON objecthistories
FOR EACH ROW
EXECUTE FUNCTION triggerfunction_objecthistories_delete_after();


-- -- zmigrations
-- DROP TRIGGER IF EXISTS trigger_zmigrations_bi ON public.zmigrations;
-- CREATE TRIGGER
--   trigger_zmigrations_bi
--   before INSERT ON public.zmigrations
--   FOR EACH ROW
--   EXECUTE PROCEDURE
--     public.triggerfunction_beforeinsert_nooverwrite();


-- DROP TRIGGER IF EXISTS trigger_zmigrations_ua ON public.zmigrations;
-- CREATE TRIGGER
--   trigger_zmigrations_ua
--   before UPDATE ON public.zmigrations
--   FOR EACH ROW
--   EXECUTE PROCEDURE
--     public.triggerfunction_beforeupdate_checkidandcreatedat();

-- DROP TRIGGER IF EXISTS trigger_zconfig_bi ON public.zconfig;
-- CREATE TRIGGER
--   trigger_zconfig_bi
--   before INSERT ON public.zconfig
--   FOR EACH ROW
--   EXECUTE PROCEDURE
--     public.triggerfunction_beforeinsert_nooverwrite();


-- DROP TRIGGER IF EXISTS trigger_zconfig_ua ON public.zconfig;
-- CREATE TRIGGER
--   trigger_zconfig_ua
--   before UPDATE ON public.zconfig
--   FOR EACH ROW
--   EXECUTE PROCEDURE
--     public.triggerfunction_beforeupdate_checkidandcreatedat();
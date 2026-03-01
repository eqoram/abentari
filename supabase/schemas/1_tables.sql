create table
  public.profiles (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    created_by uuid null,
    modified_at timestamp with time zone null,
    modified_by uuid null,
    description text,
    name text not null,
    api_name text not null UNIQUE,
    is_active boolean not null default false,
    is_public boolean not null default false,
    is_unauthenticated boolean not null default false,
    is_standard boolean not null default false,
    mfa_enabled boolean not null default false,
    home_message text,
    search tsvector GENERATED ALWAYS AS (to_tsvector('english', name)) STORED,
    constraint profiles_pkey primary key (id),
    CONSTRAINT api_name_format_check
    CHECK (
      api_name IN ('admin', 'unauthenticated') OR
      api_name ~ '^c_[a-z0-9]{1,20}__[0-9a-fA-F]{8}_[0-9a-fA-F]{4}_[0-9a-fA-F]{4}_[0-9a-fA-F]{4}_[0-9a-fA-F]{12}$'
    )
  ) tablespace pg_default;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

create index profiles_search on public.profiles USING GIN (search);
create index profiles_created_at on public.profiles (created_at);
create index profiles_name on public.profiles (name);


create table
  public.xusers (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    created_by uuid null,
    modified_at timestamp with time zone null,
    modified_by uuid null,
    description text,
    user_id uuid null,
    profile_id uuid not null,
    invite_email text not null UNIQUE,
    invite_secret text not null,
    invite_open boolean not null default false,
    is_active boolean not null default false,
    is_public boolean not null default false,
    is_unauthenticated boolean not null default false,
    skip_puser boolean not null default false,
    is_superuser boolean not null default false,
    mfa_enabled boolean not null default false,
    search tsvector GENERATED ALWAYS AS (to_tsvector('english', invite_email)) STORED,
    constraint xusers_pkey primary key (id)
  ) tablespace pg_default;
ALTER TABLE public.xusers ENABLE ROW LEVEL SECURITY;

create index xusers_search on public.xusers USING GIN (search);
create index xusers_invite_email on public.xusers (invite_email);
create index xusers_user_id on public.xusers (user_id);
create index xusers_created_at on public.xusers (created_at);


create table
  public.permissions (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    created_by uuid null,
    modified_at timestamp with time zone null,
    modified_by uuid null,
    description text,
    permission text not null,
    profile_id uuid not null,
    is_active boolean not null,
    search tsvector GENERATED ALWAYS AS (to_tsvector('english', permission)) STORED,
    constraint permissions_pkey primary key (id),
    UNIQUE (profile_id, permission)
  ) tablespace pg_default;
ALTER TABLE public.permissions ENABLE ROW LEVEL SECURITY;

create index permissions_search on public.permissions USING GIN (search);
create index permissions_created_at on public.permissions (created_at);
create index permissions_permission on public.permissions (permission);


create table
  public.objects (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    created_by uuid null,
    modified_at timestamp with time zone null,
    modified_by uuid null,
    description text,
    api_name text not null UNIQUE,
    name text not null,
    fields_selected uuid[] null,
    show_id boolean not null default true,
    show_createdby boolean not null default false,
    show_createdat boolean not null default false,
    show_modifiedby boolean not null default false,
    show_modifiedat boolean not null default false,
    show_owner boolean not null default false,
    show_name boolean not null default true,
    show_counter boolean not null default true,
    show_search boolean not null default true,
    order_asc boolean not null default false,
    relations uuid[] null,
    history boolean not null default true,
    trigger_checkrequired boolean not null default true,
    trigger_checkdropdown boolean not null default true,
    trigger_deletepicklist boolean not null default true,
    trigger_deleterelation boolean not null default true,
    search tsvector GENERATED ALWAYS AS (to_tsvector('english', name)) STORED,
    constraint objects_pkey primary key (id),
    CONSTRAINT api_name_format_check
    CHECK (
      api_name IN ('admin', 'unauthenticated') OR
      api_name ~ '^c_[a-z0-9]{1,20}__[0-9a-fA-F]{8}_[0-9a-fA-F]{4}_[0-9a-fA-F]{4}_[0-9a-fA-F]{4}_[0-9a-fA-F]{12}$'
    )
  ) tablespace pg_default;
ALTER TABLE public.objects ENABLE ROW LEVEL SECURITY;

create index objects_search on public.objects USING GIN (search);
create index objects_created_at on public.objects (created_at);
create index objects_name on public.objects (name);


create table
  public.fields (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    created_by uuid null,
    modified_at timestamp with time zone null,
    modified_by uuid null,
    description text,
    api_name text not null UNIQUE,
    name text not null,
    required boolean not null default true,
    type text not null,
    relationname text null,
    relation_id uuid null,
    relation_apiname text null,
    picklist_values text[] null,
    parent_id uuid not null,
    parent_apiname text null,
    display text null,
    is_standard boolean not null default false,
    trigger_addfieldtolayout boolean not null default true,
    search tsvector GENERATED ALWAYS AS (to_tsvector('english', name)) STORED,
    constraint fields_pkey primary key (id),
    CONSTRAINT api_name_format_check
    CHECK (
      api_name IN ('email', 'user_id', 'xuser_id') OR
      api_name ~ '^c_[a-z0-9]{1,20}__[0-9a-fA-F]{8}_[0-9a-fA-F]{4}_[0-9a-fA-F]{4}_[0-9a-fA-F]{4}_[0-9a-fA-F]{12}$'
    )
  ) tablespace pg_default;
ALTER TABLE public.fields ENABLE ROW LEVEL SECURITY;

create index fields_search on public.fields USING GIN (search);
create index fields_created_at on public.fields (created_at);
create index fields_name on public.fields (name);


create table
  public.permissionoptions (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    created_by uuid null,
    modified_at timestamp with time zone null,
    modified_by uuid null,
    description text,
    is_standard boolean not null default false,
    is_custom boolean not null default false,
    name text not null UNIQUE,
    search tsvector GENERATED ALWAYS AS (to_tsvector('english', name)) STORED,
    constraint permissionoptions_pkey primary key (id)
  ) tablespace pg_default;
ALTER TABLE public.permissionoptions ENABLE ROW LEVEL SECURITY;

create index permissionoptions_search on public.permissionoptions USING GIN (search);
create index permissionoptions_created_at on public.permissionoptions (created_at);
create index permissionoptions_name on public.permissionoptions (name);


-- create table
--   public.c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413 (
--     id uuid not null default gen_random_uuid (),
--     created_at timestamp with time zone not null default now(),
--     name text not null,
--     user_id uuid not null,
--     email text not null UNIQUE,
--     constraint c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413_pk primary key (id)
--   ) tablespace pg_default;

-- ALTER TABLE public.c_pusers__abfe9125_deb6_4d0f_8bc5_9d2d0700f413 ENABLE ROW LEVEL SECURITY;


create table
  public.i_fields (
    id uuid not null default gen_random_uuid (),
    parent_id uuid not null,
    changed_at timestamp with time zone not null default now(),
    changed_by TEXT not null,
    action TEXT not null,
    oldrecord JSONB not null,
    newrecord JSONB not null,
    constraint i_fields_pkey primary key (id)
  ) tablespace pg_default;
ALTER TABLE public.i_fields ENABLE ROW LEVEL SECURITY;

create index i_fields_changed_at on public.i_fields (changed_at);
create index i_fields_parent_id on public.i_fields (parent_id);


create table
  public.i_objects (
    id uuid not null default gen_random_uuid (),
    parent_id uuid not null,
    changed_at timestamp with time zone not null default now(),
    changed_by TEXT not null,
    action TEXT not null,
    oldrecord JSONB not null,
    newrecord JSONB not null,
    constraint i_objects_pkey primary key (id)
  ) tablespace pg_default;
ALTER TABLE public.i_objects ENABLE ROW LEVEL SECURITY;

create index i_objects_changed_at on public.i_objects (changed_at);
create index i_objects_parent_id on public.i_objects (parent_id);


create table
  public.i_permissionoptions (
    id uuid not null default gen_random_uuid (),
    parent_id uuid not null,
    changed_at timestamp with time zone not null default now(),
    changed_by TEXT not null,
    action TEXT not null,
    oldrecord JSONB not null,
    newrecord JSONB not null,
    constraint i_permissionoptions_pkey primary key (id)
  ) tablespace pg_default;
ALTER TABLE public.i_permissionoptions ENABLE ROW LEVEL SECURITY;

create index i_permissionoptions_changed_at on public.i_permissionoptions (changed_at);
create index i_permissionoptions_parent_id on public.i_permissionoptions (parent_id);


create table
  public.i_permissions (
    id uuid not null default gen_random_uuid (),
    parent_id uuid not null,
    changed_at timestamp with time zone not null default now(),
    changed_by TEXT not null,
    action TEXT not null,
    oldrecord JSONB not null,
    newrecord JSONB not null,
    constraint i_permissions_pkey primary key (id)
  ) tablespace pg_default;
ALTER TABLE public.i_permissions ENABLE ROW LEVEL SECURITY;

create index i_permissions_changed_at on public.i_permissions (changed_at);
create index i_permissions_parent_id on public.i_permissions (parent_id);


create table
  public.i_profiles (
    id uuid not null default gen_random_uuid (),
    parent_id uuid not null,
    changed_at timestamp with time zone not null default now(),
    changed_by TEXT not null,
    action TEXT not null,
    oldrecord JSONB not null,
    newrecord JSONB not null,
    constraint i_profiles_pkey primary key (id)
  ) tablespace pg_default;
ALTER TABLE public.i_profiles ENABLE ROW LEVEL SECURITY;

create index i_profiles_changed_at on public.i_profiles (changed_at);
create index i_profiles_parent_id on public.i_profiles (parent_id);


create table
  public.i_xusers (
    id uuid not null default gen_random_uuid (),
    parent_id uuid not null,
    changed_at timestamp with time zone not null default now(),
    changed_by TEXT not null,
    action TEXT not null,
    oldrecord JSONB not null,
    newrecord JSONB not null,
    constraint i_xusers_pkey primary key (id)
  ) tablespace pg_default;
ALTER TABLE public.i_xusers ENABLE ROW LEVEL SECURITY;

create index i_xusers_changed_at on public.i_xusers (changed_at);
create index i_xusers_parent_id on public.i_xusers (parent_id);


create table
  public.keepalive (
    id uuid not null default gen_random_uuid (),
    changed_at timestamp with time zone not null default now(),
    currentdatetime numeric null,
    constraint keepalive_pkey primary key (id)
  ) tablespace pg_default;
ALTER TABLE public.keepalive ENABLE ROW LEVEL SECURITY;


create table
  public.settings (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    created_by uuid null,
    modified_at timestamp with time zone null,
    modified_by uuid null,
    api_name text not null UNIQUE,
    name text not null,
    description text,
    rules text,
    is_active boolean not null default true,
    is_standard boolean not null default false,
    search tsvector GENERATED ALWAYS AS (to_tsvector('english', name)) STORED,
    constraint settings_pkey primary key (id),
    CONSTRAINT api_name_format_check
    CHECK (
      api_name IN ('allowresetmfa', 'allowresetpassword', 'countersetuphistory', 'countersetup', 'counterhistory') OR
      api_name ~ '^c_[a-z0-9]{1,20}__[0-9a-fA-F]{8}_[0-9a-fA-F]{4}_[0-9a-fA-F]{4}_[0-9a-fA-F]{4}_[0-9a-fA-F]{12}$'
    )
  ) tablespace pg_default;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

create index settings_search on public.settings USING GIN (search);
create index settings_created_at on public.settings (created_at);
create index settings_name on public.settings (name);


create table
  public.i_settings (
    id uuid not null default gen_random_uuid (),
    parent_id uuid not null,
    changed_at timestamp with time zone not null default now(),
    changed_by TEXT not null,
    action TEXT not null,
    oldrecord JSONB not null,
    newrecord JSONB not null,
    constraint i_settings_pkey primary key (id)
  ) tablespace pg_default;
ALTER TABLE public.i_settings ENABLE ROW LEVEL SECURITY;

create index i_settings_changed_at on public.i_settings (changed_at);
create index i_settings_parent_id on public.i_settings (parent_id);


create table
  public.csql (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    created_by uuid null,
    modified_at timestamp with time zone null,
    modified_by uuid null,
    description text,
    api_name text not null UNIQUE,
    name text not null,
    type text,
    is_active boolean not null default true,
    bodycreate text not null,
    bodyupdate text not null,
    bodydelete text not null,
    search tsvector GENERATED ALWAYS AS (to_tsvector('english', name)) STORED,
    constraint csql_pkey primary key (id),
    CONSTRAINT api_name_format_check
    CHECK (
      api_name ~ '^c_[a-z0-9]{1,20}__[0-9a-fA-F]{8}_[0-9a-fA-F]{4}_[0-9a-fA-F]{4}_[0-9a-fA-F]{4}_[0-9a-fA-F]{12}$'
    )
  ) tablespace pg_default;
ALTER TABLE public.csql ENABLE ROW LEVEL SECURITY;

create index csql_search on public.csql USING GIN (search);
create index csql_created_at on public.csql (created_at);
create index csql_name on public.csql (name);


create table
  public.i_csql (
    id uuid not null default gen_random_uuid (),
    parent_id uuid not null,
    changed_at timestamp with time zone not null default now(),
    changed_by TEXT not null,
    action TEXT not null,
    oldrecord JSONB not null,
    newrecord JSONB not null,
    constraint i_csql_pkey primary key (id)
  ) tablespace pg_default;
ALTER TABLE public.i_csql ENABLE ROW LEVEL SECURITY;

create index i_csql_changed_at on public.i_csql (changed_at);
create index i_csql_parent_id on public.i_csql (parent_id);


create table
  public.pages (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    created_by uuid null,
    modified_at timestamp with time zone null,
    modified_by uuid null,
    description text,
    api_name text not null UNIQUE,
    name text not null,
    type text,
    url text,
    html text,
    is_active boolean not null default true,
    search tsvector GENERATED ALWAYS AS (to_tsvector('english', name)) STORED,
    constraint pages_pkey primary key (id),
    CONSTRAINT api_name_format_check
    CHECK (
      api_name ~ '^c_[a-z0-9]{1,20}__[0-9a-fA-F]{8}_[0-9a-fA-F]{4}_[0-9a-fA-F]{4}_[0-9a-fA-F]{4}_[0-9a-fA-F]{12}$'
    )
  ) tablespace pg_default;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

create index pages_search on public.pages USING GIN (search);
create index pages_created_at on public.pages (created_at);
create index pages_name on public.pages (name);


create table
  public.i_pages (
    id uuid not null default gen_random_uuid (),
    parent_id uuid not null,
    changed_at timestamp with time zone not null default now(),
    changed_by TEXT not null,
    action TEXT not null,
    oldrecord JSONB not null,
    newrecord JSONB not null,
    constraint i_pages_pkey primary key (id)
  ) tablespace pg_default;
ALTER TABLE public.i_pages ENABLE ROW LEVEL SECURITY;

create index i_pages_changed_at on public.i_pages (changed_at);
create index i_pages_parent_id on public.i_pages (parent_id);


create table
  public.cpermissions (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    created_by uuid null,
    modified_at timestamp with time zone null,
    modified_by uuid null,
    api_name text not null UNIQUE,
    name text not null,
    description text,
    is_active boolean not null default true,
    search tsvector GENERATED ALWAYS AS (to_tsvector('english', name)) STORED,
    constraint cpermissions_pkey primary key (id),
    CONSTRAINT api_name_format_check
    CHECK (
      api_name ~ '^c_[a-z0-9]{1,20}__[0-9a-fA-F]{8}_[0-9a-fA-F]{4}_[0-9a-fA-F]{4}_[0-9a-fA-F]{4}_[0-9a-fA-F]{12}$'
    )
  ) tablespace pg_default;
ALTER TABLE public.cpermissions ENABLE ROW LEVEL SECURITY;

create index cpermissions_search on public.cpermissions USING GIN (search);
create index cpermissions_created_at on public.cpermissions (created_at);
create index cpermissions_name on public.cpermissions (name);


create table
  public.i_cpermissions (
    id uuid not null default gen_random_uuid (),
    parent_id uuid not null,
    changed_at timestamp with time zone not null default now(),
    changed_by TEXT not null,
    action TEXT not null,
    oldrecord JSONB not null,
    newrecord JSONB not null,
    constraint i_cpermissions_pkey primary key (id)
  ) tablespace pg_default;
ALTER TABLE public.i_cpermissions ENABLE ROW LEVEL SECURITY;

create index i_cpermissions_changed_at on public.i_cpermissions (changed_at);
create index i_cpermissions_parent_id on public.i_cpermissions (parent_id);


-- actions
create table
  public.actions (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    created_by uuid null,
    modified_at timestamp with time zone null,
    modified_by uuid null,
    api_name text not null UNIQUE,
    name text not null,
    description text,
    type text not null,
    relation text,
    action text not null,
    is_active boolean not null default true,
    search tsvector GENERATED ALWAYS AS (to_tsvector('english', name)) STORED,
    constraint actions_pkey primary key (id),
    CONSTRAINT api_name_format_check
    CHECK (
      api_name ~ '^c_[a-z0-9]{1,20}__[0-9a-fA-F]{8}_[0-9a-fA-F]{4}_[0-9a-fA-F]{4}_[0-9a-fA-F]{4}_[0-9a-fA-F]{12}$'
    )
  ) tablespace pg_default;
ALTER TABLE public.actions ENABLE ROW LEVEL SECURITY;

create index actions_search on public.actions USING GIN (search);
create index actions_created_at on public.actions (created_at);
create index actions_name on public.actions (name);


create table
  public.i_actions (
    id uuid not null default gen_random_uuid (),
    parent_id uuid not null,
    changed_at timestamp with time zone not null default now(),
    changed_by TEXT not null,
    action TEXT not null,
    oldrecord JSONB not null,
    newrecord JSONB not null,
    constraint i_actions_pkey primary key (id)
  ) tablespace pg_default;
ALTER TABLE public.i_actions ENABLE ROW LEVEL SECURITY;

create index i_actions_changed_at on public.i_actions (changed_at);
create index i_actions_parent_id on public.i_actions (parent_id);


-- appoptions
create table
  public.appoptions (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    created_by uuid null,
    modified_at timestamp with time zone null,
    modified_by uuid null,
    name text not null UNIQUE,
    item_id uuid not null,
    label text not null,
    description text,
    type text not null,
    search tsvector GENERATED ALWAYS AS (to_tsvector('english', name)) STORED,
    constraint appoptions_pkey primary key (id)
  ) tablespace pg_default;
ALTER TABLE public.appoptions ENABLE ROW LEVEL SECURITY;

create index appoptions_search on public.appoptions USING GIN (search);
create index appoptions_created_at on public.appoptions (created_at);
create index appoptions_name on public.appoptions (name);
create index appoptions_label on public.appoptions (label);
create index appoptions_type on public.appoptions (type);


create table
  public.i_appoptions (
    id uuid not null default gen_random_uuid (),
    parent_id uuid not null,
    changed_at timestamp with time zone not null default now(),
    changed_by TEXT not null,
    action TEXT not null,
    oldrecord JSONB not null,
    newrecord JSONB not null,
    constraint i_appoptions_pkey primary key (id)
  ) tablespace pg_default;
ALTER TABLE public.i_appoptions ENABLE ROW LEVEL SECURITY;

create index i_appoptions_changed_at on public.i_appoptions (changed_at);
create index i_appoptions_parent_id on public.i_appoptions (parent_id);


-- apps
create table
  public.apps (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    created_by uuid null,
    modified_at timestamp with time zone null,
    modified_by uuid null,
    api_name text not null UNIQUE,
    name text not null,
    description text,
    items_selected uuid[] null,
    is_active boolean not null default true,
    search tsvector GENERATED ALWAYS AS (to_tsvector('english', name)) STORED,
    constraint apps_pkey primary key (id),
    CONSTRAINT api_name_format_check
    CHECK (
      api_name ~ '^c_[a-z0-9]{1,20}__[0-9a-fA-F]{8}_[0-9a-fA-F]{4}_[0-9a-fA-F]{4}_[0-9a-fA-F]{4}_[0-9a-fA-F]{12}$'
    )
  ) tablespace pg_default;
ALTER TABLE public.apps ENABLE ROW LEVEL SECURITY;

create index apps_search on public.apps USING GIN (search);
create index apps_created_at on public.apps (created_at);
create index apps_name on public.apps (name);


create table
  public.i_apps (
    id uuid not null default gen_random_uuid (),
    parent_id uuid not null,
    changed_at timestamp with time zone not null default now(),
    changed_by TEXT not null,
    action TEXT not null,
    oldrecord JSONB not null,
    newrecord JSONB not null,
    constraint i_apps_pkey primary key (id)
  ) tablespace pg_default;
ALTER TABLE public.i_apps ENABLE ROW LEVEL SECURITY;

create index i_apps_changed_at on public.i_apps (changed_at);
create index i_apps_parent_id on public.i_apps (parent_id);


create table
  public.i_run (
    id uuid not null default gen_random_uuid (),
    parent_id uuid not null,
    changed_at timestamp with time zone not null default now(),
    changed_by TEXT not null,
    action TEXT not null,
    oldrecord JSONB not null,
    newrecord JSONB not null,
    constraint i_run_pkey primary key (id)
  ) tablespace pg_default;
ALTER TABLE public.i_run ENABLE ROW LEVEL SECURITY;

create index i_run_changed_at on public.i_run (changed_at);
create index i_run_parent_id on public.i_run (parent_id);


-- objecthistories
create table
  public.objecthistories (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    created_by uuid null,
    modified_at timestamp with time zone null,
    modified_by uuid null,
    api_name text not null UNIQUE,
    name text not null,
    search tsvector GENERATED ALWAYS AS (to_tsvector('english', name)) STORED,
    constraint objecthistories_pkey primary key (id),
    CONSTRAINT api_name_format_check
    CHECK (
      api_name ~ '^h_[a-z0-9]{1,20}__[0-9a-fA-F]{8}_[0-9a-fA-F]{4}_[0-9a-fA-F]{4}_[0-9a-fA-F]{4}_[0-9a-fA-F]{12}$'
    )
  ) tablespace pg_default;
ALTER TABLE public.objecthistories ENABLE ROW LEVEL SECURITY;

create index objecthistories_search on public.objecthistories USING GIN (search);
create index objecthistories_created_at on public.objecthistories (created_at);
create index objecthistories_name on public.objecthistories (name);


create table
  public.i_objecthistories (
    id uuid not null default gen_random_uuid (),
    parent_id uuid not null,
    changed_at timestamp with time zone not null default now(),
    changed_by TEXT not null,
    action TEXT not null,
    oldrecord JSONB not null,
    newrecord JSONB not null,
    constraint i_objecthistories_pkey primary key (id)
  ) tablespace pg_default;
ALTER TABLE public.i_objecthistories ENABLE ROW LEVEL SECURITY;

create index i_objecthistories_changed_at on public.i_objecthistories (changed_at);
create index i_objecthistories_parent_id on public.i_objecthistories (parent_id);


create table
  public.i_retrieve (
    id uuid not null default gen_random_uuid (),
    parent_id uuid not null,
    changed_at timestamp with time zone not null default now(),
    changed_by TEXT not null,
    action TEXT not null,
    oldrecord JSONB not null,
    newrecord JSONB not null,
    constraint i_retrieve_pkey primary key (id)
  ) tablespace pg_default;
ALTER TABLE public.i_retrieve ENABLE ROW LEVEL SECURITY;

create index i_retrieve_changed_at on public.i_retrieve (changed_at);
create index i_retrieve_parent_id on public.i_retrieve (parent_id);


create table
  public.i_deploy (
    id uuid not null default gen_random_uuid (),
    parent_id uuid not null,
    changed_at timestamp with time zone not null default now(),
    changed_by TEXT not null,
    action TEXT not null,
    oldrecord JSONB not null,
    newrecord JSONB not null,
    constraint i_deploy_pkey primary key (id)
  ) tablespace pg_default;
ALTER TABLE public.i_deploy ENABLE ROW LEVEL SECURITY;

create index i_deploy_changed_at on public.i_deploy (changed_at);
create index i_deploy_parent_id on public.i_deploy (parent_id);

create table
  public.testtable (
    id uuid not null default gen_random_uuid (),
    test1 text,
    constraint testtable_pkey primary key (id)
  ) tablespace pg_default;
ALTER TABLE public.testtable ENABLE ROW LEVEL SECURITY;

-- create table
--   public.zmigrations (
--     id uuid not null default gen_random_uuid (),
--     created_at timestamp with time zone not null default now(),
--     created_by uuid null,
--     modified_at timestamp with time zone null,
--     modified_by uuid null,
--     migration text not null,
--     constraint zmigrations_pkey primary key (id)
--   ) tablespace pg_default;
-- ALTER TABLE public.zmigrations ENABLE ROW LEVEL SECURITY;

-- create table
--   public.zconfig (
--     id uuid not null default gen_random_uuid (),
--     created_at timestamp with time zone not null default now(),
--     created_by uuid null,
--     modified_at timestamp with time zone null,
--     modified_by uuid null,
--     name text not null UNIQUE,
--     value text not null,
--     is_active boolean not null default true,
--     constraint zconfig_pkey primary key (id)
--   ) tablespace pg_default;
-- ALTER TABLE public.zconfig ENABLE ROW LEVEL SECURITY;
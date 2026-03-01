import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4, validate as isValidUUID } from 'uuid';

let lrunscript = 'no';
lrunscript = process.env.PRUNSCRIPT;

let ldebug = 'no';
ldebug = process.env.PDEBUG;
let ldebugmode = false;
if (ldebug == 'yes') {
  ldebugmode = true;
}

let supabase = null;
let lsupabaseurl = null;
let lsupabasekey = null;
let lsupabaseusername = null;
let lsupabasepassword = null;

let linclude = 'no';
let lincludestring = '';
let lexclude = 'no';
let lexcludestring = '';

let ldeployall = 'no';
let ldeploysettings = 'no';
let ldeployprofiles = 'no';
let ldeployobjects = 'no';
let ldeployfields = 'no';
let ldeploycpermissions = 'no';
let ldeployactions = 'no';
let ldeploycsql = 'no';
let ldeploypages = 'no';
let ldeployapps = 'no';
let ldeploypermissions = 'no';

let ldestructall = 'no';
let ldestructsettings = 'no';
let ldestructprofiles = 'no';
let ldestructobjects = 'no';
let ldestructfields = 'no';
let ldestructcpermissions = 'no';
let ldestructactions = 'no';
let ldestructcsql = 'no';
let ldestructpages = 'no';
let ldestructapps = 'no';
let ldestructpermissions = 'no';

let luserid = null;
let lxuserid = null;
let lprofileid = null;
let lpermissionsetup = false;
let lpermissionsetuplimited = false;
let lpermissiondeploy = false;

let luserpermissionsetup = null;
let luserpermissionsetuplimited = null;
let luserpermissionsetupdeploy = null;

let ldeployment = '';
let ldeploymentobject = {};
let ldeployitems = [];
let ldestructobject = {};
let ldestructitems = [];

if (lrunscript == 'yes') {
  console.log('deploy: start');

  try {
    run_deploy(
      process.env.PDEBUG,
      process.env.PSUPABASEURL,
      process.env.PSUPABASEKEY,
      process.env.PSUPABASEUSERNAME,
      process.env.PSUPABASEPASSWORD,
      process.env.PDEPLOYMENT,
      process.env.PINCLUDE,
      process.env.PINCLUDELIST,
      process.env.PEXCLUDE,
      process.env.PEXCLUDELIST,
      process.env.PDEPLOYALL,
      process.env.PDEPLOYSETTINGS,
      process.env.PDEPLOYPROFILES,
      process.env.PDEPLOYOBJECTS,
      process.env.PDEPLOYFIELDS,
      process.env.PDEPLOYCPERMISSIONS,
      process.env.PDEPLOYactionS,
      process.env.PDEPLOYCSQL,
      process.env.PDEPLOYPAGES,
      process.env.PDEPLOYAPPS,
      process.env.PDEPLOYPERMISSIONS,
      process.env.PDESTRUCTALL,
      process.env.PDESTRUCTSETTINGS,
      process.env.PDESTRUCTPROFILES,
      process.env.PDESTRUCTOBJECTS,
      process.env.PDESTRUCTFIELDS,
      process.env.PDESTRUCTCPERMISSIONS,
      process.env.PDESTRUCTactionS,
      process.env.PDESTRUCTCSQL,
      process.env.PDESTRUCTPAGES,
      process.env.PDESTRUCTAPPS,
      process.env.PDESTRUCTPERMISSIONS,
    );
  } catch (e) {
    console.log('error');
  }
}

export async function run_deploy(
  pdebug,
  psupabaseurl,
  psupabasekey,
  psupabaseusername,
  psupabasepassword,
  pdeployment,
  pinclude,
  pincludelist,
  pexclude,
  pexcludelist,
  pdeployall,
  pdeploysettings,
  pdeployprofiles,
  pdeployobjects,
  pdeployfields,
  pdeploycpermissions,
  pdeployactions,
  pdeploycsql,
  pdeploypages,
  pdeployapps,
  pdeploypermissions,
  pdestructall,
  pdestructsettings,
  pdestructprofiles,
  pdestructobjects,
  pdestructfields,
  pdestructcpermissions,
  pdestructactions,
  pdestructcsql,
  pdestructpages,
  pdestructapps,
  pdestructpermissions,
) {
  if (pdebug == 'yes') {
    ldebugmode = true;
  }

  lsupabaseurl = null;
  lsupabasekey = null;
  lsupabaseurl = psupabaseurl;
  lsupabasekey = psupabasekey;
  ldebugmode ? console.log('lsupabaseurl: ' + lsupabaseurl) : null;
  ldebugmode ? console.log('lsupabasekey: ' + lsupabasekey) : null;

  if (pinclude == 'yes' && pexclude == 'yes') {
    throw new Error('Include and exclude are both selected. Only one can be applied.');
  }
  linclude = 'no';
  lincludestring = '';
  lexclude = 'no';
  lexcludestring = '';
  linclude = pinclude;
  lincludestring = pincludelist;
  lexclude = pexclude;
  lexcludestring = pexcludelist;

  ldeployall = 'no';
  ldeploysettings = 'no';
  ldeployprofiles = 'no';
  ldeployobjects = 'no';
  ldeployfields = 'no';
  ldeploycpermissions = 'no';
  ldeployactions = 'no';
  ldeploycsql = 'no';
  ldeploypages = 'no';
  ldeployapps = 'no';
  ldeploypermissions = 'no';
  ldeployall = pdeployall;
  ldeploysettings = pdeploysettings;
  ldeployprofiles = pdeployprofiles;
  ldeployobjects = pdeployobjects;
  ldeployfields = pdeployfields;
  ldeploycpermissions = pdeploycpermissions;
  ldeployactions = pdeployactions;
  ldeploycsql = pdeploycsql;
  ldeploypages = pdeploypages;
  ldeployapps = pdeployapps;
  ldeploypermissions = pdeploypermissions;
  ldebugmode ? console.log('ldeployall: ' + ldeployall) : null;
  ldebugmode ? console.log('ldeploysettings: ' + ldeploysettings) : null;

  ldestructall = 'no';
  ldestructsettings = 'no';
  ldestructprofiles = 'no';
  ldestructobjects = 'no';
  ldestructfields = 'no';
  ldestructcpermissions = 'no';
  ldestructactions = 'no';
  ldestructcsql = 'no';
  ldestructpages = 'no';
  ldestructapps = 'no';
  ldestructpermissions = 'no';
  ldestructall = pdestructall;
  ldestructsettings = pdestructsettings;
  ldestructprofiles = pdestructprofiles;
  ldestructobjects = pdestructobjects;
  ldestructfields = pdestructfields;
  ldestructcpermissions = pdestructcpermissions;
  ldestructactions = pdestructactions;
  ldestructcsql = pdestructcsql;
  ldestructpages = pdestructpages;
  ldestructapps = pdestructapps;
  ldestructpermissions = pdestructpermissions;
  ldebugmode ? console.log('ldestructall: ' + ldestructall) : null;
  ldebugmode ? console.log('ldestructsettings: ' + ldestructsettings) : null;

  lsupabaseusername = null;
  lsupabasepassword = null;
  lsupabaseusername = psupabaseusername;
  lsupabasepassword = psupabasepassword;
  ldebugmode ? console.log('lsupabaseusername: ' + lsupabaseusername) : null;
  ldebugmode ? console.log('lsupabasepassword: ' + lsupabasepassword) : null;

  ldeployment = '';
  ldeployment = pdeployment;
  ldeploymentobject = {};
  ldeploymentobject = JSON.parse(ldeployment);
  ldeployitems = [];
  ldestructitems = [];

  if (ldeployment) {
    await login_user();

    console.log('ldeployment: success');
    console.log(ldeployment);
    return ldeployment;
  } else {
    console.log('ldeployment: error');
    console.log(ldeployment);
    return ldeployment;
  }
}

async function login_user() {
  supabase = createClient(lsupabaseurl, lsupabasekey);

  const { data, error } = await supabase.auth.signInWithPassword({
    email: lsupabaseusername,
    password: lsupabasepassword,
  });

  luserid = null;
  lxuserid = null;
  lprofileid = null;
  luserpermissionsetup = null;
  luserpermissionsetuplimited = null;
  luserpermissionsetupdeploy = null;
  if (data && data.user) {
    luserid = data.user.id;
    ldebugmode ? console.log('login_user: success') : null;
    ldebugmode ? console.log(luserid) : null;
    await get_xuser();
  } else {
    console.log('login_user: error');
  }
}

async function get_xuser() {
  try {
    const { data, error } = await supabase
      .from('xusers')
      .select('*')
      .eq('user_id', luserid)
      .eq('is_active', true);

    if (error) throw error;

    if (data !== undefined && data != null && data.length > 0) {
      lxuserid = data[0].id;
      lprofileid = data[0].profile_id;
      ldebugmode ? console.log('get_xuser: success') : null;
      ldebugmode ? console.log(lxuserid) : null;
      ldebugmode ? console.log(lprofileid) : null;
      await get_permission_setup();
    } else {
      console.log('get_xuser: error');
    }
  } catch (error) {
    console.log('get_xuser: error');
    console.log(error);
    throw error;
  } finally {
  }
}

async function get_permission_setup() {
  try {
    const { data, error } = await supabase
      .from('permissions')
      .select('*')
      .eq('profile_id', lprofileid)
      .eq('is_active', true)
      .eq('permission', 'setup');

    if (error) throw error;

    lpermissionsetup = false;
    if (data !== undefined && data != null && data.length > 0) {
      lpermissionsetup = true;
      luserpermissionsetup = data[0].id;
      ldebugmode ? console.log('get_permission_setup: true') : null;
      await get_permission_setup_limited();
    } else {
      ldebugmode ? console.log('get_permission_setup: false') : null;
      await get_permission_setup_limited();
    }
  } catch (error) {
    console.log('get_permission_setup: error');
    console.log(error);
    throw error;
  } finally {
  }
}

async function get_permission_setup_limited() {
  try {
    const { data, error } = await supabase
      .from('permissions')
      .select('*')
      .eq('profile_id', lprofileid)
      .eq('is_active', true)
      .eq('permission', 'setuplimited');

    if (error) throw error;

    lpermissionsetuplimited = false;
    if (data !== undefined && data != null && data.length > 0) {
      lpermissionsetuplimited = true;
      luserpermissionsetuplimited = data[0].id;
      ldebugmode ? console.log('get_permission_setup_limited: true') : null;
      await get_permission_deploy();
    } else {
      ldebugmode ? console.log('get_permission_setup_limited: false') : null;
      await get_permission_deploy();
    }
  } catch (error) {
    console.log('get_permission_setup_limited: error');
    console.log(error);
    throw error;
  } finally {
  }
}

async function get_permission_deploy() {
  try {
    const { data, error } = await supabase
      .from('permissions')
      .select('*')
      .eq('profile_id', lprofileid)
      .eq('is_active', true)
      .eq('permission', 'deploy.setup');

    if (error) throw error;

    lpermissiondeploy = false;
    if (data !== undefined && data != null && data.length > 0) {
      lpermissiondeploy = true;
      luserpermissionsetupdeploy = data[0].id;
      ldebugmode ? console.log('get_permission_deploy: true') : null;
      await check_permission();
    } else {
      ldebugmode ? console.log('get_permission_deploy: false') : null;
      await check_permission();
    }
  } catch (error) {
    console.log('get_permission_deploy: error');
    console.log(error);
    throw error;
  } finally {
  }
}

async function check_permission() {
  if (lpermissionsetup || (lpermissionsetuplimited && lpermissiondeploy)) {
    ldebugmode ? console.log('check_permission: allowed') : null;
    await create_history();
  } else {
    console.log('check_permission: NOT allowed');
    throw 'error: NOT ALLOWED';
  }
}

async function create_history() {
  try {
    let lrecord = {};
    let lid = uuidv4();
    lrecord['id'] = lid;
    lrecord['parent_id'] = lid;
    lrecord['changed_by'] = lxuserid;
    lrecord['action'] =
      'DEPLOY:' +
      'deployall=' +
      ldeployall +
      ';' +
      'deploysettings=' +
      ldeploysettings +
      ';' +
      'deployprofiles=' +
      ldeployprofiles +
      ';' +
      'deployobjects=' +
      ldeployobjects +
      ';' +
      'deployfields=' +
      ldeployfields +
      ';' +
      'deploycpermissions=' +
      ldeploycpermissions +
      ';' +
      'deployactions=' +
      ldeployactions +
      ';' +
      'deploycsql=' +
      ldeploycsql +
      ';' +
      'deploypages=' +
      ldeploypages +
      ';' +
      'deployapps=' +
      ldeployapps +
      ';' +
      'deploypermissions=' +
      ldeploypermissions +
      ';' +
      'destructall=' +
      ldestructall +
      ';' +
      'destructsettings=' +
      ldestructsettings +
      ';' +
      'destructprofiles=' +
      ldestructprofiles +
      ';' +
      'destructobjects=' +
      ldestructobjects +
      ';' +
      'destructfields=' +
      ldestructfields +
      ';' +
      'destructcpermissions=' +
      ldestructcpermissions +
      ';' +
      'destructactions=' +
      ldestructactions +
      ';' +
      'destructcsql=' +
      ldestructcsql +
      ';' +
      'destructpages=' +
      ldestructpages +
      ';' +
      'destructapps=' +
      ldestructapps +
      ';' +
      'destructpermissions=' +
      ldestructpermissions +
      ';';
    lrecord['oldrecord'] = JSON.parse('{}');
    lrecord['newrecord'] = JSON.parse(ldeployment);

    const { data, error } = await supabase.from('i_deploy').insert(lrecord).select();

    if (error) throw error;

    if (data !== undefined && data != null && data.length > 0) {
      ldebugmode ? console.log('create_history: success') : null;
      await get_deploy();
    } else {
      ldebugmode ? console.log('create_history: error no rows') : null;
    }
  } catch (error) {
    console.log('create_history: error');
    console.log(error);
    throw error;
  } finally {
  }
}

async function get_deploy() {
  ldeployment = {};
  ldeployitems = [];

  if (ldeployall == 'yes' || ldeploysettings == 'yes') {
    ldeployitems.push('settings');
  }
  if (ldeployall == 'yes' || ldeployprofiles == 'yes') {
    ldeployitems.push('profiles');
  }
  if (ldeployall == 'yes' || ldeployobjects == 'yes') {
    ldeployitems.push('objects');
  }
  if (ldeployall == 'yes' || ldeployfields == 'yes') {
    ldeployitems.push('fields');
  }
  if (ldeployall == 'yes' || ldeploycpermissions == 'yes') {
    ldeployitems.push('cpermissions');
  }
  if (ldeployall == 'yes' || ldeployactions == 'yes') {
    ldeployitems.push('actions');
  }
  if (ldeployall == 'yes' || ldeploycsql == 'yes') {
    ldeployitems.push('csql');
  }
  if (ldeployall == 'yes' || ldeploypages == 'yes') {
    ldeployitems.push('pages');
  }
  if (ldeployall == 'yes' || ldeployapps == 'yes') {
    ldeployitems.push('apps');
  }
  if (ldeployall == 'yes' || ldeploypermissions == 'yes') {
    ldeployitems.push('permissions');
  }

  // ldeploymentobject = {};
  // ldeploymentobject = JSON.parse(ldeployment);
  for (let i = 0; i < ldeployitems.length; i++) {
    await deploy_items(ldeployitems[i]);
  }

  ldebugmode ? console.log('get_deploy: success') : null;
  await get_destruct();
}

async function deploy_items(pitem) {
  try {
    let mexisitingpermissions = {};
    let data = null;
    let error = null;
    if (pitem == 'permissions') {
      ({ data, error } = await supabase.from('permissions').select('*'));

      if (error) throw error;

      if (data !== undefined && data != null && data.length > 0) {
        for (let j = 0; j < data.length; j++) {
          mexisitingpermissions[data[j].profile_id + ';' + data[j].permission] = data[j].id;
        }
      }
    }

    data = null;
    error = null;
    if (ldeploymentobject[pitem] && ldeploymentobject[pitem].length > 0) {
      let mobjectjson = JSON.parse(JSON.stringify(ldeploymentobject[pitem]));
      for (let i = 0; i < mobjectjson.length; i++) {
        delete mobjectjson[i].created_at;
        delete mobjectjson[i].created_by;
        if (
          pitem == 'permissions' &&
          (mobjectjson[i].permission == 'show.apps' ||
            mobjectjson[i].permission == 'show.history' ||
            mobjectjson[i].permission == 'show.mfa' ||
            mobjectjson[i].permission == 'show.objects' ||
            mobjectjson[i].permission == 'show.pages')
        ) {
          if (
            mexisitingpermissions[mobjectjson[i].profile_id + ';' + mobjectjson[i].permission] !=
              null &&
            mexisitingpermissions[mobjectjson[i].profile_id + ';' + mobjectjson[i].permission] !==
              undefined
          ) {
            mobjectjson[i].id =
              mexisitingpermissions[mobjectjson[i].profile_id + ';' + mobjectjson[i].permission];
          } else {
            mobjectjson.splice(i, 1);
            i--;
          }
        }
      }

      // include exclude
      let almostfinaldata = mobjectjson;
      let filtereddata = [];
      let finaldata = [];
      if (linclude == 'yes') {
        let lincludelist = lincludestring.split(';');
        let includeitem = false;
        for (let i = 0; i < almostfinaldata.length; i++) {
          for (let j = 0; j < lincludelist.length; j++) {
            if (almostfinaldata[i].id == lincludelist[j]) {
              includeitem = true;
            }
          }
          if (includeitem) {
            filtereddata.push(almostfinaldata[i]);
          }
          includeitem = false;
        }
        finaldata = filtereddata;
      } else if (lexclude == 'yes') {
        let lexcludelist = lexcludestring.split(';');
        let excludeitem = false;
        for (let i = 0; i < almostfinaldata.length; i++) {
          for (let j = 0; j < lexcludelist.length; j++) {
            if (almostfinaldata[i].id == lexcludelist[j]) {
              excludeitem = true;
            }
          }
          if (!excludeitem) {
            filtereddata.push(almostfinaldata[i]);
          }
          excludeitem = false;
        }
        finaldata = filtereddata;
      } else {
        finaldata = almostfinaldata;
      }
      ({ data, error } = await supabase.from(pitem).upsert(finaldata).select());
    }

    if (error) throw error;

    if (data !== undefined && data != null && data.length > 0) {
      ldebugmode ? console.log('deploy_' + pitem + ': success with rows') : null;
    } else {
      ldebugmode ? console.log('deploy_' + pitem + ': success no rows') : null;
    }
  } catch (error) {
    console.log('deploy_' + pitem + ': error');
    console.log(error);
    throw error;
  } finally {
  }
}

async function get_destruct() {
  ldestructitems = [];
  if (ldestructall == 'yes' || ldestructsettings == 'yes') {
    ldestructitems.push('settings');
  }
  if (ldestructall == 'yes' || ldestructprofiles == 'yes') {
    ldestructitems.push('profiles');
  }
  if (ldestructall == 'yes' || ldestructfields == 'yes') {
    ldestructitems.push('fields');
  }
  if (ldestructall == 'yes' || ldestructobjects == 'yes') {
    ldestructitems.push('objects');
  }
  if (ldestructall == 'yes' || ldestructcpermissions == 'yes') {
    ldestructitems.push('cpermissions');
  }
  if (ldestructall == 'yes' || ldestructactions == 'yes') {
    ldestructitems.push('actions');
  }
  if (ldestructall == 'yes' || ldestructcsql == 'yes') {
    ldestructitems.push('csql');
  }
  if (ldestructall == 'yes' || ldestructpages == 'yes') {
    ldestructitems.push('pages');
  }
  if (ldestructall == 'yes' || ldestructapps == 'yes') {
    ldestructitems.push('apps');
  }
  if (ldestructall == 'yes' || ldestructpermissions == 'yes') {
    ldestructitems.push('permissions');
  }

  for (let i = 0; i < ldestructitems.length; i++) {
    await destruct_item(ldestructitems[i]);
  }
  ldebugmode ? console.log('get_destruct: success') : null;
}

async function destruct_item(pitem) {
  let mdeployids = [];
  let mldeploymentobjectitems = ldeploymentobject[pitem];
  if (mldeploymentobjectitems) {
    for (let i = 0; i < mldeploymentobjectitems.length; i++) {
      mdeployids.push(mldeploymentobjectitems[i]['id']);
    }
  }
  let mdeleteids = [];
  try {
    let data;
    let error;
    if (mldeploymentobjectitems) {
      ({ data, error } = await supabase
        .from(pitem)
        .select()
        .not('id', 'in', `(${mdeployids.join(',')})`));
    } else {
      ({ data, error } = await supabase.from(pitem).select());
    }

    if (error) throw error;

    if (data !== undefined && data != null && data.length > 0) {
      for (let j = 0; j < data.length; j++) {
        // settings: 1d658364-33b2-4e73-93cc-3359cd9ef2a6,cd700b62-11e1-4664-bfe9-96a8ff376a59
        // profiles: cc2e9937-e7db-4853-b66e-68a606bbce93,43bf8fe6-9add-4ff4-b759-f8e1445f5914
        // objects: abfe9125-deb6-4d0f-8bc5-9d2d0700f413
        // fields: 03b07e91-bc04-4563-a080-ee8bce371c13,3fa00d30-52e3-414b-9fbe-c6a2cc6b1638,fd097deb-93da-45bc-b8a9-79e3bac670c4
        // permissions: c86000db-2c0e-4a27-bf2d-7d44073c2d31

        // dev: 17e4aa7d-dd8c-4923-84ea-7ba73d16641a,bba318fb-2af2-4c8a-83e7-bb0a2f3cb886
        if (
          data[j].id != '1d658364-33b2-4e73-93cc-3359cd9ef2a6' &&
          data[j].id != 'cd700b62-11e1-4664-bfe9-96a8ff376a59' &&
          data[j].id != 'cc2e9937-e7db-4853-b66e-68a606bbce93' &&
          data[j].id != '43bf8fe6-9add-4ff4-b759-f8e1445f5914' &&
          data[j].id != 'abfe9125-deb6-4d0f-8bc5-9d2d0700f413' &&
          data[j].id != '03b07e91-bc04-4563-a080-ee8bce371c13' &&
          data[j].id != '3fa00d30-52e3-414b-9fbe-c6a2cc6b1638' &&
          data[j].id != 'fd097deb-93da-45bc-b8a9-79e3bac670c4' &&
          data[j].id != 'c86000db-2c0e-4a27-bf2d-7d44073c2d31'
        ) {
          if (
            data[j].id != luserid &&
            data[j].id != lxuserid &&
            data[j].id != lprofileid &&
            data[j].id != luserpermissionsetup &&
            data[j].id != luserpermissionsetuplimited &&
            data[j].id != luserpermissionsetupdeploy
          )
            if (
              !(
                pitem == 'permissions' &&
                (data[j].permission == 'show.apps' ||
                  data[j].permission == 'show.history' ||
                  data[j].permission == 'show.mfa' ||
                  data[j].permission == 'show.objects' ||
                  data[j].permission == 'show.pages')
              )
            ) {
              mdeleteids.push(data[j].id);
            }
        }
      }

      try {
        const { data1, error1 } = await supabase.from(pitem).delete().in('id', mdeleteids);
        if (error1) throw error1;
        ldebugmode ? console.log('destruct_' + pitem + ': success with rows') : null;
      } catch (error1) {
        console.log('destruct_' + pitem + ': error');
        console.log(error);
        throw error;
      } finally {
      }
    } else {
      ldebugmode ? console.log('destruct_' + pitem + ': success no rows') : null;
    }
  } catch (error) {
    console.log('destruct_' + pitem + ': error');
    console.log(error);
    throw error;
  } finally {
  }
}

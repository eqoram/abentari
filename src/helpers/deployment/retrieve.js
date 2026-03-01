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

let lretrieveall = 'no';
let lretrievesettings = 'no';
let lretrieveprofiles = 'no';
let lretrieveobjects = 'no';
let lretrievefields = 'no';
let lretrievecpermissions = 'no';
let lretrieveactions = 'no';
let lretrievecsql = 'no';
let lretrievepages = 'no';
let lretrieveapps = 'no';
let lretrievepermissions = 'no';

let luserid = null;
let lxuserid = null;
let lprofileid = null;
let lpermissionsetup = false;
let lpermissionsetuplimited = false;
let lpermissionretrieve = false;

let lreturn = {};
let litems = [];

if (lrunscript == 'yes') {
  console.log('retrieve: start');

  try {
    run_retrieve(
      process.env.PDEBUG,
      process.env.PSUPABASEURL,
      process.env.PSUPABASEKEY,
      process.env.PSUPABASEUSERNAME,
      process.env.PSUPABASEPASSWORD,
      process.env.PINCLUDE,
      process.env.PINCLUDELIST,
      process.env.PEXCLUDE,
      process.env.PEXCLUDELIST,
      process.env.PRETRIEVEALL,
      process.env.PRETRIEVESETTINGS,
      process.env.PRETRIEVEPROFILES,
      process.env.PRETRIEVEOBJECTS,
      process.env.PRETRIEVEFIELDS,
      process.env.PRETRIEVECPERMISSIONS,
      process.env.PRETRIEVEactionS,
      process.env.PRETRIEVECSQL,
      process.env.PRETRIEVEPAGES,
      process.env.PRETRIEVEAPPS,
      process.env.PRETRIEVEPERMISSIONS,
    );
  } catch (e) {
    console.log('error');
  }
}

export async function run_retrieve(
  pdebug,
  psupabaseurl,
  psupabasekey,
  psupabaseusername,
  psupabasepassword,
  pinclude,
  pincludelist,
  pexclude,
  pexcludelist,
  pretrieveall,
  pretrievesettings,
  pretrieveprofiles,
  pretrieveobjects,
  pretrievefields,
  pretrievecpermissions,
  pretrieveactions,
  pretrievecsql,
  pretrievepages,
  pretrieveapps,
  pretrievepermissions,
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

  lretrieveall = 'no';
  lretrievesettings = 'no';
  lretrieveprofiles = 'no';
  lretrieveobjects = 'no';
  lretrievefields = 'no';
  lretrievecpermissions = 'no';
  lretrieveactions = 'no';
  lretrievecsql = 'no';
  lretrievepages = 'no';
  lretrieveapps = 'no';
  lretrievepermissions = 'no';
  lretrieveall = pretrieveall;
  lretrievesettings = pretrievesettings;
  lretrieveprofiles = pretrieveprofiles;
  lretrieveobjects = pretrieveobjects;
  lretrievefields = pretrievefields;
  lretrievecpermissions = pretrievecpermissions;
  lretrieveactions = pretrieveactions;
  lretrievecsql = pretrievecsql;
  lretrievepages = pretrievepages;
  lretrieveapps = pretrieveapps;
  lretrievepermissions = pretrievepermissions;
  ldebugmode ? console.log('lretrieveall: ' + lretrieveall) : null;
  ldebugmode ? console.log('lretrievesettings: ' + lretrievesettings) : null;

  lsupabaseusername = null;
  lsupabasepassword = null;
  lsupabaseusername = psupabaseusername;
  lsupabasepassword = psupabasepassword;
  ldebugmode ? console.log('lsupabaseusername: ' + lsupabaseusername) : null;
  ldebugmode ? console.log('lsupabasepassword: ' + lsupabasepassword) : null;

  lreturn = {};
  litems = [];

  await login_user();

  console.log('lreturn: success');
  console.log(lreturn);
  return JSON.stringify(lreturn);
}

async function login_user() {
  supabase = createClient(lsupabaseurl, lsupabasekey);

  const { data, error } = await supabase.auth.signInWithPassword({
    email: lsupabaseusername,
    password: lsupabasepassword,
  });

  luserid = null;
  lxuserid = null;
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
      ldebugmode ? console.log('get_permission_setup_limited: true') : null;
      await get_permission_retrieve();
    } else {
      ldebugmode ? console.log('get_permission_setup_limited: false') : null;
      await get_permission_retrieve();
    }
  } catch (error) {
    console.log('get_permission_setup_limited: error');
    console.log(error);
    throw error;
  } finally {
  }
}

async function get_permission_retrieve() {
  try {
    const { data, error } = await supabase
      .from('permissions')
      .select('*')
      .eq('profile_id', lprofileid)
      .eq('is_active', true)
      .eq('permission', 'retrieve.setup');

    if (error) throw error;

    lpermissionretrieve = false;
    if (data !== undefined && data != null && data.length > 0) {
      lpermissionretrieve = true;
      ldebugmode ? console.log('get_permission_retrieve: true') : null;
      await check_permission();
    } else {
      ldebugmode ? console.log('get_permission_retrieve: false') : null;
      await check_permission();
    }
  } catch (error) {
    console.log('get_permission_retrieve: error');
    console.log(error);
    throw error;
  } finally {
  }
}

async function check_permission() {
  if (lpermissionsetup || (lpermissionsetuplimited && lpermissionretrieve)) {
    ldebugmode ? console.log('check_permission: allowed') : null;
    await get_retrieve();
  } else {
    console.log('check_permission: NOT allowed');
    throw 'error: NOT ALLOWED';
  }
}

async function get_retrieve() {
  lreturn = {};
  litems = [];

  if (lretrieveall == 'yes' || lretrievesettings == 'yes') {
    litems.push('settings');
  }
  if (lretrieveall == 'yes' || lretrieveprofiles == 'yes') {
    litems.push('profiles');
  }
  if (lretrieveall == 'yes' || lretrieveobjects == 'yes') {
    litems.push('objects');
  }
  if (lretrieveall == 'yes' || lretrievefields == 'yes') {
    litems.push('fields');
  }
  if (lretrieveall == 'yes' || lretrievecpermissions == 'yes') {
    litems.push('cpermissions');
  }
  if (lretrieveall == 'yes' || lretrieveactions == 'yes') {
    litems.push('actions');
  }
  if (lretrieveall == 'yes' || lretrievecsql == 'yes') {
    litems.push('csql');
  }
  if (lretrieveall == 'yes' || lretrievepages == 'yes') {
    litems.push('pages');
  }
  if (lretrieveall == 'yes' || lretrieveapps == 'yes') {
    litems.push('apps');
  }
  if (lretrieveall == 'yes' || lretrievepermissions == 'yes') {
    litems.push('permissions');
  }

  for (let i = 0; i < litems.length; i++) {
    await get_items(litems[i]);
  }

  ldebugmode ? console.log('get_retrieve: success') : null;
  await create_history();
}

async function get_items(pitem) {
  try {
    const { data, error } = await supabase.from(pitem).select('*');

    if (error) throw error;

    if (data !== undefined && data != null && data.length > 0) {
      let filtereddata = [];
      if (linclude == 'yes') {
        let lincludelist = lincludestring.split(';');
        let includeitem = false;
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < lincludelist.length; j++) {
            if (data[i].id == lincludelist[j]) {
              includeitem = true;
            }
          }
          if (includeitem) {
            filtereddata.push(data[i]);
          }
          includeitem = false;
        }
        if (filtereddata.length > 0) {
          lreturn[pitem] = filtereddata;
        }
      } else if (lexclude == 'yes') {
        let lexcludelist = lexcludestring.split(';');
        let excludeitem = false;
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < lexcludelist.length; j++) {
            if (data[i].id == lexcludelist[j]) {
              excludeitem = true;
            }
          }
          if (!excludeitem) {
            filtereddata.push(data[i]);
          }
          excludeitem = false;
        }
        if (filtereddata.length > 0) {
          lreturn[pitem] = filtereddata;
        }
      } else {
        lreturn[pitem] = data;
      }
      ldebugmode ? console.log('get_' + pitem + ': success with rows') : null;
    } else {
      ldebugmode ? console.log('get_' + pitem + ': success no rows') : null;
    }
  } catch (error) {
    console.log('get_' + pitem + ': error');
    console.log(error);
    throw error;
  } finally {
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
      'RETRIEVE:' +
      'retrieveall=' +
      lretrieveall +
      ';' +
      'retrievesettings=' +
      lretrievesettings +
      ';' +
      'retrieveprofiles=' +
      lretrieveprofiles +
      ';' +
      'retrieveobjects=' +
      lretrieveobjects +
      ';' +
      'retrievefields=' +
      lretrievefields +
      ';' +
      'retrievecpermissions=' +
      lretrievecpermissions +
      ';' +
      'retrieveactions=' +
      lretrieveactions +
      ';' +
      'retrievecsql=' +
      lretrievecsql +
      ';' +
      'retrievepages=' +
      lretrievepages +
      ';' +
      'retrieveapps=' +
      lretrieveapps +
      ';' +
      'retrievepermissions=' +
      lretrievepermissions +
      ';';
    lrecord['oldrecord'] = JSON.parse('{}');
    lrecord['newrecord'] = lreturn;

    const { data, error } = await supabase.from('i_retrieve').insert(lrecord).select();

    if (error) throw error;

    if (data !== undefined && data != null && data.length > 0) {
      ldebugmode ? console.log('create_history: success') : null;
    } else {
      ldebugmode ? console.log('create_history: error no rows') : null;
    }
  } catch (error) {
    console.log('create_history: error');
    console.log(error);
    throw error;
  } finally {
  }
  ldebugmode ? console.log('create_history: success') : null;
  ldebugmode ? console.log('create_history: lreturn') : null;
  ldebugmode ? console.log(JSON.stringify(lreturn)) : null;
}

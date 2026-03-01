import { test, expect } from '@playwright/test';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabase;

export async function securityLogin(puseremail, puserpassword) {
  if (!supabase) {
    supabase = await createClient(process.env.PSUPABASEURL, process.env.PSUPABASEKEY);
  }

  await supabase.auth.signInWithPassword({
    email: puseremail,
    password: puserpassword,
  });

  const { data, error } = await supabase.auth.getSession();

  if (error) throw error;

  let luserid;
  if (data != null && data.session != null) {
    luserid = data.session.user.id;
  }

  return luserid;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function createPermission(
  padminemail,
  padminpassword,
  puseremail,
  puserpassword,
  pprofileid,
  ppermissionname,
) {
  let luserid = await securityLogin(padminemail, padminpassword);

  let ldata = [
    {
      permission: ppermissionname,
      profile_id: pprofileid,
      is_active: true,
    },
  ];

  var { data, error } = await supabase.from('permissions').insert(ldata);

  await supabase.auth.signOut();
}

export async function deletePermissions(
  padminemail,
  padminpassword,
  puseremail,
  puserpassword,
  pprofileid,
) {
  let luserid = await securityLogin(padminemail, padminpassword);

  const arr = ['show.apps', 'show.history', 'show.mfa', 'show.objects', 'show.pages'];

  const formatted = arr.map((a) => `"${a}"`).join(',');
  var { data, error } = await supabase
    .from('permissions')
    .delete()
    .filter('permission', 'not.in', `(${formatted})`)
    .eq('profile_id', pprofileid);
}

export async function createObject(
  puseremail,
  puserpassword,
  pid,
  papiname,
  pname,
  ppermission,
  ppermissionname,
  pfile,
  pfileid,
  pfileapiname,
  pfilename,
  pfileparentid,
) {
  let luserid = await securityLogin(puseremail, puserpassword);

  let ldata = [
    {
      id: pid,
      name: pname,
      api_name: papiname,
    },
  ];

  var { data, error } = await supabase.from('objects').insert(ldata);

  await sleep(2000);

  let ldata1 = [
    {
      owner_id: luserid,
      name: 'pre1',
    },
    {
      owner_id: luserid,
      name: 'pre2',
    },
  ];

  // eslint-disable-next-line no-redeclare
  var { data, error } = await supabase.from(papiname).insert(ldata1);

  if (ppermission == 'yes') {
    let ldata2 = [
      {
        permission: ppermissionname + 'select',
        profile_id: '26c7320f-49af-4cb2-a1a5-197669492ed8',
        is_active: true,
      },
      {
        permission: ppermissionname + 'insert',
        profile_id: '26c7320f-49af-4cb2-a1a5-197669492ed8',
        is_active: true,
      },
      {
        permission: ppermissionname + 'update',
        profile_id: '26c7320f-49af-4cb2-a1a5-197669492ed8',
        is_active: true,
      },
      {
        permission: ppermissionname + 'delete',
        profile_id: '26c7320f-49af-4cb2-a1a5-197669492ed8',
        is_active: true,
      },
    ];

    // eslint-disable-next-line no-redeclare
    var { data, error } = await supabase.from('permissions').insert(ldata2);
  }

  if (pfile == 'yes') {
    let ldata3 = [
      {
        id: pfileid,
        api_name: pfileapiname,
        name: pfilename,
        parent_id: pfileparentid,
        type: 'file',
        required: false,
      },
    ];

    // eslint-disable-next-line no-redeclare
    var { data, error } = await supabase.from('fields').insert(ldata3);

    let ldata4 = [
      {
        id: pid,
        name: pname,
        api_name: papiname,
        fields_selected: [pfileid],
      },
    ];

    // eslint-disable-next-line no-redeclare
    var { data, error } = await supabase.from('objects').update(ldata4).eq('id', pid);
  }

  await supabase.auth.signOut();

  let lsuccess;
  if (error) {
    lsuccess = false;
  } else {
    lsuccess = true;
  }

  return lsuccess;
}

export async function securitySelect(puseremail, puserpassword, ptable, punauth) {
  if (!supabase) {
    supabase = await createClient(process.env.PSUPABASEURL, process.env.PSUPABASEKEY);
  }

  let luserid;
  if (punauth == 'yes') {
    await supabase.auth.signOut();
  } else {
    luserid = await securityLogin(puseremail, puserpassword);
  }

  const { data, error } = await supabase.from(ptable).select();

  await supabase.auth.signOut();

  return data;
}

export async function securityInsert(puseremail, puserpassword, ptable, pvalue, pownerid, punauth) {
  let luserid;
  if (punauth == 'yes') {
    await supabase.auth.signOut();
  } else {
    luserid = await securityLogin(puseremail, puserpassword);
  }

  let lownerid;
  if (pownerid) {
    lownerid = pownerid;
  } else {
    lownerid = luserid;
  }

  let ldata = [
    {
      owner_id: lownerid,
      name: pvalue,
    },
  ];

  const { data, error } = await supabase.from(ptable).insert(ldata);

  await supabase.auth.signOut();

  let lsuccess;
  if (error) {
    lsuccess = false;
  } else {
    lsuccess = true;
  }

  return lsuccess;
}

export async function securityUpdate(
  padminemail,
  padminpassword,
  puseremail,
  puserpassword,
  ptable,
  pname,
  pvalue,
  pownerid,
  punauth,
) {
  let luserid;
  if (punauth == 'yes') {
    await supabase.auth.signOut();
  } else {
    luserid = await securityLogin(puseremail, puserpassword);
  }

  let lownerid;
  if (pownerid) {
    lownerid = pownerid;
  } else {
    lownerid = luserid;
  }

  let ldata = [
    {
      owner_id: lownerid,
      name: pvalue,
    },
  ];

  var { data, error } = await supabase.from(ptable).select().eq('name', pname);
  if (data.length == 0) {
    return false;
  }

  // eslint-disable-next-line no-redeclare
  var { data, error } = await supabase.from(ptable).update(ldata).eq('name', pname);

  await supabase.auth.signOut();

  // assert
  let ladminid = await securityLogin(padminemail, padminpassword);

  // eslint-disable-next-line no-redeclare
  var { data, error } = await supabase.from(ptable).select().eq('name', pvalue);

  let lsuccess;
  if (data && data.length > 0) {
    lsuccess = true;
  } else {
    lsuccess = false;
  }

  return lsuccess;
}

export async function securityDelete(
  padminemail,
  padminpassword,
  puseremail,
  puserpassword,
  ptable,
  pvalue,
  punauth,
) {
  let luserid;
  if (punauth == 'yes') {
    await supabase.auth.signOut();
  } else {
    luserid = await securityLogin(puseremail, puserpassword);
  }

  var { data, error } = await supabase.from(ptable).select().eq('name', pvalue);
  if (data.length == 0) {
    return false;
  }

  // eslint-disable-next-line no-redeclare
  var { data, error } = await supabase.from(ptable).delete().eq('name', pvalue);

  await supabase.auth.signOut();

  // assert
  let ladminid = await securityLogin(padminemail, padminpassword);

  // eslint-disable-next-line no-redeclare
  var { data, error } = await supabase.from(ptable).select().eq('name', pvalue);

  let lsuccess;
  if (data.length > 0) {
    lsuccess = false;
  } else {
    lsuccess = true;
  }

  return lsuccess;
}

export async function deleteObject(puseremail, puserpassword, papiname) {
  let luserid = await securityLogin(puseremail, puserpassword);

  var { data, error } = await supabase.from('objects').delete().eq('api_name', papiname);

  await supabase.auth.signOut();

  let lsuccess;
  if (error) {
    lsuccess = false;
  } else {
    lsuccess = true;
  }

  return lsuccess;
}

export async function uploadFile(
  padminemail,
  padminpassword,
  puseremail,
  puserpassword,
  punauth,
  pdirectoryname,
  pfilename,
  pdebug,
) {
  let luserid;
  if (punauth == 'yes') {
    await supabase.auth.signOut();
  } else {
    luserid = await securityLogin(puseremail, puserpassword);
  }

  // await sleep(2000);

  const lblob = new Blob(['Hello, Supabase Blob!'], { type: 'text/plain' });
  const lfile = new File([lblob], 'blobfile.txt');

  const { data, error } = await supabase.storage
    .from('storage1')
    .upload(pdirectoryname + pfilename, lfile, {
      cacheControl: '0',
      upsert: false,
    });

  if (pdebug == 'yes') {
    console.log('n1');
    console.log(luserid);
    console.log(pdirectoryname + pfilename);
    console.log(data);
    console.log(error);
  }

  let lsuccess;
  if (error) {
    lsuccess = false;
  } else {
    lsuccess = true;
  }

  return lsuccess;
}

export async function downloadFile(
  padminemail,
  padminpassword,
  puseremail,
  puserpassword,
  punauth,
  pdirectoryname,
  pfilename,
) {
  let luserid;
  if (punauth == 'yes') {
    await supabase.auth.signOut();
  } else {
    luserid = await securityLogin(puseremail, puserpassword);
  }

  const lblob = new Blob(['Hello, Supabase Blob!'], { type: 'text/plain' });
  const lfile = new File([lblob], 'blobfile.txt');

  const { data, error } = await supabase.storage
    .from('storage1')
    .download(pdirectoryname + pfilename);

  // console.log('n2');
  // console.log(luserid);
  // console.log(pdirectoryname + pfilename);
  // console.log(data);
  // console.log(error);

  let lsuccess;
  if (error) {
    lsuccess = false;
  } else {
    lsuccess = true;
  }

  return lsuccess;
}

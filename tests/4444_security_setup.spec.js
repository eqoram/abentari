import { test, expect } from '@playwright/test';
import {
  setupConfig,
  supabaseLogin,
  supabaseCreatePermission,
  supabaseDeletePermissions,
  supabaseEnableMFA,
  supabaseDisableMFA,
  supabaseInsert,
  supabaseSelect,
  supabaseUpdate,
  supabaseDelete,
  supabaseUpdateALL,
  supabaseDeleteALL,
} from './helperSupabase.js';

//#region test
test('4444', async ({ page }) => {
  test.setTimeout(600000); // 60s
  for (let i = 0; i < setupConfig.length; i++) {
    if (setupConfig[i]['run']) {
      console.log('4444: ' + setupConfig[i]['name']);
      // insert
      if (
        setupConfig[i]['tests']['insert_admin'] &&
        setupConfig[i]['tests']['insert_admin']['run']
      ) {
        console.log('insert_admin');
        await insert_admin(setupConfig[i]['tests']['insert_admin']['parameters']);
      }
      if (
        setupConfig[i]['tests']['insert_setuplimitedwithpermission'] &&
        setupConfig[i]['tests']['insert_setuplimitedwithpermission']['run']
      ) {
        console.log('insert_setuplimitedwithpermission');
        await insert_setuplimitedwithpermission(
          setupConfig[i]['tests']['insert_setuplimitedwithpermission']['parameters'],
        );
      }
      if (
        setupConfig[i]['tests']['insert_setuplimitedwithoutpermission'] &&
        setupConfig[i]['tests']['insert_setuplimitedwithoutpermission']['run']
      ) {
        console.log('insert_setuplimitedwithoutpermission');
        await insert_setuplimitedwithoutpermission(
          setupConfig[i]['tests']['insert_setuplimitedwithoutpermission']['parameters'],
        );
      }
      if (
        setupConfig[i]['tests']['insert_userwithpermission'] &&
        setupConfig[i]['tests']['insert_userwithpermission']['run']
      ) {
        console.log('insert_userwithpermission');
        await insert_userwithpermission(
          setupConfig[i]['tests']['insert_userwithpermission']['parameters'],
        );
      }
      if (
        setupConfig[i]['tests']['insert_userwithoutpermission'] &&
        setupConfig[i]['tests']['insert_userwithoutpermission']['run']
      ) {
        console.log('insert_userwithoutpermission');
        await insert_userwithoutpermission(
          setupConfig[i]['tests']['insert_userwithoutpermission']['parameters'],
        );
      }
      if (
        setupConfig[i]['tests']['insert_unauthwithpermission'] &&
        setupConfig[i]['tests']['insert_unauthwithpermission']['run']
      ) {
        console.log('insert_unauthwithpermission');
        await insert_unauthwithpermission(
          setupConfig[i]['tests']['insert_unauthwithpermission']['parameters'],
        );
      }
      if (
        setupConfig[i]['tests']['insert_unauthwithoutpermission'] &&
        setupConfig[i]['tests']['insert_unauthwithoutpermission']['run']
      ) {
        console.log('insert_unauthwithoutpermission');
        await insert_unauthwithoutpermission(
          setupConfig[i]['tests']['insert_unauthwithoutpermission']['parameters'],
        );
      }
      if (
        setupConfig[i]['tests']['insert_useradmin'] &&
        setupConfig[i]['tests']['insert_useradmin']['run']
      ) {
        console.log('insert_useradmin');
        await insert_useradmin(setupConfig[i]['tests']['insert_useradmin']['parameters']);
      }
      if (
        setupConfig[i]['tests']['insert_useradminmfa'] &&
        setupConfig[i]['tests']['insert_useradminmfa']['run']
      ) {
        console.log('insert_useradminmfa');
        await insert_useradminmfa(setupConfig[i]['tests']['insert_useradminmfa']['parameters']);
      }
      // select
      if (
        setupConfig[i]['tests']['select_admin'] &&
        setupConfig[i]['tests']['select_admin']['run']
      ) {
        console.log('select_admin');
        await select_admin(setupConfig[i]['tests']['select_admin']['parameters']);
      }
      if (
        setupConfig[i]['tests']['select_setuplimitedwithpermission'] &&
        setupConfig[i]['tests']['select_setuplimitedwithpermission']['run']
      ) {
        console.log('select_setuplimitedwithpermission');
        await select_setuplimitedwithpermission(
          setupConfig[i]['tests']['select_setuplimitedwithpermission']['parameters'],
        );
      }
      if (
        setupConfig[i]['tests']['select_setuplimitedwithoutpermission'] &&
        setupConfig[i]['tests']['select_setuplimitedwithoutpermission']['run']
      ) {
        console.log('select_setuplimitedwithoutpermission');
        await select_setuplimitedwithoutpermission(
          setupConfig[i]['tests']['select_setuplimitedwithoutpermission']['parameters'],
        );
      }
      if (
        setupConfig[i]['tests']['select_userwithpermission'] &&
        setupConfig[i]['tests']['select_userwithpermission']['run']
      ) {
        console.log('select_userwithpermission');
        await select_userwithpermission(
          setupConfig[i]['tests']['select_userwithpermission']['parameters'],
        );
      }
      if (
        setupConfig[i]['tests']['select_userwithoutpermission'] &&
        setupConfig[i]['tests']['select_userwithoutpermission']['run']
      ) {
        console.log('select_userwithoutpermission');
        await select_userwithoutpermission(
          setupConfig[i]['tests']['select_userwithoutpermission']['parameters'],
        );
      }
      if (
        setupConfig[i]['tests']['select_unauthwithpermission'] &&
        setupConfig[i]['tests']['select_unauthwithpermission']['run']
      ) {
        console.log('select_unauthwithpermission');
        await select_unauthwithpermission(
          setupConfig[i]['tests']['select_unauthwithpermission']['parameters'],
        );
      }
      if (
        setupConfig[i]['tests']['select_unauthwithoutpermission'] &&
        setupConfig[i]['tests']['select_unauthwithoutpermission']['run']
      ) {
        console.log('select_unauthwithoutpermission');
        await select_unauthwithoutpermission(
          setupConfig[i]['tests']['select_unauthwithoutpermission']['parameters'],
        );
      }
      if (
        setupConfig[i]['tests']['select_useradmin'] &&
        setupConfig[i]['tests']['select_useradmin']['run']
      ) {
        console.log('select_useradmin');
        await select_useradmin(setupConfig[i]['tests']['select_useradmin']['parameters']);
      }
      if (
        setupConfig[i]['tests']['select_useradminmfa'] &&
        setupConfig[i]['tests']['select_useradminmfa']['run']
      ) {
        console.log('select_useradminmfa');
        await select_useradminmfa(setupConfig[i]['tests']['select_useradminmfa']['parameters']);
      }
      // update
      if (
        setupConfig[i]['tests']['update_setuplimitedwithoutpermission'] &&
        setupConfig[i]['tests']['update_setuplimitedwithoutpermission']['run']
      ) {
        console.log('update_setuplimitedwithoutpermission');
        await update_setuplimitedwithoutpermission(
          setupConfig[i]['tests']['update_setuplimitedwithoutpermission']['parameters'],
        );
      }
      if (
        setupConfig[i]['tests']['update_userwithpermission'] &&
        setupConfig[i]['tests']['update_userwithpermission']['run']
      ) {
        console.log('update_userwithpermission');
        await update_userwithpermission(
          setupConfig[i]['tests']['update_userwithpermission']['parameters'],
        );
      }
      if (
        setupConfig[i]['tests']['update_userwithoutpermission'] &&
        setupConfig[i]['tests']['update_userwithoutpermission']['run']
      ) {
        console.log('update_userwithoutpermission');
        await update_userwithoutpermission(
          setupConfig[i]['tests']['update_userwithoutpermission']['parameters'],
        );
      }
      if (
        setupConfig[i]['tests']['update_unauthwithpermission'] &&
        setupConfig[i]['tests']['update_unauthwithpermission']['run']
      ) {
        console.log('update_unauthwithpermission');
        await update_unauthwithpermission(
          setupConfig[i]['tests']['update_unauthwithpermission']['parameters'],
        );
      }
      if (
        setupConfig[i]['tests']['update_unauthwithoutpermission'] &&
        setupConfig[i]['tests']['update_unauthwithoutpermission']['run']
      ) {
        console.log('update_unauthwithoutpermission');
        await update_unauthwithoutpermission(
          setupConfig[i]['tests']['update_unauthwithoutpermission']['parameters'],
        );
      }
      if (
        setupConfig[i]['tests']['update_admin'] &&
        setupConfig[i]['tests']['update_admin']['run']
      ) {
        console.log('update_admin');
        await update_admin(setupConfig[i]['tests']['update_admin']['parameters']);
      }
      if (
        setupConfig[i]['tests']['update_setuplimitedwithpermission'] &&
        setupConfig[i]['tests']['update_setuplimitedwithpermission']['run']
      ) {
        console.log('update_setuplimitedwithpermission');
        await update_setuplimitedwithpermission(
          setupConfig[i]['tests']['update_setuplimitedwithpermission']['parameters'],
        );
      }
      if (
        setupConfig[i]['tests']['update_useradminmfa'] &&
        setupConfig[i]['tests']['update_useradminmfa']['run']
      ) {
        console.log('update_useradminmfa');
        await update_useradminmfa(setupConfig[i]['tests']['update_useradminmfa']['parameters']);
      }
      if (
        setupConfig[i]['tests']['update_useradmin'] &&
        setupConfig[i]['tests']['update_useradmin']['run']
      ) {
        console.log('update_useradmin');
        await update_useradmin(setupConfig[i]['tests']['update_useradmin']['parameters']);
      }
      // delete
      if (
        setupConfig[i]['tests']['delete_setuplimitedwithoutpermission'] &&
        setupConfig[i]['tests']['delete_setuplimitedwithoutpermission']['run']
      ) {
        console.log('delete_setuplimitedwithoutpermission');
        await delete_setuplimitedwithoutpermission(
          setupConfig[i]['tests']['delete_setuplimitedwithoutpermission']['parameters'],
        );
      }
      if (
        setupConfig[i]['tests']['delete_userwithpermission'] &&
        setupConfig[i]['tests']['delete_userwithpermission']['run']
      ) {
        console.log('delete_userwithpermission');
        await delete_userwithpermission(
          setupConfig[i]['tests']['delete_userwithpermission']['parameters'],
        );
      }
      if (
        setupConfig[i]['tests']['delete_userwithoutpermission'] &&
        setupConfig[i]['tests']['delete_userwithoutpermission']['run']
      ) {
        console.log('delete_userwithoutpermission');
        await delete_userwithoutpermission(
          setupConfig[i]['tests']['delete_userwithoutpermission']['parameters'],
        );
      }
      if (
        setupConfig[i]['tests']['delete_unauthwithpermission'] &&
        setupConfig[i]['tests']['delete_unauthwithpermission']['run']
      ) {
        console.log('delete_unauthwithpermission');
        await delete_unauthwithpermission(
          setupConfig[i]['tests']['delete_unauthwithpermission']['parameters'],
        );
      }
      if (
        setupConfig[i]['tests']['delete_unauthwithoutpermission'] &&
        setupConfig[i]['tests']['delete_unauthwithoutpermission']['run']
      ) {
        console.log('delete_unauthwithoutpermission');
        await delete_unauthwithoutpermission(
          setupConfig[i]['tests']['delete_unauthwithoutpermission']['parameters'],
        );
      }
      if (
        setupConfig[i]['tests']['delete_admin'] &&
        setupConfig[i]['tests']['delete_admin']['run']
      ) {
        console.log('delete_admin');
        await delete_admin(setupConfig[i]['tests']['delete_admin']['parameters']);
      }
      if (
        setupConfig[i]['tests']['delete_setuplimitedwithpermission'] &&
        setupConfig[i]['tests']['delete_setuplimitedwithpermission']['run']
      ) {
        console.log('delete_setuplimitedwithpermission');
        await delete_setuplimitedwithpermission(
          setupConfig[i]['tests']['delete_setuplimitedwithpermission']['parameters'],
        );
      }
      if (
        setupConfig[i]['tests']['delete_useradminmfa'] &&
        setupConfig[i]['tests']['delete_useradminmfa']['run']
      ) {
        console.log('delete_useradminmfa');
        await delete_useradminmfa(setupConfig[i]['tests']['delete_useradminmfa']['parameters']);
      }
      if (
        setupConfig[i]['tests']['delete_useradmin'] &&
        setupConfig[i]['tests']['delete_useradmin']['run']
      ) {
        console.log('delete_useradmin');
        await delete_useradmin(setupConfig[i]['tests']['delete_useradmin']['parameters']);
      }
    }
  }
});
//#endregion

//#region functions insert
async function insert_admin({
  pobject,
  punauth,
  padminemail,
  padminpassword,
  ptable,
  precord,
  ptablehistory,
  precordhistory,
  pthrowerror,
  pthrowerror1,
}) {
  let lsuccess = await supabaseInsert({
    punauth: punauth,
    puseremail: padminemail,
    puserpassword: padminpassword,
    ptable: ptable,
    precord: precord,
  });

  let lsuccess1 = await supabaseInsert({
    punauth: punauth,
    puseremail: padminemail,
    puserpassword: padminpassword,
    ptable: ptablehistory,
    precord: precordhistory,
  });

  if (lsuccess == pthrowerror) {
    throw new Error('4444: ' + pobject + '_insert_admin: assert failed');
  }

  if (lsuccess1 == pthrowerror1) {
    throw new Error('4444: ' + pobject + '_insert_admin1: assert failed');
  }
}

async function insert_setuplimitedwithpermission({
  pobject,
  punauth,
  padminemail,
  padminpassword,
  puseremail,
  puserpassword,
  pprofileid,
  ppermission1,
  ppermission2,
  ptable,
  precord,
  ptablehistory,
  precordhistory,
  pthrowerror,
  pthrowerror1,
}) {
  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: ppermission1,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: 'i_' + ptable + '.setup.select',
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: ppermission2,
  });

  let lsuccess = await supabaseInsert({
    punauth: punauth,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptable,
    precord: precord,
  });

  let lsuccess1 = await supabaseInsert({
    punauth: punauth,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptablehistory,
    precord: precordhistory,
  });

  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  if (lsuccess == pthrowerror) {
    throw new Error('4444: ' + pobject + '_insert_setuplimitedwithpermission: assert failed');
  }

  if (lsuccess1 == pthrowerror1) {
    throw new Error('4444: ' + pobject + '_insert_setuplimitedwithpermission1: assert failed');
  }
}

async function insert_setuplimitedwithoutpermission({
  pobject,
  punauth,
  padminemail,
  padminpassword,
  puseremail,
  puserpassword,
  pprofileid,
  ppermission1,
  ptable,
  precord,
  ptablehistory,
  precordhistory,
  pthrowerror,
  pthrowerror1,
}) {
  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: ppermission1,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: 'i_' + ptable + '.setup.select',
  });

  let lsuccess = await supabaseInsert({
    punauth: punauth,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptable,
    precord: precord,
  });

  let lsuccess1 = await supabaseInsert({
    punauth: punauth,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptablehistory,
    precord: precordhistory,
  });

  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  if (lsuccess == pthrowerror) {
    throw new Error('4444: ' + pobject + '_insert_setuplimitedwithoutpermission: assert failed');
  }

  if (lsuccess1 == pthrowerror1) {
    throw new Error('4444: ' + pobject + '_insert_setuplimitedwithoutpermission1: assert failed');
  }
}

async function insert_userwithpermission({
  pobject,
  punauth,
  padminemail,
  padminpassword,
  puseremail,
  puserpassword,
  pprofileid,
  ppermission1,
  ptable,
  precord,
  ptablehistory,
  precordhistory,
  pthrowerror,
  pthrowerror1,
}) {
  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: ppermission1,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: 'i_' + ptable + '.setup.select',
  });

  let lsuccess = await supabaseInsert({
    punauth: punauth,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptable,
    precord: precord,
  });

  let lsuccess1 = await supabaseInsert({
    punauth: punauth,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptablehistory,
    precord: precordhistory,
  });

  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  if (lsuccess == pthrowerror) {
    throw new Error('4444: ' + pobject + '_insert_userwithpermission: assert failed');
  }

  if (lsuccess1 == pthrowerror1) {
    throw new Error('4444: ' + pobject + '_insert_userwithpermission1: assert failed');
  }
}

async function insert_userwithoutpermission({
  pobject,
  punauth,
  padminemail,
  padminpassword,
  puseremail,
  puserpassword,
  pprofileid,
  ptable,
  precord,
  ptablehistory,
  precordhistory,
  pthrowerror,
  pthrowerror1,
}) {
  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: 'i_' + ptable + '.setup.select',
  });

  let lsuccess = await supabaseInsert({
    punauth: punauth,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptable,
    precord: precord,
  });

  let lsuccess1 = await supabaseInsert({
    punauth: punauth,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptablehistory,
    precord: precordhistory,
  });

  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  if (lsuccess == pthrowerror) {
    throw new Error('4444: ' + pobject + '_insert_userwithoutpermission: assert failed');
  }

  if (lsuccess1 == pthrowerror1) {
    throw new Error('4444: ' + pobject + '_insert_userwithoutpermission1: assert failed');
  }
}

async function insert_unauthwithpermission({
  pobject,
  punauth,
  padminemail,
  padminpassword,
  puseremail,
  puserpassword,
  pprofileid,
  ppermission1,
  ptable,
  precord,
  ptablehistory,
  precordhistory,
  pthrowerror,
  pthrowerror1,
}) {
  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermission1,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: 'i_' + ptable + '.setup.select',
  });

  let lsuccess = await supabaseInsert({
    punauth: punauth,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptable,
    precord: precord,
  });

  let lsuccess1 = await supabaseInsert({
    punauth: punauth,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptablehistory,
    precord: precordhistory,
  });

  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  if (lsuccess == pthrowerror) {
    throw new Error('4444: ' + pobject + '_insert_unauthwithpermission: assert failed');
  }

  if (lsuccess1 == pthrowerror1) {
    throw new Error('4444: ' + pobject + '_insert_unauthwithpermission1: assert failed');
  }
}

async function insert_unauthwithoutpermission({
  pobject,
  punauth,
  padminemail,
  padminpassword,
  puseremail,
  puserpassword,
  pprofileid,
  ptable,
  precord,
  ptablehistory,
  precordhistory,
  pthrowerror,
  pthrowerror1,
}) {
  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: 'i_' + ptable + '.setup.select',
  });

  let lsuccess = await supabaseInsert({
    punauth: punauth,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptable,
    precord: precord,
  });

  let lsuccess1 = await supabaseInsert({
    punauth: punauth,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptablehistory,
    precord: precordhistory,
  });

  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  if (lsuccess == pthrowerror) {
    throw new Error('4444: ' + pobject + '_insert_unauthwithoutpermission: assert failed');
  }

  if (lsuccess1 == pthrowerror1) {
    throw new Error('4444: ' + pobject + '_insert_unauthwithoutpermission1: assert failed');
  }
}

async function insert_useradmin({
  pobject,
  punauth,
  padminemail,
  padminpassword,
  puseremail,
  puserpassword,
  pprofileid,
  ppermission1,
  ptable,
  precord,
  ptablehistory,
  precordhistory,
  pthrowerror,
  pthrowerror1,
}) {
  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: ppermission1,
  });

  let lsuccess = await supabaseInsert({
    punauth: punauth,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptable,
    precord: precord,
  });

  let lsuccess1 = await supabaseInsert({
    punauth: punauth,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptablehistory,
    precord: precordhistory,
  });

  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  if (lsuccess == pthrowerror) {
    throw new Error('4444: ' + pobject + '_insert_useradmin: assert failed');
  }

  if (lsuccess1 == pthrowerror1) {
    throw new Error('4444: ' + pobject + '_insert_useradmin1: assert failed');
  }
}

async function insert_useradminmfa({
  pobject,
  punauth,
  padminemail,
  padminpassword,
  puseremail,
  puserpassword,
  pprofileid,
  ppermission1,
  ptable,
  precord,
  ptablehistory,
  precordhistory,
  pthrowerror,
  pthrowerror1,
}) {
  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: ppermission1,
  });

  await supabaseEnableMFA({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  let lsuccess = await supabaseInsert({
    punauth: punauth,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptable,
    precord: precord,
  });

  let lsuccess1 = await supabaseInsert({
    punauth: punauth,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptablehistory,
    precord: precordhistory,
  });

  await supabaseDisableMFA({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  if (lsuccess == pthrowerror) {
    throw new Error('4444: ' + pobject + '_insert_useradminmfa: assert failed');
  }

  if (lsuccess1 == pthrowerror1) {
    throw new Error('4444: ' + pobject + '_insert_useradminmfa1: assert failed');
  }
}
//#endregion

//#region functions select
async function select_admin({
  pobject,
  punauth,
  padminemail,
  padminpassword,
  ptable,
  ptablehistory,
  pid,
  pidvalue,
  pthrowerror1,
  pthrowerror2,
  pthrowerror3,
}) {
  let lresponse1 = await supabaseSelect({
    punauth: punauth,
    puseremail: padminemail,
    puserpassword: padminpassword,
    ptable: ptable,
    pfilter: false,
  });

  let lresponse2 = await supabaseSelect({
    punauth: punauth,
    puseremail: padminemail,
    puserpassword: padminpassword,
    ptable: ptable,
    pfilter: true,
    pid: pid,
    pidvalue: pidvalue,
  });

  let lresponse3 = await supabaseSelect({
    punauth: punauth,
    puseremail: padminemail,
    puserpassword: padminpassword,
    ptable: ptablehistory,
    pfilter: false,
  });

  if (eval(`${lresponse1.length} ${pthrowerror1}`)) {
    throw new Error('4444: ' + pobject + '_select_admin1: assert failed');
  }

  if (eval(`${lresponse2.length} ${pthrowerror2}`)) {
    throw new Error('4444: ' + pobject + '_select_admin2: assert failed');
  }

  if (eval(`${lresponse3.length} ${pthrowerror3}`)) {
    throw new Error('4444: ' + pobject + '_select_admin3: assert failed');
  }
}

async function select_setuplimitedwithpermission({
  pobject,
  punauth,
  padminemail,
  padminpassword,
  puseremail,
  puserpassword,
  pprofileid,
  ppermission1,
  ppermission2,
  ptable,
  ptablehistory,
  pid,
  pidvalue,
  pthrowerror1,
  pthrowerror2,
  pthrowerror3,
}) {
  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: ppermission1,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: ppermission2,
  });

  let lresponse1 = await supabaseSelect({
    punauth: punauth,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptable,
    pfilter: false,
  });

  let lresponse2 = await supabaseSelect({
    punauth: punauth,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptable,
    pfilter: true,
    pid: pid,
    pidvalue: pidvalue,
  });

  let lresponse3 = await supabaseSelect({
    punauth: punauth,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptablehistory,
    pfilter: false,
  });

  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  if (eval(`${lresponse1.length} ${pthrowerror1}`)) {
    throw new Error('4444: ' + pobject + '_select_setuplimitedwithpermission1: assert failed');
  }

  if (eval(`${lresponse2.length} ${pthrowerror2}`)) {
    throw new Error('4444: ' + pobject + '_select_setuplimitedwithpermission2: assert failed');
  }

  if (eval(`${lresponse3.length} ${pthrowerror3}`)) {
    throw new Error('4444: ' + pobject + '_select_setuplimitedwithpermission3: assert failed');
  }
}

async function select_setuplimitedwithoutpermission({
  pobject,
  punauth,
  padminemail,
  padminpassword,
  puseremail,
  puserpassword,
  pprofileid,
  ppermission1,
  ptable,
  ptablehistory,
  pid,
  pidvalue,
  pthrowerror1,
  pthrowerror2,
}) {
  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: ppermission1,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: 'i_' + ptable + '.setup.select',
  });

  let lresponse1 = await supabaseSelect({
    punauth: punauth,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptable,
    pfilter: false,
  });

  let lresponse2 = await supabaseSelect({
    punauth: punauth,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptable,
    pfilter: true,
    pid: pid,
    pidvalue: pidvalue,
  });

  let lresponse3 = await supabaseSelect({
    punauth: punauth,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptablehistory,
    pfilter: false,
  });

  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  if (eval(`${lresponse1.length} ${pthrowerror1}`)) {
    throw new Error('4444: ' + pobject + '_select_setuplimitedwithoutpermission1: assert failed');
  }

  if (eval(`${lresponse2.length} ${pthrowerror2}`)) {
    throw new Error('4444: ' + pobject + '_select_setuplimitedwithoutpermission2: assert failed');
  }

  if (lresponse3.length == 0) {
    throw new Error('4444: ' + pobject + '_select_setuplimitedwithoutpermission3: assert failed');
  }
}

async function select_userwithpermission({
  pobject,
  punauth,
  padminemail,
  padminpassword,
  puseremail,
  puserpassword,
  pprofileid,
  ppermission1,
  ptable,
  ptablehistory,
  pid,
  pidvalue,
  pthrowerror1,
  pthrowerror2,
  pthrowerror3,
}) {
  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: ppermission1,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: 'i_' + ptable + '.setup.select',
  });

  let lresponse1 = await supabaseSelect({
    punauth: punauth,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptable,
    pfilter: false,
  });

  let lresponse2 = await supabaseSelect({
    punauth: punauth,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptable,
    pfilter: true,
    pid: pid,
    pidvalue: pidvalue,
  });

  let lresponse3 = await supabaseSelect({
    punauth: punauth,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptablehistory,
    pfilter: false,
  });

  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  if (eval(`${lresponse1.length} ${pthrowerror1}`)) {
    throw new Error('4444: ' + pobject + '_select_userwithpermission1: assert failed');
  }

  if (eval(`${lresponse2.length} ${pthrowerror2}`)) {
    throw new Error('4444: ' + pobject + '_select_userwithpermission2: assert failed');
  }

  if (eval(`${lresponse3.length} ${pthrowerror3}`)) {
    throw new Error('4444: ' + pobject + '_select_userwithpermission3: assert failed');
  }
}

async function select_userwithoutpermission({
  pobject,
  punauth,
  padminemail,
  padminpassword,
  puseremail,
  puserpassword,
  pprofileid,
  ptable,
  ptablehistory,
  pid,
  pidvalue,
  pthrowerror1,
  pthrowerror2,
  pthrowerror3,
}) {
  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: 'i_' + ptable + '.setup.select',
  });

  let lresponse1 = await supabaseSelect({
    punauth: punauth,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptable,
    pfilter: false,
  });

  let lresponse2 = await supabaseSelect({
    punauth: punauth,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptable,
    pfilter: true,
    pid: pid,
    pidvalue: pidvalue,
  });

  let lresponse3 = await supabaseSelect({
    punauth: punauth,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptablehistory,
    pfilter: false,
  });

  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  if (eval(`${lresponse1.length} ${pthrowerror1}`)) {
    throw new Error('4444: ' + pobject + '_select_userwithoutpermission1: assert failed');
  }

  if (eval(`${lresponse2.length} ${pthrowerror2}`)) {
    throw new Error('4444: ' + pobject + '_select_userwithoutpermission2: assert failed');
  }

  if (eval(`${lresponse3.length} ${pthrowerror3}`)) {
    throw new Error('4444: ' + pobject + '_select_userwithoutpermission3: assert failed');
  }
}

async function select_unauthwithpermission({
  pobject,
  punauth,
  padminemail,
  padminpassword,
  puseremail,
  puserpassword,
  pprofileid,
  ppermission1,
  ptable,
  ptablehistory,
  pid,
  pidvalue,
  pthrowerror1,
  pthrowerror2,
  pthrowerror3,
}) {
  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: ppermission1,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: 'i_' + ptable + '.setup.select',
  });

  let lresponse1 = await supabaseSelect({
    punauth: punauth,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptable,
    pfilter: false,
  });

  let lresponse2 = await supabaseSelect({
    punauth: punauth,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptable,
    pfilter: true,
    pid: pid,
    pidvalue: pidvalue,
  });

  let lresponse3 = await supabaseSelect({
    punauth: punauth,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptablehistory,
    pfilter: false,
  });

  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  if (eval(`${lresponse1.length} ${pthrowerror1}`)) {
    throw new Error('4444: ' + pobject + '_select_unauthwithpermission1: assert failed');
  }

  if (eval(`${lresponse2.length} ${pthrowerror2}`)) {
    throw new Error('4444: ' + pobject + '_select_unauthwithpermission2: assert failed');
  }

  if (eval(`${lresponse3.length} ${pthrowerror3}`)) {
    throw new Error('4444: ' + pobject + '_select_unauthwithpermission3: assert failed');
  }
}

async function select_unauthwithoutpermission({
  pobject,
  punauth,
  padminemail,
  padminpassword,
  puseremail,
  puserpassword,
  pprofileid,
  ptable,
  ptablehistory,
  pid,
  pidvalue,
  pthrowerror1,
  pthrowerror2,
  pthrowerror3,
}) {
  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: 'i_' + ptable + '.setup.select',
  });

  let lresponse1 = await supabaseSelect({
    punauth: punauth,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptable,
    pfilter: false,
  });

  let lresponse2 = await supabaseSelect({
    punauth: punauth,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptable,
    pfilter: true,
    pid: pid,
    pidvalue: pidvalue,
  });

  let lresponse3 = await supabaseSelect({
    punauth: punauth,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptablehistory,
    pfilter: false,
  });

  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  if (eval(`${lresponse1.length} ${pthrowerror1}`)) {
    throw new Error('4444: ' + pobject + '_select_unauthwithoutpermission1: assert failed');
  }

  if (eval(`${lresponse2.length} ${pthrowerror2}`)) {
    throw new Error('4444: ' + pobject + '_select_unauthwithoutpermission2: assert failed');
  }

  if (eval(`${lresponse3.length} ${pthrowerror3}`)) {
    throw new Error('4444: ' + pobject + '_select_unauthwithoutpermission3: assert failed');
  }
}

async function select_useradmin({
  pobject,
  punauth,
  padminemail,
  padminpassword,
  puseremail,
  puserpassword,
  pprofileid,
  ppermission1,
  ptable,
  ptablehistory,
  pid,
  pidvalue,
  pthrowerror1,
  pthrowerror2,
  pthrowerror3,
}) {
  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: ppermission1,
  });

  let lresponse1 = await supabaseSelect({
    punauth: punauth,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptable,
    pfilter: false,
  });

  let lresponse2 = await supabaseSelect({
    punauth: punauth,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptable,
    pfilter: true,
    pid: pid,
    pidvalue: pidvalue,
  });

  let lresponse3 = await supabaseSelect({
    punauth: punauth,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptablehistory,
    pfilter: false,
  });

  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  if (eval(`${lresponse1.length} ${pthrowerror1}`)) {
    throw new Error('4444: ' + pobject + '_select_useradmin1: assert failed');
  }

  if (eval(`${lresponse2.length} ${pthrowerror2}`)) {
    throw new Error('4444: ' + pobject + '_select_useradmin2: assert failed');
  }

  if (eval(`${lresponse3.length} ${pthrowerror3}`)) {
    throw new Error('4444: ' + pobject + '_select_useradmin3: assert failed');
  }
}

async function select_useradminmfa({
  pobject,
  punauth,
  padminemail,
  padminpassword,
  puseremail,
  puserpassword,
  pprofileid,
  ppermission1,
  ptable,
  ptablehistory,
  pid,
  pidvalue,
  pthrowerror1,
  pthrowerror2,
  pthrowerror3,
}) {
  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: ppermission1,
  });

  await supabaseEnableMFA({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  let lresponse1 = await supabaseSelect({
    punauth: punauth,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptable,
    pfilter: false,
  });

  let lresponse2 = await supabaseSelect({
    punauth: punauth,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptable,
    pfilter: true,
    pid: pid,
    pidvalue: pidvalue,
  });

  let lresponse3 = await supabaseSelect({
    punauth: punauth,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptablehistory,
    pfilter: false,
  });

  await supabaseDisableMFA({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  if (eval(`${lresponse1.length} ${pthrowerror1}`)) {
    throw new Error('4444: ' + pobject + '_select_useradminmfa1: assert failed');
  }

  if (eval(`${lresponse2.length} ${pthrowerror2}`)) {
    throw new Error('4444: ' + pobject + '_select_useradminmfa2: assert failed');
  }

  if (eval(`${lresponse3.length} ${pthrowerror3}`)) {
    throw new Error('4444: ' + pobject + '_select_useradminmfa3: assert failed');
  }
}
//#endregion

//#region functions update
async function update_setuplimitedwithoutpermission({
  pobject,
  punauth,
  padminemail,
  padminpassword,
  puseremail,
  puserpassword,
  pprofileid,
  ppermission1,
  ppermission2,
  ptable,
  pid,
  pidvalue,
  precord,
  pcolumn,
  pcolumnvalue,
  pthrowerror,
}) {
  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: ppermission1,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: ppermission2,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: 'i_' + ptable + '.setup.select',
  });

  let lsuccess = await supabaseUpdate({
    punauth: punauth,
    padminemail: padminemail,
    padminpassword: padminpassword,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptable,
    pid: pid,
    pidvalue: pidvalue,
    precord: precord,
    pcolumn: pcolumn,
    pcolumnvalue: pcolumnvalue,
  });

  let lsuccess1 = await supabaseUpdateALL({
    punauth: punauth,
    padminemail: padminemail,
    padminpassword: padminpassword,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptablehistory: 'i_' + ptable,
    precordhistory: { action: 'PWTEST' },
  });

  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  if (lsuccess == pthrowerror) {
    throw new Error('4444: ' + pobject + '_update_admin: assert failed');
  }

  if (lsuccess1 == true) {
    throw new Error('4444: ' + pobject + '_update_admin1: assert failed');
  }
}

async function update_userwithpermission({
  pobject,
  punauth,
  padminemail,
  padminpassword,
  puseremail,
  puserpassword,
  pprofileid,
  ppermission1,
  ppermission2,
  ptable,
  pid,
  pidvalue,
  precord,
  pcolumn,
  pcolumnvalue,
  pthrowerror,
}) {
  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: ppermission1,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: ppermission2,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: 'i_' + ptable + '.setup.select',
  });

  let lsuccess = await supabaseUpdate({
    punauth: punauth,
    padminemail: padminemail,
    padminpassword: padminpassword,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptable,
    pid: pid,
    pidvalue: pidvalue,
    precord: precord,
    pcolumn: pcolumn,
    pcolumnvalue: pcolumnvalue,
  });

  let lsuccess1 = await supabaseUpdateALL({
    punauth: punauth,
    padminemail: padminemail,
    padminpassword: padminpassword,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptablehistory: 'i_' + ptable,
    precordhistory: { action: 'PWTEST' },
  });

  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  if (lsuccess == pthrowerror) {
    throw new Error('4444: ' + pobject + '_update_userwithpermission: assert failed');
  }

  if (lsuccess1 == true) {
    throw new Error('4444: ' + pobject + '_update_userwithpermission1: assert failed');
  }
}

async function update_userwithoutpermission({
  pobject,
  punauth,
  padminemail,
  padminpassword,
  puseremail,
  puserpassword,
  pprofileid,
  ptable,
  pid,
  pidvalue,
  precord,
  pcolumn,
  pcolumnvalue,
  pthrowerror,
}) {
  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: 'i_' + ptable + '.setup.select',
  });

  let lsuccess = await supabaseUpdate({
    punauth: punauth,
    padminemail: padminemail,
    padminpassword: padminpassword,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptable,
    pid: pid,
    pidvalue: pidvalue,
    precord: precord,
    pcolumn: pcolumn,
    pcolumnvalue: pcolumnvalue,
  });

  let lsuccess1 = await supabaseUpdateALL({
    punauth: punauth,
    padminemail: padminemail,
    padminpassword: padminpassword,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptablehistory: 'i_' + ptable,
    precordhistory: { action: 'PWTEST' },
  });

  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  if (lsuccess == pthrowerror) {
    throw new Error('4444: ' + pobject + '_update_userwithoutpermission: assert failed');
  }

  if (lsuccess1 == true) {
    throw new Error('4444: ' + pobject + '_update_userwithoutpermission1: assert failed');
  }
}

async function update_unauthwithpermission({
  pobject,
  punauth,
  padminemail,
  padminpassword,
  puseremail,
  puserpassword,
  pprofileid,
  ppermission1,
  ppermission2,
  ptable,
  pid,
  pidvalue,
  precord,
  pcolumn,
  pcolumnvalue,
  pthrowerror,
}) {
  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: ppermission1,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: ppermission2,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: 'i_' + ptable + '.setup.select',
  });

  let lsuccess = await supabaseUpdate({
    punauth: punauth,
    padminemail: padminemail,
    padminpassword: padminpassword,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptable,
    pid: pid,
    pidvalue: pidvalue,
    precord: precord,
    pcolumn: pcolumn,
    pcolumnvalue: pcolumnvalue,
  });

  let lsuccess1 = await supabaseUpdateALL({
    punauth: punauth,
    padminemail: padminemail,
    padminpassword: padminpassword,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptablehistory: 'i_' + ptable,
    precordhistory: { action: 'PWTEST' },
  });

  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  if (lsuccess == pthrowerror) {
    throw new Error('4444: ' + pobject + '_update_unauthwithpermission: assert failed');
  }

  if (lsuccess1 == true) {
    throw new Error('4444: ' + pobject + '_update_unauthwithpermission1: assert failed');
  }
}

async function update_unauthwithoutpermission({
  pobject,
  punauth,
  padminemail,
  padminpassword,
  puseremail,
  puserpassword,
  pprofileid,
  ptable,
  pid,
  pidvalue,
  precord,
  pcolumn,
  pcolumnvalue,
  pthrowerror,
}) {
  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: 'i_' + ptable + '.setup.select',
  });

  let lsuccess = await supabaseUpdate({
    punauth: punauth,
    padminemail: padminemail,
    padminpassword: padminpassword,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptable,
    pid: pid,
    pidvalue: pidvalue,
    precord: precord,
    pcolumn: pcolumn,
    pcolumnvalue: pcolumnvalue,
  });

  let lsuccess1 = await supabaseUpdateALL({
    punauth: punauth,
    padminemail: padminemail,
    padminpassword: padminpassword,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptablehistory: 'i_' + ptable,
    precordhistory: { action: 'PWTEST' },
  });

  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  if (lsuccess == pthrowerror) {
    throw new Error('4444: ' + pobject + '_update_unauthwithoutpermission: assert failed');
  }

  if (lsuccess1 == true) {
    throw new Error('4444: ' + pobject + '_update_unauthwithoutpermission1: assert failed');
  }
}

async function update_admin({
  pobject,
  punauth,
  padminemail,
  padminpassword,
  ptable,
  pid,
  pidvalue,
  precord,
  pcolumn,
  pcolumnvalue,
  pthrowerror,
}) {
  let lsuccess = await supabaseUpdate({
    punauth: punauth,
    padminemail: padminemail,
    padminpassword: padminpassword,
    puseremail: padminemail,
    puserpassword: padminpassword,
    ptable: ptable,
    pid: pid,
    pidvalue: pidvalue,
    precord: precord,
    pcolumn: pcolumn,
    pcolumnvalue: pcolumnvalue,
  });

  let lsuccess1 = await supabaseUpdateALL({
    punauth: punauth,
    padminemail: padminemail,
    padminpassword: padminpassword,
    puseremail: padminemail,
    puserpassword: padminpassword,
    ptablehistory: 'i_' + ptable,
    precordhistory: { action: 'PWTEST' },
  });

  if (lsuccess == pthrowerror) {
    throw new Error('4444: ' + pobject + '_update_admin: assert failed');
  }

  if (lsuccess1 == true) {
    throw new Error('4444: ' + pobject + '_update_admin1: assert failed');
  }
}

async function update_setuplimitedwithpermission({
  pobject,
  punauth,
  padminemail,
  padminpassword,
  puseremail,
  puserpassword,
  pprofileid,
  ppermission1,
  ppermission2,
  ppermission3,
  ptable,
  pid,
  pidvalue,
  precord,
  pcolumn,
  pcolumnvalue,
  pthrowerror,
}) {
  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: ppermission1,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: ppermission2,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: ppermission3,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: 'i_' + ptable + '.setup.select',
  });

  let lsuccess = await supabaseUpdate({
    punauth: punauth,
    padminemail: padminemail,
    padminpassword: padminpassword,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptable,
    pid: pid,
    pidvalue: pidvalue,
    precord: precord,
    pcolumn: pcolumn,
    pcolumnvalue: pcolumnvalue,
  });

  let lsuccess1 = await supabaseUpdateALL({
    punauth: punauth,
    padminemail: padminemail,
    padminpassword: padminpassword,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptablehistory: 'i_' + ptable,
    precordhistory: { action: 'PWTEST' },
  });

  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  if (lsuccess == pthrowerror) {
    throw new Error('4444: ' + pobject + '_update_setuplimitedwithpermission: assert failed');
  }

  if (lsuccess1 == true) {
    throw new Error('4444: ' + pobject + '_update_setuplimitedwithpermission1: assert failed');
  }
}

async function update_useradminmfa({
  pobject,
  punauth,
  padminemail,
  padminpassword,
  puseremail,
  puserpassword,
  pprofileid,
  ppermission1,
  ptable,
  pid,
  pidvalue,
  precord,
  pcolumn,
  pcolumnvalue,
  pthrowerror,
}) {
  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: ppermission1,
  });

  await supabaseEnableMFA({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  let lsuccess = await supabaseUpdate({
    punauth: punauth,
    padminemail: padminemail,
    padminpassword: padminpassword,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptable,
    pid: pid,
    pidvalue: pidvalue,
    precord: precord,
    pcolumn: pcolumn,
    pcolumnvalue: pcolumnvalue,
  });

  let lsuccess1 = await supabaseUpdateALL({
    punauth: punauth,
    padminemail: padminemail,
    padminpassword: padminpassword,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptablehistory: 'i_' + ptable,
    precordhistory: { action: 'PWTEST' },
  });

  await supabaseDisableMFA({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  if (lsuccess == pthrowerror) {
    throw new Error('4444: ' + pobject + '_update_useradminmfa: assert failed');
  }

  if (lsuccess1 == true) {
    throw new Error('4444: ' + pobject + '_update_useradminmfa1: assert failed');
  }
}

async function update_useradmin({
  pobject,
  punauth,
  padminemail,
  padminpassword,
  puseremail,
  puserpassword,
  pprofileid,
  ppermission1,
  ptable,
  pid,
  pidvalue,
  precord,
  pcolumn,
  pcolumnvalue,
  pthrowerror,
}) {
  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: ppermission1,
  });

  let lsuccess = await supabaseUpdate({
    punauth: punauth,
    padminemail: padminemail,
    padminpassword: padminpassword,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptable,
    pid: pid,
    pidvalue: pidvalue,
    precord: precord,
    pcolumn: pcolumn,
    pcolumnvalue: pcolumnvalue,
  });

  let lsuccess1 = await supabaseUpdateALL({
    punauth: punauth,
    padminemail: padminemail,
    padminpassword: padminpassword,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptablehistory: 'i_' + ptable,
    precordhistory: { action: 'PWTEST' },
  });

  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  if (lsuccess == pthrowerror) {
    throw new Error('4444: ' + pobject + '_update_useradmin: assert failed');
  }

  if (lsuccess1 == true) {
    throw new Error('4444: ' + pobject + '_update_useradmin1: assert failed');
  }
}
//#endregion

//#region functions delete
async function delete_setuplimitedwithoutpermission({
  pobject,
  punauth,
  padminemail,
  padminpassword,
  puseremail,
  puserpassword,
  pprofileid,
  ppermission1,
  ptable,
  pid,
  pidvalue,
  pthrowerror,
}) {
  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: ppermission1,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: 'i_' + ptable + '.setup.select',
  });

  let lsuccess = await supabaseDelete({
    punauth: punauth,
    padminemail: padminemail,
    padminpassword: padminpassword,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptable,
    pid: pid,
    pidvalue: pidvalue,
  });

  let lsuccess1 = await supabaseDeleteALL({
    punauth: punauth,
    padminemail: padminemail,
    padminpassword: padminpassword,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptablehistory: 'i_' + ptable,
  });

  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  if (lsuccess == pthrowerror) {
    throw new Error('4444: ' + pobject + '_delete_setuplimitedwithoutpermission: assert failed');
  }

  if (lsuccess1 == true) {
    throw new Error('4444: ' + pobject + '_delete_setuplimitedwithoutpermission1: assert failed');
  }
}

async function delete_userwithpermission({
  pobject,
  punauth,
  padminemail,
  padminpassword,
  puseremail,
  puserpassword,
  pprofileid,
  ppermission1,
  ppermission2,
  ptable,
  pid,
  pidvalue,
  pthrowerror,
}) {
  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: ppermission1,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: ppermission2,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: 'i_' + ptable + '.setup.select',
  });

  let lsuccess = await supabaseDelete({
    punauth: punauth,
    padminemail: padminemail,
    padminpassword: padminpassword,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptable,
    pid: pid,
    pidvalue: pidvalue,
  });

  let lsuccess1 = await supabaseDeleteALL({
    punauth: punauth,
    padminemail: padminemail,
    padminpassword: padminpassword,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptablehistory: 'i_' + ptable,
  });

  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  if (lsuccess == pthrowerror) {
    throw new Error('4444: ' + pobject + '_delete_userwithpermission: assert failed');
  }

  if (lsuccess1 == true) {
    throw new Error('4444: ' + pobject + '_delete_userwithpermission1: assert failed');
  }
}

async function delete_userwithoutpermission({
  pobject,
  punauth,
  padminemail,
  padminpassword,
  puseremail,
  puserpassword,
  pprofileid,
  ptable,
  pid,
  pidvalue,
  pthrowerror,
}) {
  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: 'i_' + ptable + '.setup.select',
  });

  let lsuccess = await supabaseDelete({
    punauth: punauth,
    padminemail: padminemail,
    padminpassword: padminpassword,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptable,
    pid: pid,
    pidvalue: pidvalue,
  });

  let lsuccess1 = await supabaseDeleteALL({
    punauth: punauth,
    padminemail: padminemail,
    padminpassword: padminpassword,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptablehistory: 'i_' + ptable,
  });

  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  if (lsuccess == pthrowerror) {
    throw new Error('4444: ' + pobject + '_delete_userwithoutpermission: assert failed');
  }

  if (lsuccess1 == true) {
    throw new Error('4444: ' + pobject + '_delete_userwithoutpermission1: assert failed');
  }
}

async function delete_unauthwithpermission({
  pobject,
  punauth,
  padminemail,
  padminpassword,
  puseremail,
  puserpassword,
  pprofileid,
  ppermission1,
  ppermission2,
  ptable,
  pid,
  pidvalue,
  pthrowerror,
}) {
  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: ppermission1,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: ppermission2,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: 'i_' + ptable + '.setup.select',
  });

  let lsuccess = await supabaseDelete({
    punauth: punauth,
    padminemail: padminemail,
    padminpassword: padminpassword,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptable,
    pid: pid,
    pidvalue: pidvalue,
  });

  let lsuccess1 = await supabaseDeleteALL({
    punauth: punauth,
    padminemail: padminemail,
    padminpassword: padminpassword,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptablehistory: 'i_' + ptable,
  });

  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  if (lsuccess == pthrowerror) {
    throw new Error('4444: ' + pobject + '_delete_unauthwithpermission: assert failed');
  }

  if (lsuccess1 == true) {
    throw new Error('4444: ' + pobject + '_delete_unauthwithpermission1: assert failed');
  }
}

async function delete_unauthwithoutpermission({
  pobject,
  punauth,
  padminemail,
  padminpassword,
  puseremail,
  puserpassword,
  pprofileid,
  ptable,
  pid,
  pidvalue,
  pthrowerror,
}) {
  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: 'i_' + ptable + '.setup.select',
  });

  let lsuccess = await supabaseDelete({
    punauth: punauth,
    padminemail: padminemail,
    padminpassword: padminpassword,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptable,
    pid: pid,
    pidvalue: pidvalue,
  });

  let lsuccess1 = await supabaseDeleteALL({
    punauth: punauth,
    padminemail: padminemail,
    padminpassword: padminpassword,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptablehistory: 'i_' + ptable,
  });

  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  if (lsuccess == pthrowerror) {
    throw new Error('4444: ' + pobject + '_delete_unauthwithoutpermission: assert failed');
  }

  if (lsuccess1 == true) {
    throw new Error('4444: ' + pobject + '_delete_unauthwithoutpermission1: assert failed');
  }
}

async function delete_admin({
  pobject,
  punauth,
  padminemail,
  padminpassword,
  puseremail,
  puserpassword,
  ptable,
  pid,
  pidvalue,
  pthrowerror,
}) {
  let lsuccess = await supabaseDelete({
    punauth: punauth,
    padminemail: padminemail,
    padminpassword: padminpassword,
    puseremail: padminemail,
    puserpassword: padminpassword,
    ptable: ptable,
    pid: pid,
    pidvalue: pidvalue,
  });

  let lsuccess1 = await supabaseDeleteALL({
    punauth: punauth,
    padminemail: padminemail,
    padminpassword: padminpassword,
    puseremail: padminemail,
    puserpassword: padminpassword,
    ptablehistory: 'i_' + ptable,
  });

  if (lsuccess == pthrowerror) {
    throw new Error('4444: ' + pobject + '_delete_admin: assert failed');
  }

  if (lsuccess1 == true) {
    throw new Error('4444: ' + pobject + '_delete_admin1: assert failed');
  }
}
async function delete_setuplimitedwithpermission({
  pobject,
  punauth,
  padminemail,
  padminpassword,
  puseremail,
  puserpassword,
  pprofileid,
  ppermission1,
  ppermission2,
  ppermission3,
  ptable,
  pid,
  pidvalue,
  pthrowerror,
}) {
  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: ppermission1,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: ppermission2,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: ppermission3,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: 'i_' + ptable + '.setup.select',
  });

  let lsuccess = await supabaseDelete({
    punauth: punauth,
    padminemail: padminemail,
    padminpassword: padminpassword,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptable,
    pid: pid,
    pidvalue: pidvalue,
  });

  let lsuccess1 = await supabaseDeleteALL({
    punauth: punauth,
    padminemail: padminemail,
    padminpassword: padminpassword,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptablehistory: 'i_' + ptable,
  });

  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  if (lsuccess == pthrowerror) {
    throw new Error('4444: ' + pobject + '_delete_setuplimitedwithpermission: assert failed');
  }

  if (lsuccess1 == true) {
    throw new Error('4444: ' + pobject + '_delete_setuplimitedwithpermission1: assert failed');
  }
}

async function delete_useradminmfa({
  pobject,
  punauth,
  padminemail,
  padminpassword,
  puseremail,
  puserpassword,
  pprofileid,
  ppermission1,
  ptable,
  pid,
  pidvalue,
  pthrowerror,
}) {
  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: ppermission1,
  });

  await supabaseEnableMFA({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  let lsuccess = await supabaseDelete({
    punauth: punauth,
    padminemail: padminemail,
    padminpassword: padminpassword,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptable,
    pid: pid,
    pidvalue: pidvalue,
  });

  let lsuccess1 = await supabaseDeleteALL({
    punauth: punauth,
    padminemail: padminemail,
    padminpassword: padminpassword,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptablehistory: 'i_' + ptable,
  });

  await supabaseDisableMFA({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  if (lsuccess == pthrowerror) {
    throw new Error('4444: ' + pobject + '_delete_useradminmfa: assert failed');
  }

  if (lsuccess1 == true) {
    throw new Error('4444: ' + pobject + '_delete_useradminmfa1: assert failed');
  }
}

async function delete_useradmin({
  pobject,
  punauth,
  padminemail,
  padminpassword,
  puseremail,
  puserpassword,
  pprofileid,
  ppermission1,
  ptable,
  pid,
  pidvalue,
  pthrowerror,
}) {
  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  await supabaseCreatePermission({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
    ppermissionname: ppermission1,
  });

  let lsuccess = await supabaseDelete({
    punauth: punauth,
    padminemail: padminemail,
    padminpassword: padminpassword,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptable: ptable,
    pid: pid,
    pidvalue: pidvalue,
  });

  let lsuccess1 = await supabaseDeleteALL({
    punauth: punauth,
    padminemail: padminemail,
    padminpassword: padminpassword,
    puseremail: puseremail,
    puserpassword: puserpassword,
    ptablehistory: 'i_' + ptable,
  });

  await supabaseDeletePermissions({
    padminemail: padminemail,
    padminpassword: padminpassword,
    pprofileid: pprofileid,
  });

  if (lsuccess == pthrowerror) {
    throw new Error('4444: ' + pobject + '_delete_useradmin: assert failed');
  }

  if (lsuccess1 == true) {
    throw new Error('4444: ' + pobject + '_delete_useradmin1: assert failed');
  }
}
//#endregion

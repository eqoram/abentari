// settings
//  insert
//    admin --> success
//    setuplimited with permission --> success
//    setuplimited without permission --> fail
//    user with permission --> fail
//    user without permission --> fail
//    unauth with permission --> fail
//    unauth without permission --> fail
//  select
//    admin --> success < 4 AND != 1
//    setuplimited with permission --> success < 4 AND != 1
//    setuplimited without permission --> success < 4 AND != 1
//    user with permission --> success < 4 AND != 1
//    user without permission --> success < 4 AND != 1
//    unauth with permission --> success < 4 AND != 1
//    unauth without permission --> success < 4 AND != 1
//  update
//    setuplimited without permission --> fail
//    user with permission --> fail
//    user without permission --> fail
//    unauth with permission --> fail
//    unauth without permission --> fail
//    admin --> success
//    setuplimited with permission --> success
//  delete
//    setuplimited without permission --> fail
//    user with permission --> fail
//    user without permission --> fail
//    unauth with permission --> fail
//    unauth without permission --> fail
//    admin --> success
//    setuplimited with permission --> success

import { test, expect } from '@playwright/test';
import {
  supabaseLogin,
  supabaseCreatePermission,
  supabaseDeletePermissions,
  supabaseInsert,
  supabaseSelect,
  supabaseUpdate,
  supabaseDelete,
} from './helperSupabase.js';

//#region insert
//    admin --> success
test('4422_security_setup_settings:insert_admin_success', async ({ page }) => {
  let lsuccess = await supabaseInsert({
    punauth: false,
    puseremail: process.env.PADMINEMAIL,
    puserpassword: process.env.PADMINPASSWORD,
    ptable: 'settings',
    precord: {
      id: '11111111-1111-1111-1111-111111111101',
      api_name: 'c_pwsetting1__11111111_1111_1111_1111_111111111101',
      name: 'PW Setting 1',
    },
  });

  if (lsuccess == false) {
    throw new Error('4422: assert failed');
  }
});

//    setuplimited with permission --> success
test('4422_security_setup_settings:insert_setuplimitedwithpermission_success', async ({ page }) => {
  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
  });

  await supabaseCreatePermission({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
    ppermissionname: 'setuplimited',
  });

  await supabaseCreatePermission({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
    ppermissionname: 'settings.setup.insert',
  });

  let lsuccess = await supabaseInsert({
    punauth: false,
    puseremail: process.env.PUSEREMAIL,
    puserpassword: process.env.PUSERPASSWORD,
    ptable: 'settings',
    precord: {
      id: '11111111-1111-1111-1111-111111111102',
      api_name: 'c_pwsetting2__11111111_1111_1111_1111_111111111102',
      name: 'PW Setting 2',
    },
  });

  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
  });

  if (lsuccess == false) {
    throw new Error('4422: assert failed');
  }
});

//    setuplimited without permission --> fail
test('4422_security_setup_settings:insert_setuplimitedwithoutpermission_fail', async ({ page }) => {
  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
  });

  await supabaseCreatePermission({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
    ppermissionname: 'setuplimited',
  });

  let lsuccess = await supabaseInsert({
    punauth: false,
    puseremail: process.env.PUSEREMAIL,
    puserpassword: process.env.PUSERPASSWORD,
    ptable: 'settings',
    precord: {
      id: '11111111-1111-1111-1111-111111111103',
      api_name: 'c_pwsetting3__11111111_1111_1111_1111_111111111103',
      name: 'PW Setting 3',
    },
  });

  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
  });

  if (lsuccess == true) {
    throw new Error('4422: assert failed');
  }
});

//    user with permission --> fail
test('4422_security_setup_settings:insert_userwithpermission_fail', async ({ page }) => {
  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
  });

  await supabaseCreatePermission({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
    ppermissionname: 'settings.setup.insert',
  });

  let lsuccess = await supabaseInsert({
    punauth: false,
    puseremail: process.env.PUSEREMAIL,
    puserpassword: process.env.PUSERPASSWORD,
    ptable: 'settings',
    precord: {
      id: '11111111-1111-1111-1111-111111111104',
      api_name: 'c_pwsetting4__11111111_1111_1111_1111_111111111104',
      name: 'PW Setting 4',
    },
  });

  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
  });

  if (lsuccess == true) {
    throw new Error('4422: assert failed');
  }
});

//    user without permission --> fail
test('4422_security_setup_settings:insert_userwithoutpermission_fail', async ({ page }) => {
  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
  });

  let lsuccess = await supabaseInsert({
    punauth: false,
    puseremail: process.env.PUSEREMAIL,
    puserpassword: process.env.PUSERPASSWORD,
    ptable: 'settings',
    precord: {
      id: '11111111-1111-1111-1111-111111111105',
      api_name: 'c_pwsetting5__11111111_1111_1111_1111_111111111105',
      name: 'PW Setting 5',
    },
  });

  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
  });

  if (lsuccess == true) {
    throw new Error('4422: assert failed');
  }
});

//    unauth with permission --> fail
test('4422_security_setup_settings:insert_unauthwithpermission_fail', async ({ page }) => {
  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '43bf8fe6-9add-4ff4-b759-f8e1445f5914',
  });

  await supabaseCreatePermission({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '43bf8fe6-9add-4ff4-b759-f8e1445f5914',
    ppermissionname: 'settings.setup.insert',
  });

  let lsuccess = await supabaseInsert({
    punauth: true,
    puseremail: '',
    puserpassword: '',
    ptable: 'settings',
    precord: {
      id: '11111111-1111-1111-1111-111111111106',
      api_name: 'c_pwsetting6__11111111_1111_1111_1111_111111111106',
      name: 'PW Setting 6',
    },
  });

  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '43bf8fe6-9add-4ff4-b759-f8e1445f5914',
  });

  if (lsuccess == true) {
    throw new Error('4422: assert failed');
  }
});

//    unauth without permission --> fail
test('4422_security_setup_settings:insert_unauthwithoutpermission_fail', async ({ page }) => {
  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '43bf8fe6-9add-4ff4-b759-f8e1445f5914',
  });

  let lsuccess = await supabaseInsert({
    punauth: true,
    puseremail: '',
    puserpassword: '',
    ptable: 'settings',
    precord: {
      id: '11111111-1111-1111-1111-111111111107',
      api_name: 'c_pwsetting7__11111111_1111_1111_1111_111111111107',
      name: 'PW Setting 7',
    },
  });

  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '43bf8fe6-9add-4ff4-b759-f8e1445f5914',
  });

  if (lsuccess == true) {
    throw new Error('4422: assert failed');
  }
});
//#endregion

//#region select
//    admin --> success < 4 AND != 1
test('4422_security_setup_settings:select_admin_success', async ({ page }) => {
  let lresponse1 = await supabaseSelect({
    punauth: false,
    puseremail: process.env.PADMINEMAIL,
    puserpassword: process.env.PADMINPASSWORD,
    ptable: 'settings',
    pfilter: false,
  });

  if (lresponse1.length < 4) {
    throw new Error('4422: assert failed');
  }

  let lresponse2 = await supabaseSelect({
    punauth: false,
    puseremail: process.env.PADMINEMAIL,
    puserpassword: process.env.PADMINPASSWORD,
    ptable: 'settings',
    pfilter: true,
    pid: 'api_name',
    pidvalue: 'c_pwsetting1__11111111_1111_1111_1111_111111111101',
  });

  if (lresponse2.length != 1) {
    throw new Error('4422: assert failed');
  }
});

//    setuplimited with permission --> success < 4 AND != 1
test('4422_security_setup_settings:select_setuplimitedwithpermission_success', async ({ page }) => {
  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
  });

  await supabaseCreatePermission({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
    ppermissionname: 'setuplimited',
  });

  await supabaseCreatePermission({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
    ppermissionname: 'settings.setup.select',
  });

  let lresponse1 = await supabaseSelect({
    punauth: false,
    puseremail: process.env.PUSEREMAIL,
    puserpassword: process.env.PUSERPASSWORD,
    ptable: 'settings',
    pfilter: false,
  });

  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
  });

  if (lresponse1.length < 4) {
    throw new Error('4422: assert failed');
  }

  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
  });

  await supabaseCreatePermission({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
    ppermissionname: 'setuplimited',
  });

  await supabaseCreatePermission({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
    ppermissionname: 'settings.setup.select',
  });

  let lresponse2 = await supabaseSelect({
    punauth: false,
    puseremail: process.env.PUSEREMAIL,
    puserpassword: process.env.PUSERPASSWORD,
    ptable: 'settings',
    pfilter: true,
    pid: 'api_name',
    pidvalue: 'c_pwsetting1__11111111_1111_1111_1111_111111111101',
  });

  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
  });

  if (lresponse2.length != 1) {
    throw new Error('4422: assert failed');
  }
});

//    setuplimited without permissions --> success < 4 AND != 1
test('4422_security_setup_settings:select_setuplimitedwithoutpermission_success', async ({
  page,
}) => {
  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
  });

  await supabaseCreatePermission({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
    ppermissionname: 'setuplimited',
  });

  let lresponse1 = await supabaseSelect({
    punauth: false,
    puseremail: process.env.PUSEREMAIL,
    puserpassword: process.env.PUSERPASSWORD,
    ptable: 'settings',
    pfilter: false,
  });

  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
  });

  if (lresponse1.length < 4) {
    throw new Error('4422: assert failed');
  }

  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
  });

  await supabaseCreatePermission({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
    ppermissionname: 'setuplimited',
  });

  let lresponse2 = await supabaseSelect({
    punauth: false,
    puseremail: process.env.PUSEREMAIL,
    puserpassword: process.env.PUSERPASSWORD,
    ptable: 'settings',
    pfilter: true,
    pid: 'api_name',
    pidvalue: 'c_pwsetting1__11111111_1111_1111_1111_111111111101',
  });

  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
  });

  if (lresponse2.length != 1) {
    throw new Error('4422: assert failed');
  }
});

//    user with permissions --> success < 4 AND != 1
test('4422_security_setup_settings:select_userwithpermission_success', async ({ page }) => {
  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
  });

  await supabaseCreatePermission({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
    ppermissionname: 'settings.setup.select',
  });

  let lresponse1 = await supabaseSelect({
    punauth: false,
    puseremail: process.env.PUSEREMAIL,
    puserpassword: process.env.PUSERPASSWORD,
    ptable: 'settings',
    pfilter: false,
  });

  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
  });

  if (lresponse1.length < 4) {
    throw new Error('4422: assert failed');
  }

  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
  });

  await supabaseCreatePermission({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
    ppermissionname: 'settings.setup.select',
  });

  let lresponse2 = await supabaseSelect({
    punauth: false,
    puseremail: process.env.PUSEREMAIL,
    puserpassword: process.env.PUSERPASSWORD,
    ptable: 'settings',
    pfilter: true,
    pid: 'api_name',
    pidvalue: 'c_pwsetting1__11111111_1111_1111_1111_111111111101',
  });

  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
  });

  if (lresponse2.length != 1) {
    throw new Error('4422: assert failed');
  }
});

//    user without permission --> fail
test('4422_security_setup_settings:select_userwithoutpermission_success', async ({ page }) => {
  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
  });

  let lresponse1 = await supabaseSelect({
    punauth: false,
    puseremail: process.env.PUSEREMAIL,
    puserpassword: process.env.PUSERPASSWORD,
    ptable: 'settings',
    pfilter: false,
  });

  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
  });

  if (lresponse1.length < 4) {
    throw new Error('4422: assert failed');
  }

  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
  });

  let lresponse2 = await supabaseSelect({
    punauth: false,
    puseremail: process.env.PUSEREMAIL,
    puserpassword: process.env.PUSERPASSWORD,
    ptable: 'settings',
    pfilter: true,
    pid: 'api_name',
    pidvalue: 'c_pwsetting1__11111111_1111_1111_1111_111111111101',
  });

  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
  });

  if (lresponse2.length != 1) {
    throw new Error('4422: assert failed');
  }
});

//    unauth with permission --> success < 4 AND != 1
test('4422_security_setup_settings:select_unauthwithoutpermission_success', async ({ page }) => {
  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '43bf8fe6-9add-4ff4-b759-f8e1445f5914',
  });

  let lresponse1 = await supabaseSelect({
    punauth: true,
    puseremail: '',
    puserpassword: '',
    ptable: 'settings',
    pfilter: false,
  });

  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '43bf8fe6-9add-4ff4-b759-f8e1445f5914',
  });

  if (lresponse1.length < 4) {
    throw new Error('4422: assert failed');
  }

  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '43bf8fe6-9add-4ff4-b759-f8e1445f5914',
  });

  let lresponse2 = await supabaseSelect({
    punauth: true,
    puseremail: '',
    puserpassword: '',
    ptable: 'settings',
    pfilter: true,
    pid: 'api_name',
    pidvalue: 'c_pwsetting1__11111111_1111_1111_1111_111111111101',
  });

  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '43bf8fe6-9add-4ff4-b759-f8e1445f5914',
  });

  if (lresponse2.length != 1) {
    throw new Error('4422: assert failed');
  }
});

//    unauth without permission --> success < 4 AND != 1
test('4422_security_setup_settings:select_unauthwithpermission_success', async ({ page }) => {
  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '43bf8fe6-9add-4ff4-b759-f8e1445f5914',
  });

  await supabaseCreatePermission({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '43bf8fe6-9add-4ff4-b759-f8e1445f5914',
    ppermissionname: 'settings.setup.select',
  });

  let lresponse1 = await supabaseSelect({
    punauth: true,
    puseremail: '',
    puserpassword: '',
    ptable: 'settings',
    pfilter: false,
  });

  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '43bf8fe6-9add-4ff4-b759-f8e1445f5914',
  });

  if (lresponse1.length < 4) {
    throw new Error('4422: assert failed');
  }

  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '43bf8fe6-9add-4ff4-b759-f8e1445f5914',
  });

  await supabaseCreatePermission({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '43bf8fe6-9add-4ff4-b759-f8e1445f5914',
    ppermissionname: 'settings.setup.select',
  });

  let lresponse2 = await supabaseSelect({
    punauth: true,
    puseremail: '',
    puserpassword: '',
    ptable: 'settings',
    pfilter: true,
    pid: 'api_name',
    pidvalue: 'c_pwsetting1__11111111_1111_1111_1111_111111111101',
  });

  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '43bf8fe6-9add-4ff4-b759-f8e1445f5914',
  });

  if (lresponse2.length != 1) {
    throw new Error('4422: assert failed');
  }
});

//#endregion

//#region update
//    setuplimited without permission --> fail
test('4422_security_setup_settings:update_setuplimitedwithoutpermission_success', async ({
  page,
}) => {
  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
  });

  await supabaseCreatePermission({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
    ppermissionname: 'setuplimited',
  });

  let lsuccess = await supabaseUpdate({
    punauth: false,
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    puseremail: process.env.PUSEREMAIL,
    puserpassword: process.env.PUSERPASSWORD,
    ptable: 'settings',
    pid: 'api_name',
    pidvalue: 'c_pwsetting2__11111111_1111_1111_1111_111111111102',
    precord: {
      id: '11111111-1111-1111-1111-111111111102',
      api_name: 'c_pwsetting2__11111111_1111_1111_1111_111111111102',
      name: 'PW Setting 2 UPDATE',
    },
    pcolumn: 'name',
    pcolumnvalue: 'PW Setting 2 UPDATE',
  });

  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
  });

  if (lsuccess == true) {
    throw new Error('4422: assert failed');
  }
});

//    user with permission --> fail
test('4422_security_setup_settings:update_userwithpermission_success', async ({ page }) => {
  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
  });

  await supabaseCreatePermission({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
    ppermissionname: 'settings.setup.update',
  });

  let lsuccess = await supabaseUpdate({
    punauth: false,
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    puseremail: process.env.PUSEREMAIL,
    puserpassword: process.env.PUSERPASSWORD,
    ptable: 'settings',
    pid: 'api_name',
    pidvalue: 'c_pwsetting2__11111111_1111_1111_1111_111111111102',
    precord: {
      id: '11111111-1111-1111-1111-111111111102',
      api_name: 'c_pwsetting2__11111111_1111_1111_1111_111111111102',
      name: 'PW Setting 2 UPDATE',
    },
    pcolumn: 'name',
    pcolumnvalue: 'PW Setting 2 UPDATE',
  });

  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
  });

  if (lsuccess == true) {
    throw new Error('4422: assert failed');
  }
});

//    user without permission --> fail
test('4422_security_setup_settings:update_userwithoutpermission_success', async ({ page }) => {
  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
  });

  let lsuccess = await supabaseUpdate({
    punauth: false,
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    puseremail: process.env.PUSEREMAIL,
    puserpassword: process.env.PUSERPASSWORD,
    ptable: 'settings',
    pid: 'api_name',
    pidvalue: 'c_pwsetting2__11111111_1111_1111_1111_111111111102',
    precord: {
      id: '11111111-1111-1111-1111-111111111102',
      api_name: 'c_pwsetting2__11111111_1111_1111_1111_111111111102',
      name: 'PW Setting 2 UPDATE',
    },
    pcolumn: 'name',
    pcolumnvalue: 'PW Setting 2 UPDATE',
  });

  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
  });

  if (lsuccess == true) {
    throw new Error('4422: assert failed');
  }
});

//    unauth with permission --> fail
test('4422_security_setup_settings:update_unauthwithpermission_success', async ({ page }) => {
  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '43bf8fe6-9add-4ff4-b759-f8e1445f5914',
  });

  await supabaseCreatePermission({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '43bf8fe6-9add-4ff4-b759-f8e1445f5914',
    ppermissionname: 'settings.setup.update',
  });

  let lsuccess = await supabaseUpdate({
    punauth: true,
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    puseremail: '',
    puserpassword: '',
    ptable: 'settings',
    pid: 'api_name',
    pidvalue: 'c_pwsetting2__11111111_1111_1111_1111_111111111102',
    precord: {
      id: '11111111-1111-1111-1111-111111111102',
      api_name: 'c_pwsetting2__11111111_1111_1111_1111_111111111102',
      name: 'PW Setting 2 UPDATE',
    },
    pcolumn: 'name',
    pcolumnvalue: 'PW Setting 2 UPDATE',
  });

  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '43bf8fe6-9add-4ff4-b759-f8e1445f5914',
  });

  if (lsuccess == true) {
    throw new Error('4422: assert failed');
  }
});

//    unauth without permission --> fail
test('4422_security_setup_settings:update_unauthwithoutpermission_success', async ({ page }) => {
  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '43bf8fe6-9add-4ff4-b759-f8e1445f5914',
  });

  let lsuccess = await supabaseUpdate({
    punauth: true,
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    puseremail: '',
    puserpassword: '',
    ptable: 'settings',
    pid: 'api_name',
    pidvalue: 'c_pwsetting2__11111111_1111_1111_1111_111111111102',
    precord: {
      id: '11111111-1111-1111-1111-111111111102',
      api_name: 'c_pwsetting2__11111111_1111_1111_1111_111111111102',
      name: 'PW Setting 2 UPDATE',
    },
    pcolumn: 'name',
    pcolumnvalue: 'PW Setting 2 UPDATE',
  });

  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '43bf8fe6-9add-4ff4-b759-f8e1445f5914',
  });

  if (lsuccess == true) {
    throw new Error('4422: assert failed');
  }
});

//    admin --> success
test('4422_security_setup_settings:update_admin_success', async ({ page }) => {
  let lsuccess = await supabaseUpdate({
    punauth: false,
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    puseremail: process.env.PADMINEMAIL,
    puserpassword: process.env.PADMINPASSWORD,
    ptable: 'settings',
    pid: 'api_name',
    pidvalue: 'c_pwsetting1__11111111_1111_1111_1111_111111111101',
    precord: {
      id: '11111111-1111-1111-1111-111111111101',
      api_name: 'c_pwsetting1__11111111_1111_1111_1111_111111111101',
      name: 'PW Setting 1 UPDATE',
    },
    pcolumn: 'name',
    pcolumnvalue: 'PW Setting 1 UPDATE',
  });

  if (lsuccess == false) {
    throw new Error('4422: assert failed');
  }
});

//    setuplimited with permission --> success
test('4422_security_setup_settings:update_setuplimitedwithpermission_success', async ({ page }) => {
  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
  });

  await supabaseCreatePermission({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
    ppermissionname: 'setuplimited',
  });

  await supabaseCreatePermission({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
    ppermissionname: 'settings.setup.update',
  });

  let lsuccess = await supabaseUpdate({
    punauth: false,
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    puseremail: process.env.PUSEREMAIL,
    puserpassword: process.env.PUSERPASSWORD,
    ptable: 'settings',
    pid: 'api_name',
    pidvalue: 'c_pwsetting2__11111111_1111_1111_1111_111111111102',
    precord: {
      id: '11111111-1111-1111-1111-111111111102',
      api_name: 'c_pwsetting2__11111111_1111_1111_1111_111111111102',
      name: 'PW Setting 2 UPDATE',
    },
    pcolumn: 'name',
    pcolumnvalue: 'PW Setting 2 UPDATE',
  });

  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
  });

  if (lsuccess == false) {
    throw new Error('4422: assert failed');
  }
});

//#endregion

//#region delete
//    setuplimited without permission --> fail
test('4422_security_setup_settings:delete_setuplimitedwithoutpermission_success', async ({
  page,
}) => {
  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
  });

  await supabaseCreatePermission({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
    ppermissionname: 'setuplimited',
  });

  let lsuccess = await supabaseDelete({
    punauth: false,
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    puseremail: process.env.PUSEREMAIL,
    puserpassword: process.env.PUSERPASSWORD,
    ptable: 'settings',
    pid: 'api_name',
    pidvalue: 'c_pwsetting1__11111111_1111_1111_1111_111111111101',
  });

  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
  });

  if (lsuccess == true) {
    throw new Error('4422: assert failed');
  }
});

//    user with permission --> fail
test('4422_security_setup_settings:delete_userwithpermission_success', async ({ page }) => {
  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
  });

  await supabaseCreatePermission({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
    ppermissionname: 'settings.setup.delete',
  });

  let lsuccess = await supabaseDelete({
    punauth: false,
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    puseremail: process.env.PUSEREMAIL,
    puserpassword: process.env.PUSERPASSWORD,
    ptable: 'settings',
    pid: 'api_name',
    pidvalue: 'c_pwsetting1__11111111_1111_1111_1111_111111111101',
  });

  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
  });

  if (lsuccess == true) {
    throw new Error('4422: assert failed');
  }
});

//    user without permission --> fail
test('4422_security_setup_settings:delete_userwithoutpermission_success', async ({ page }) => {
  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
  });

  let lsuccess = await supabaseDelete({
    punauth: false,
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    puseremail: process.env.PUSEREMAIL,
    puserpassword: process.env.PUSERPASSWORD,
    ptable: 'settings',
    pid: 'api_name',
    pidvalue: 'c_pwsetting1__11111111_1111_1111_1111_111111111101',
  });

  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
  });

  if (lsuccess == true) {
    throw new Error('4422: assert failed');
  }
});

//    unauth with permission --> fail
test('4422_security_setup_settings:delete_unauthwithpermission_success', async ({ page }) => {
  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '43bf8fe6-9add-4ff4-b759-f8e1445f5914',
  });

  await supabaseCreatePermission({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '43bf8fe6-9add-4ff4-b759-f8e1445f5914',
    ppermissionname: 'settings.setup.delete',
  });

  let lsuccess = await supabaseDelete({
    punauth: true,
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    puseremail: '',
    puserpassword: '',
    ptable: 'settings',
    pid: 'api_name',
    pidvalue: 'c_pwsetting1__11111111_1111_1111_1111_111111111101',
  });

  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '43bf8fe6-9add-4ff4-b759-f8e1445f5914',
  });

  if (lsuccess == true) {
    throw new Error('4422: assert failed');
  }
});

//    unauth without permission --> fail
test('4422_security_setup_settings:delete_unauthwithoutpermission_success', async ({ page }) => {
  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '43bf8fe6-9add-4ff4-b759-f8e1445f5914',
  });

  let lsuccess = await supabaseDelete({
    punauth: true,
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    puseremail: '',
    puserpassword: '',
    ptable: 'settings',
    pid: 'api_name',
    pidvalue: 'c_pwsetting1__11111111_1111_1111_1111_111111111101',
  });

  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '43bf8fe6-9add-4ff4-b759-f8e1445f5914',
  });

  if (lsuccess == true) {
    throw new Error('4422: assert failed');
  }
});

//    admin --> success
test('4422_security_setup_settings:delete_admin_success', async ({ page }) => {
  let lsuccess = await supabaseDelete({
    punauth: false,
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    puseremail: process.env.PADMINEMAIL,
    puserpassword: process.env.PADMINPASSWORD,
    ptable: 'settings',
    pid: 'api_name',
    pidvalue: 'c_pwsetting1__11111111_1111_1111_1111_111111111101',
  });

  if (lsuccess == false) {
    throw new Error('4422: assert failed');
  }
});

//    setuplimited with permission --> success
test('4422_security_setup_settings:delete_setuplimitedwithpermission_success', async ({ page }) => {
  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
  });

  await supabaseCreatePermission({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
    ppermissionname: 'setuplimited',
  });

  await supabaseCreatePermission({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
    ppermissionname: 'settings.setup.delete',
  });

  let lsuccess = await supabaseDelete({
    punauth: false,
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    puseremail: process.env.PUSEREMAIL,
    puserpassword: process.env.PUSERPASSWORD,
    ptable: 'settings',
    pid: 'api_name',
    pidvalue: 'c_pwsetting2__11111111_1111_1111_1111_111111111102',
  });

  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '26c7320f-49af-4cb2-a1a5-197669492ed8',
  });

  if (lsuccess == false) {
    throw new Error('4422: assert failed');
  }
});
//#endregion

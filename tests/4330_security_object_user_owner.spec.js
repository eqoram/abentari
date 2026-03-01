import { test, expect } from '@playwright/test';
import {
  createObject,
  deleteObject,
  securitySelect,
  securityInsert,
  securityUpdate,
  securityDelete,
} from './helper4320.js';

test('security create object', async ({ page }) => {
  let lsuccess = await createObject(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    '561c33cd-5f98-4309-92a4-e4cefcc7bd4a',
    'c_pwsecurity2__561c33cd_5f98_4309_92a4_e4cefcc7bd4a',
    'PW Security 2',
    'yes',
    'c_pwsecurity2__561c33cd_5f98_4309_92a4_e4cefcc7bd4a.owner.',
  );

  if (lsuccess == false) {
    throw new Error('security create object: assert failed');
  }
});

test('security user select', async ({ page }) => {
  let lresponse = await securitySelect(
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'c_pwsecurity2__561c33cd_5f98_4309_92a4_e4cefcc7bd4a',
  );

  if (lresponse.length > 0) {
    throw new Error('security user select: assert failed');
  }
});

// test('security admin select', async ({ page }) => {
//   let lresponse = await securitySelect(
//     process.env.PADMINEMAIL,
//     process.env.PADMINPASSWORD,
//     'c_pwsecurity2__561c33cd_5f98_4309_92a4_e4cefcc7bd4a',
//   );

//   if (lresponse.length <= 0) {
//     throw new Error('security admin select: assert failed');
//   }
// });

test('security user insert', async ({ page }) => {
  let lsuccess = await securityInsert(
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'c_pwsecurity2__561c33cd_5f98_4309_92a4_e4cefcc7bd4a',
    'pw_helper4330_user_securityInsert1: ' + process.env.PJOBID,
    'd0565959-730e-4ac3-a278-d2e88b66f026',
  );

  if (lsuccess == false) {
    throw new Error('security user insert: assert failed');
  }
});

// test('security admin insert', async ({ page }) => {
//   let lsuccess = await securityInsert(
//     process.env.PADMINEMAIL,
//     process.env.PADMINPASSWORD,
//     'c_pwsecurity2__561c33cd_5f98_4309_92a4_e4cefcc7bd4a',
//     'pw_helper4330_admin_securityInsert1: ' + process.env.PJOBID,
//   );

//   if (lsuccess == false) {
//     throw new Error('security admin insert: assert failed');
//   }
// });

test('security user update', async ({ page }) => {
  let lsuccess = await securityUpdate(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'c_pwsecurity2__561c33cd_5f98_4309_92a4_e4cefcc7bd4a',
    'pw_helper4330_user_securityInsert1: ' + process.env.PJOBID,
    'pw_helper4330_user_securityUpdate1:' + process.env.PJOBID,
    'd0565959-730e-4ac3-a278-d2e88b66f026',
  );

  if (lsuccess == false) {
    throw new Error('security user insert: assert failed');
  }
});

test('security user update again', async ({ page }) => {
  let lsuccess = await securityUpdate(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'c_pwsecurity2__561c33cd_5f98_4309_92a4_e4cefcc7bd4a',
    'pw_helper4330_user_securityUpdate1: ' + process.env.PJOBID,
    'pw_helper4330_user_securityUpdate1AGAIN:' + process.env.PJOBID,
    'fca33e69-75a4-459e-b927-2ac18900fe12',
  );

  if (lsuccess == true) {
    throw new Error('security user insert: assert failed');
  }
});

// test('security admin update', async ({ page }) => {
//   let lsuccess = await securityUpdate(
//     process.env.PADMINEMAIL,
//     process.env.PADMINPASSWORD,
//     process.env.PADMINEMAIL,
//     process.env.PADMINPASSWORD,
//     'c_pwsecurity2__561c33cd_5f98_4309_92a4_e4cefcc7bd4a',
//     'pw_helper4330_admin_securityInsert1: ' + process.env.PJOBID,
//     'pw_helper4330_admin_securityUpdate2' + process.env.PJOBID,
//   );

//   if (lsuccess == false) {
//     throw new Error('security admin insert: assert failed');
//   }
// });

test('security user select again', async ({ page }) => {
  let lresponse = await securitySelect(
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'c_pwsecurity2__561c33cd_5f98_4309_92a4_e4cefcc7bd4a',
  );

  if (lresponse.length == 0) {
    throw new Error('security user select: assert failed');
  }
});

test('security user delete', async ({ page }) => {
  let lsuccess = await securityDelete(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'c_pwsecurity2__561c33cd_5f98_4309_92a4_e4cefcc7bd4a',
    'pw_helper4330_user_securityUpdate1:' + process.env.PJOBID,
  );

  if (lsuccess == false) {
    throw new Error('security user delete: assert failed');
  }
});

// test('security admin delete', async ({ page }) => {
//   let lsuccess = await securityDelete(
//     process.env.PADMINEMAIL,
//     process.env.PADMINPASSWORD,
//     process.env.PADMINEMAIL,
//     process.env.PADMINPASSWORD,
//     'c_pwsecurity2__561c33cd_5f98_4309_92a4_e4cefcc7bd4a',
//     'pw_helper4330_admin_securityUpdate2' + process.env.PJOBID,
//   );

//   if (lsuccess == false) {
//     throw new Error('security admin delete: assert failed');
//   }
// });

test('security delete object', async ({ page }) => {
  let lsuccess = await deleteObject(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    'c_pwsecurity2__561c33cd_5f98_4309_92a4_e4cefcc7bd4a',
  );

  if (lsuccess == false) {
    throw new Error('security delete object: assert failed');
  }
});

// two
test('security create object two', async ({ page }) => {
  let lsuccess = await createObject(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    'cd362002-9bde-41d8-baf8-9d3326b95f4f',
    'c_pwsecurity7__cd362002_9bde_41d8_baf8_9d3326b95f4f',
    'PW Security 7',
    'yes',
    'c_pwsecurity7__cd362002_9bde_41d8_baf8_9d3326b95f4f.owner.',
  );

  if (lsuccess == false) {
    throw new Error('security create object: assert failed');
  }
});

test('security admin insert two', async ({ page }) => {
  let lsuccess = await securityInsert(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    'c_pwsecurity7__cd362002_9bde_41d8_baf8_9d3326b95f4f',
    'pw_helper4330_user_securityInsertTWO1: ' + process.env.PJOBID,
    'fca33e69-75a4-459e-b927-2ac18900fe12',
  );

  if (lsuccess == false) {
    throw new Error('security user insert: assert failed');
  }
});

test('security user select two', async ({ page }) => {
  let lresponse = await securitySelect(
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'c_pwsecurity7__cd362002_9bde_41d8_baf8_9d3326b95f4f',
  );

  if (lresponse.length > 0) {
    throw new Error('security user select: assert failed');
  }
});

test('security user insert two', async ({ page }) => {
  let lsuccess = await securityInsert(
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'c_pwsecurity7__cd362002_9bde_41d8_baf8_9d3326b95f4f',
    'pw_helper4330_user_securityInsertTWO2: ' + process.env.PJOBID,
    'fca33e69-75a4-459e-b927-2ac18900fe12',
  );

  if (lsuccess == true) {
    throw new Error('security user insert: assert failed');
  }
});

test('security user update two', async ({ page }) => {
  let lsuccess = await securityUpdate(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'c_pwsecurity7__cd362002_9bde_41d8_baf8_9d3326b95f4f',
    'pw_helper4330_user_securityInsertTWO1: ' + process.env.PJOBID,
    'pw_helper4330_user_securityUpdateTWO1:' + process.env.PJOBID,
    'd0565959-730e-4ac3-a278-d2e88b66f026',
  );

  if (lsuccess == true) {
    throw new Error('security user insert: assert failed');
  }
});

test('security user delete two', async ({ page }) => {
  let lsuccess = await securityDelete(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'c_pwsecurity7__cd362002_9bde_41d8_baf8_9d3326b95f4f',
    'pw_helper4330_user_securityInsertTWO1: ' + process.env.PJOBID,
  );

  if (lsuccess == true) {
    throw new Error('security user delete: assert failed');
  }
});

test('security delete object two', async ({ page }) => {
  let lsuccess = await deleteObject(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    'c_pwsecurity7__cd362002_9bde_41d8_baf8_9d3326b95f4f',
  );

  if (lsuccess == false) {
    throw new Error('security delete object: assert failed');
  }
});

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
    '37b2b188-476d-4961-9082-f2841a840570',
    'c_pwsecurity3__37b2b188_476d_4961_9082_f2841a840570',
    'PW Security 3',
    'yes',
    'c_pwsecurity3__37b2b188_476d_4961_9082_f2841a840570.all.',
  );

  if (lsuccess == false) {
    throw new Error('security create object: assert failed');
  }
});

test('security user select', async ({ page }) => {
  let lresponse = await securitySelect(
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'c_pwsecurity3__37b2b188_476d_4961_9082_f2841a840570',
  );

  if (lresponse.length == 0) {
    throw new Error('security user select: assert failed');
  }
});

// test('security admin select', async ({ page }) => {
//   let lresponse = await securitySelect(
//     process.env.PADMINEMAIL,
//     process.env.PADMINPASSWORD,
//     'c_pwsecurity3__37b2b188_476d_4961_9082_f2841a840570',
//   );

//   if (lresponse.length <= 0) {
//     throw new Error('security admin select: assert failed');
//   }
// });

test('security user insert', async ({ page }) => {
  let lsuccess = await securityInsert(
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'c_pwsecurity3__37b2b188_476d_4961_9082_f2841a840570',
    'pw_helper4330_user_securityInsert1: ' + process.env.PJOBID,
    'd0565959-730e-4ac3-a278-d2e88b66f026',
  );

  if (lsuccess == false) {
    throw new Error('security usert insert: assert failed');
  }
});

// test('security admin insert', async ({ page }) => {
//   let lsuccess = await securityInsert(
//     process.env.PADMINEMAIL,
//     process.env.PADMINPASSWORD,
//     'c_pwsecurity3__37b2b188_476d_4961_9082_f2841a840570',
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
    'c_pwsecurity3__37b2b188_476d_4961_9082_f2841a840570',
    'pw_helper4330_user_securityInsert1: ' + process.env.PJOBID,
    'pw_helper4330_user_securityUpdate1' + process.env.PJOBID,
    'd0565959-730e-4ac3-a278-d2e88b66f026',
  );

  if (lsuccess == false) {
    throw new Error('security usert insert: assert failed');
  }
});

// test('security admin update', async ({ page }) => {
//   let lsuccess = await securityUpdate(
//     process.env.PADMINEMAIL,
//     process.env.PADMINPASSWORD,
//     process.env.PADMINEMAIL,
//     process.env.PADMINPASSWORD,
//     'c_pwsecurity3__37b2b188_476d_4961_9082_f2841a840570',
//     'pw_helper4330_admin_securityInsert1: ' + process.env.PJOBID,
//     'pw_helper4330_admin_securityUpdate2' + process.env.PJOBID,
//   );

//   if (lsuccess == false) {
//     throw new Error('security admin insert: assert failed');
//   }
// });

test('security user delete', async ({ page }) => {
  let lsuccess = await securityDelete(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'c_pwsecurity3__37b2b188_476d_4961_9082_f2841a840570',
    'pw_helper4330_user_securityUpdate1' + process.env.PJOBID,
  );

  if (lsuccess == false) {
    throw new Error('security usert delete: assert failed');
  }
});

// test('security admin delete', async ({ page }) => {
//   let lsuccess = await securityDelete(
//     process.env.PADMINEMAIL,
//     process.env.PADMINPASSWORD,
//     process.env.PADMINEMAIL,
//     process.env.PADMINPASSWORD,
//     'c_pwsecurity3__37b2b188_476d_4961_9082_f2841a840570',
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
    'c_pwsecurity3__37b2b188_476d_4961_9082_f2841a840570',
  );

  if (lsuccess == false) {
    throw new Error('security delete object: assert failed');
  }
});

import { test, expect } from '@playwright/test';
import {
  createObject,
  createPermission,
  deletePermissions,
  deleteObject,
  securitySelect,
  securityInsert,
  securityUpdate,
  securityDelete,
} from './helper4320.js';

test('security setuplimited select without permission', async ({ page }) => {
  let lresponse = await securitySelect(
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'objects',
  );

  if (lresponse.length > 0) {
    throw new Error('security setuplimited select without permission: assert failed');
  }
});

test('security setuplimited add permission', async ({ page }) => {
  await createPermission(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    '26c7320f-49af-4cb2-a1a5-197669492ed8',
    'setuplimited',
  );

  await createPermission(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    '26c7320f-49af-4cb2-a1a5-197669492ed8',
    'objects.setup.select',
  );
});

test('security setuplimited select with permission', async ({ page }) => {
  let lresponse = await securitySelect(
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'objects',
  );

  if (lresponse.length == 0) {
    throw new Error('security setuplimited select with permission: assert failed');
  }
});

test('security setuplimited select with permission another object1', async ({ page }) => {
  let lresponse = await securitySelect(
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'profiles',
  );

  if (lresponse.length > 1) {
    throw new Error('security setuplimited select with permission another object1: assert failed');
  }
});

test('security setuplimited create object', async ({ page }) => {
  let lsuccess = await createObject(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    'aec9c01b-13a5-48e4-b2d4-318056a51a64',
    'c_pwsecurity8__aec9c01b_13a5_48e4_b2d4_318056a51a64',
    'PW Security 8',
  );

  if (lsuccess == false) {
    throw new Error('security setuplimited create object: assert failed');
  }
});

test('security setuplimited insert fail', async ({ page }) => {
  let lsuccess = await securityInsert(
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'c_pwsecurity8__aec9c01b_13a5_48e4_b2d4_318056a51a64',
    'pw_helper4330_useradmin_securityInsert1: ' + process.env.PJOBID,
    'd0565959-730e-4ac3-a278-d2e88b66f026',
  );

  if (lsuccess == true) {
    throw new Error('security setuplimited insert fail: assert failed');
  }
});

test('security setuplimited insert success', async ({ page }) => {
  await createPermission(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    '26c7320f-49af-4cb2-a1a5-197669492ed8',
    'c_pwsecurity8__aec9c01b_13a5_48e4_b2d4_318056a51a64.all.insert',
  );

  let lsuccess = await securityInsert(
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'c_pwsecurity8__aec9c01b_13a5_48e4_b2d4_318056a51a64',
    'pw_helper4330_useradmin_securityInsert1: ' + process.env.PJOBID,
    'd0565959-730e-4ac3-a278-d2e88b66f026',
  );

  if (lsuccess == false) {
    throw new Error('security setuplimited insert success');
  }
});

test('security setuplimited select fail', async ({ page }) => {
  let lresponse = await securitySelect(
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'c_pwsecurity8__aec9c01b_13a5_48e4_b2d4_318056a51a64',
  );

  if (lresponse.length > 0) {
    throw new Error('security setuplimited select fail: assert failed');
  }
});

test('security setuplimited select success', async ({ page }) => {
  await createPermission(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    '26c7320f-49af-4cb2-a1a5-197669492ed8',
    'c_pwsecurity8__aec9c01b_13a5_48e4_b2d4_318056a51a64.all.select',
  );

  let lresponse = await securitySelect(
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'c_pwsecurity8__aec9c01b_13a5_48e4_b2d4_318056a51a64',
  );

  if (lresponse.length == 0) {
    throw new Error('security setuplimited select success: assert failed');
  }
});

test('security setuplimited update fail', async ({ page }) => {
  let lsuccess = await securityUpdate(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'c_pwsecurity8__aec9c01b_13a5_48e4_b2d4_318056a51a64',
    'pw_helper4330_useradmin_securityInsert1: ' + process.env.PJOBID,
    'pw_helper4330_useradmin_securityInsert1UPDATED' + process.env.PJOBID,
    'd0565959-730e-4ac3-a278-d2e88b66f026',
  );

  if (lsuccess == true) {
    throw new Error('security setuplimited update fail: assert failed');
  }
});

test('security setuplimited update success', async ({ page }) => {
  await createPermission(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    '26c7320f-49af-4cb2-a1a5-197669492ed8',
    'c_pwsecurity8__aec9c01b_13a5_48e4_b2d4_318056a51a64.all.update',
  );

  let lsuccess = await securityUpdate(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'c_pwsecurity8__aec9c01b_13a5_48e4_b2d4_318056a51a64',
    'pw_helper4330_useradmin_securityInsert1: ' + process.env.PJOBID,
    'pw_helper4330_useradmin_securityInsert1UPDATED' + process.env.PJOBID,
    'd0565959-730e-4ac3-a278-d2e88b66f026',
  );

  if (lsuccess == false) {
    throw new Error('security setuplimited update success: assert failed');
  }
});

test('security setuplimited delete fail', async ({ page }) => {
  let lsuccess = await securityDelete(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'c_pwsecurity8__aec9c01b_13a5_48e4_b2d4_318056a51a64',
    'pw_helper4330_useradmin_securityInsert1UPDATED' + process.env.PJOBID,
  );

  if (lsuccess == true) {
    throw new Error('security setuplimited delete fail: assert failed');
  }
});

test('security setuplimited delete success', async ({ page }) => {
  await createPermission(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    '26c7320f-49af-4cb2-a1a5-197669492ed8',
    'c_pwsecurity8__aec9c01b_13a5_48e4_b2d4_318056a51a64.all.delete',
  );

  let lsuccess = await securityDelete(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'c_pwsecurity8__aec9c01b_13a5_48e4_b2d4_318056a51a64',
    'pw_helper4330_useradmin_securityInsert1UPDATED' + process.env.PJOBID,
  );

  if (lsuccess == false) {
    throw new Error('security setuplimited delete success: assert failed');
  }
});

test('security setuplimited object history fail', async ({ page }) => {
  let lresponse = await securitySelect(
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'h_pwsecurity8__aec9c01b_13a5_48e4_b2d4_318056a51a64',
  );

  if (lresponse.length > 0) {
    throw new Error('security setuplimited object history fail: assert failed');
  }
});

test('security setuplimited object history success', async ({ page }) => {
  await createPermission(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    '26c7320f-49af-4cb2-a1a5-197669492ed8',
    'h_pwsecurity8__aec9c01b_13a5_48e4_b2d4_318056a51a64.all.select',
  );

  let lresponse = await securitySelect(
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'h_pwsecurity8__aec9c01b_13a5_48e4_b2d4_318056a51a64',
  );

  if (lresponse.length == 0) {
    throw new Error('security setuplimited object history success: assert failed');
  }
});

test('security setuplimited select with permission another object2', async ({ page }) => {
  let lresponse = await securitySelect(process.env.PUSEREMAIL, process.env.PUSERPASSWORD, 'xusers');

  if (lresponse.length > 1) {
    throw new Error('security setuplimited select with permission another object2');
  }
});

test('security setuplimited delete object', async ({ page }) => {
  await deletePermissions(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    '26c7320f-49af-4cb2-a1a5-197669492ed8',
  );

  let lsuccess = await deleteObject(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    'c_pwsecurity8__aec9c01b_13a5_48e4_b2d4_318056a51a64',
  );

  if (lsuccess == false) {
    throw new Error('security delete object: assert failed');
  }
});

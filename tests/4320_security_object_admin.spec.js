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
    'f9cfe0a9-7c23-4ec7-bf63-d4b9384c8315',
    'c_pwsecurity1__f9cfe0a9_7c23_4ec7_bf63_d4b9384c8315',
    'PW Security 1',
  );

  if (lsuccess == false) {
    throw new Error('security create object: assert failed');
  }
});

test('security user object history', async ({ page }) => {
  let lresponse = await securitySelect(
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'h_pwsecurity1__f9cfe0a9_7c23_4ec7_bf63_d4b9384c8315',
  );

  if (lresponse.length > 0) {
    throw new Error('security user select: assert failed');
  }
});

test('security user setup', async ({ page }) => {
  let lresponse = await securitySelect(
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'objects',
  );

  if (lresponse.length > 0) {
    throw new Error('security user select: assert failed');
  }
});

test('security user setup history', async ({ page }) => {
  let lresponse = await securitySelect(
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'i_objects',
  );

  if (lresponse.length > 0) {
    throw new Error('security user select: assert failed');
  }
});

test('security user select', async ({ page }) => {
  let lresponse = await securitySelect(
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'c_pwsecurity1__f9cfe0a9_7c23_4ec7_bf63_d4b9384c8315',
  );

  if (lresponse.length > 0) {
    throw new Error('security user select: assert failed');
  }
});

test('security admin select', async ({ page }) => {
  let lresponse = await securitySelect(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    'c_pwsecurity1__f9cfe0a9_7c23_4ec7_bf63_d4b9384c8315',
  );

  if (lresponse.length <= 0) {
    throw new Error('security admin select: assert failed');
  }
});

test('security user insert', async ({ page }) => {
  let lsuccess = await securityInsert(
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'c_pwsecurity1__f9cfe0a9_7c23_4ec7_bf63_d4b9384c8315',
    'pw_helper4320_securityInsert1: ' + process.env.PJOBID,
  );

  if (lsuccess == true) {
    throw new Error('security usert insert: assert failed');
  }
});

test('security admin insert', async ({ page }) => {
  let lsuccess = await securityInsert(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    'c_pwsecurity1__f9cfe0a9_7c23_4ec7_bf63_d4b9384c8315',
    'pw_helper4320_securityInsert1: ' + process.env.PJOBID,
  );

  if (lsuccess == false) {
    throw new Error('security admin insert: assert failed');
  }
});

test('security user update', async ({ page }) => {
  let lsuccess = await securityUpdate(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'c_pwsecurity1__f9cfe0a9_7c23_4ec7_bf63_d4b9384c8315',
    'pw_helper4320_securityInsert1: ' + process.env.PJOBID,
    'pw_helper4320_securityUpdate1' + process.env.PJOBID,
  );

  if (lsuccess == true) {
    throw new Error('security usert insert: assert failed');
  }
});

test('security admin update', async ({ page }) => {
  let lsuccess = await securityUpdate(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    'c_pwsecurity1__f9cfe0a9_7c23_4ec7_bf63_d4b9384c8315',
    'pw_helper4320_securityInsert1: ' + process.env.PJOBID,
    'pw_helper4320_securityUpdate2' + process.env.PJOBID,
  );

  if (lsuccess == false) {
    throw new Error('security admin insert: assert failed');
  }
});

test('security user delete', async ({ page }) => {
  let lsuccess = await securityDelete(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'c_pwsecurity1__f9cfe0a9_7c23_4ec7_bf63_d4b9384c8315',
    'pw_helper4320_securityUpdate2' + process.env.PJOBID,
  );

  if (lsuccess == true) {
    throw new Error('security usert delete: assert failed');
  }
});

test('security admin delete', async ({ page }) => {
  let lsuccess = await securityDelete(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    'c_pwsecurity1__f9cfe0a9_7c23_4ec7_bf63_d4b9384c8315',
    'pw_helper4320_securityUpdate2' + process.env.PJOBID,
  );

  if (lsuccess == false) {
    throw new Error('security admin delete: assert failed');
  }
});

test('security delete object', async ({ page }) => {
  let lsuccess = await deleteObject(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    'c_pwsecurity1__f9cfe0a9_7c23_4ec7_bf63_d4b9384c8315',
  );

  if (lsuccess == false) {
    throw new Error('security delete object: assert failed');
  }
});

// CRUD all
// CRUD owner
// file

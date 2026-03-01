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
  uploadFile,
  downloadFile,
} from './helper4320.js';

// initial
test('security create object', async ({ page }) => {
  let lsuccess = await createObject(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    '09a5d567-564e-46ef-a0dd-9b738dd66ddf',
    'c_pwsecurity5__09a5d567_564e_46ef_a0dd_9b738dd66ddf',
    'PW Security 5',
    'false',
    'false',
    'yes',
    '98afd979-c6fd-4656-83c2-c9afbfed76cf',
    'c_file__98afd979_c6fd_4656_83c2_c9afbfed76cf',
    'c_file__98afd979_c6fd_4656_83c2_c9afbfed76cf',
    '09a5d567-564e-46ef-a0dd-9b738dd66ddf',
  );

  if (lsuccess == false) {
    throw new Error('security create object: assert failed');
  }
});

// setup
test('security files create permission setup', async ({ page }) => {
  await createPermission(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    '26c7320f-49af-4cb2-a1a5-197669492ed8',
    'setup',
  );
});

test('security files upload permission setup', async ({ page }) => {
  let lsuccess = await uploadFile(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'no',
    'objects/c_pwsecurity5__09a5d567_564e_46ef_a0dd_9b738dd66ddf/c_file__98afd979_c6fd_4656_83c2_c9afbfed76cf/d0565959-730e-4ac3-a278-d2e88b66f026/',
    'PW-' + process.env.PJOBID + '1',
  );

  if (lsuccess == false) {
    throw new Error('security usert delete: assert failed');
  }
});

test('security files upload permission setup fail', async ({ page }) => {
  let lsuccess = await uploadFile(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'no',
    'objects/c_pwsecurity5__09a5d567_564e_46ef_a0dd_9b738dd66ddf/c_file__98afd979_c6fd_4656_83c2_c9afbfed76cf/00000000-0000-0000-0000-000000000000/',
    'PW-' + process.env.PJOBID + '2',
  );

  if (lsuccess == true) {
    throw new Error('security usert delete: assert failed');
  }
});

test('security files upload permission fail1', async ({ page }) => {
  let lsuccess = await uploadFile(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'no',
    'objects/c_pwsecurity5__09a5d567_564e_46ef_a0dd_9b738dd66ddf/d0565959-730e-4ac3-a278-d2e88b66f026/',
    'PW-' + process.env.PJOBID + '0',
  );

  if (lsuccess == true) {
    throw new Error('security usert delete: assert failed');
  }
});

test('security files upload permission fail2', async ({ page }) => {
  let lsuccess = await uploadFile(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'no',
    'objects/d0565959-730e-4ac3-a278-d2e88b66f026/',
    'PW-' + process.env.PJOBID + '0',
  );

  if (lsuccess == true) {
    throw new Error('security usert delete: assert failed');
  }
});

test('security files upload permission fail3', async ({ page }) => {
  let lsuccess = await uploadFile(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'no',
    'd0565959-730e-4ac3-a278-d2e88b66f026/',
    'PW-' + process.env.PJOBID + '0',
  );

  if (lsuccess == true) {
    throw new Error('security usert delete: assert failed');
  }
});

test('security files download permission setup', async ({ page }) => {
  let lsuccess = await downloadFile(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'no',
    'objects/c_pwsecurity5__09a5d567_564e_46ef_a0dd_9b738dd66ddf/c_file__98afd979_c6fd_4656_83c2_c9afbfed76cf/d0565959-730e-4ac3-a278-d2e88b66f026/',
    'PW-' + process.env.PJOBID + '1',
  );

  if (lsuccess == false) {
    throw new Error('security usert delete: assert failed');
  }
});

test('security files delete permission setup', async ({ page }) => {
  await deletePermissions(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    '26c7320f-49af-4cb2-a1a5-197669492ed8',
  );
});

// unauth
test('security files upload unauth', async ({ page }) => {
  let lsuccess = await uploadFile(
    '',
    '',
    '',
    '',
    'yes',
    'objects/c_pwsecurity5__09a5d567_564e_46ef_a0dd_9b738dd66ddf/c_file__98afd979_c6fd_4656_83c2_c9afbfed76cf/00000000-0000-0000-0000-000000000000/',
    'PW-' + process.env.PJOBID + '3',
  );

  if (lsuccess == true) {
    throw new Error('security usert delete: assert failed');
  }
});

test('security files download unauth', async ({ page }) => {
  let lsuccess = await downloadFile(
    '',
    '',
    '',
    '',
    'no',
    'objects/c_pwsecurity5__09a5d567_564e_46ef_a0dd_9b738dd66ddf/c_file__98afd979_c6fd_4656_83c2_c9afbfed76cf/d0565959-730e-4ac3-a278-d2e88b66f026/',
    'PW-' + process.env.PJOBID + '1',
  );

  if (lsuccess == true) {
    throw new Error('security usert delete: assert failed');
  }
});

// user
test('security files upload user fail', async ({ page }) => {
  let lsuccess = await uploadFile(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'yes',
    'objects/c_pwsecurity5__09a5d567_564e_46ef_a0dd_9b738dd66ddf/c_file__98afd979_c6fd_4656_83c2_c9afbfed76cf/d0565959-730e-4ac3-a278-d2e88b66f026/',
    'PW-' + process.env.PJOBID + '4',
  );

  if (lsuccess == true) {
    throw new Error('security usert delete: assert failed');
  }
});

test('security files download user fail', async ({ page }) => {
  let lsuccess = await downloadFile(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'no',
    'objects/c_pwsecurity5__09a5d567_564e_46ef_a0dd_9b738dd66ddf/c_file__98afd979_c6fd_4656_83c2_c9afbfed76cf/d0565959-730e-4ac3-a278-d2e88b66f026/',
    'PW-' + process.env.PJOBID + '1',
  );

  if (lsuccess == true) {
    throw new Error('security usert delete: assert failed');
  }
});

// user file
test('security files create permission file', async ({ page }) => {
  await createPermission(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    '26c7320f-49af-4cb2-a1a5-197669492ed8',
    'file.insert',
  );

  await createPermission(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    '26c7320f-49af-4cb2-a1a5-197669492ed8',
    'file.select',
  );
});

test('security files upload user fail  with file permission', async ({ page }) => {
  let lsuccess = await uploadFile(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'yes',
    'objects/c_pwsecurity5__09a5d567_564e_46ef_a0dd_9b738dd66ddf/c_file__98afd979_c6fd_4656_83c2_c9afbfed76cf/d0565959-730e-4ac3-a278-d2e88b66f026/',
    'PW-' + process.env.PJOBID + '5',
  );

  if (lsuccess == true) {
    throw new Error('security usert delete: assert failed');
  }
});

test('security files download user fail with file permission', async ({ page }) => {
  let lsuccess = await downloadFile(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'no',
    'objects/c_pwsecurity5__09a5d567_564e_46ef_a0dd_9b738dd66ddf/c_file__98afd979_c6fd_4656_83c2_c9afbfed76cf/d0565959-730e-4ac3-a278-d2e88b66f026/',
    'PW-' + process.env.PJOBID + '1',
  );

  if (lsuccess == true) {
    throw new Error('security usert delete: assert failed');
  }
});

// user owner
test('security files create permission owner', async ({ page }) => {
  await createPermission(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    '26c7320f-49af-4cb2-a1a5-197669492ed8',
    'c_pwsecurity5__09a5d567_564e_46ef_a0dd_9b738dd66ddf.owner.select',
  );

  await createPermission(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    '26c7320f-49af-4cb2-a1a5-197669492ed8',
    'c_pwsecurity5__09a5d567_564e_46ef_a0dd_9b738dd66ddf.owner.insert',
  );
});

test('security files upload user with owner permission', async ({ page }) => {
  let lsuccess = await uploadFile(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'no',
    'objects/c_pwsecurity5__09a5d567_564e_46ef_a0dd_9b738dd66ddf/c_file__98afd979_c6fd_4656_83c2_c9afbfed76cf/d0565959-730e-4ac3-a278-d2e88b66f026/',
    'PW-' + process.env.PJOBID + '6',
    'no',
  );

  if (lsuccess == false) {
    throw new Error('security usert delete: assert failed');
  }
});

test('security files download user fail with owner permission', async ({ page }) => {
  let lsuccess = await downloadFile(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'no',
    'objects/c_pwsecurity5__09a5d567_564e_46ef_a0dd_9b738dd66ddf/c_file__98afd979_c6fd_4656_83c2_c9afbfed76cf/d0565959-730e-4ac3-a278-d2e88b66f026/',
    'PW-' + process.env.PJOBID + '1',
  );

  if (lsuccess == true) {
    throw new Error('security usert delete: assert failed');
  }
});

test('security files download user own fail with owner permission', async ({ page }) => {
  let lsuccess = await downloadFile(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'no',
    'objects/c_pwsecurity5__09a5d567_564e_46ef_a0dd_9b738dd66ddf/c_file__98afd979_c6fd_4656_83c2_c9afbfed76cf/d0565959-730e-4ac3-a278-d2e88b66f026/',
    'PW-' + process.env.PJOBID + '6',
  );

  if (lsuccess == true) {
    throw new Error('security usert delete: assert failed');
  }
});

// user all
test('security files create permission all', async ({ page }) => {
  await createPermission(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    '26c7320f-49af-4cb2-a1a5-197669492ed8',
    'c_pwsecurity5__09a5d567_564e_46ef_a0dd_9b738dd66ddf.all.select',
  );

  await createPermission(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    '26c7320f-49af-4cb2-a1a5-197669492ed8',
    'c_pwsecurity5__09a5d567_564e_46ef_a0dd_9b738dd66ddf.all.insert',
  );
});

test('security files upload user with all permission', async ({ page }) => {
  let lsuccess = await uploadFile(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'no',
    'objects/c_pwsecurity5__09a5d567_564e_46ef_a0dd_9b738dd66ddf/c_file__98afd979_c6fd_4656_83c2_c9afbfed76cf/d0565959-730e-4ac3-a278-d2e88b66f026/',
    'PW-' + process.env.PJOBID + '7',
    'no',
  );

  if (lsuccess == false) {
    throw new Error('security usert delete: assert failed');
  }
});

test('security files download user with all permission', async ({ page }) => {
  let lsuccess = await downloadFile(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'no',
    'objects/c_pwsecurity5__09a5d567_564e_46ef_a0dd_9b738dd66ddf/c_file__98afd979_c6fd_4656_83c2_c9afbfed76cf/d0565959-730e-4ac3-a278-d2e88b66f026/',
    'PW-' + process.env.PJOBID + '1',
  );

  if (lsuccess == false) {
    throw new Error('security usert delete: assert failed');
  }
});

test('security files download user own with all permission', async ({ page }) => {
  let lsuccess = await downloadFile(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    'no',
    'objects/c_pwsecurity5__09a5d567_564e_46ef_a0dd_9b738dd66ddf/c_file__98afd979_c6fd_4656_83c2_c9afbfed76cf/d0565959-730e-4ac3-a278-d2e88b66f026/',
    'PW-' + process.env.PJOBID + '7',
  );

  if (lsuccess == false) {
    throw new Error('security usert delete: assert failed');
  }
});

// cleanup
test('security files delete permission cleanup', async ({ page }) => {
  await deletePermissions(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    '26c7320f-49af-4cb2-a1a5-197669492ed8',
  );
});

test('security delete object', async ({ page }) => {
  let lsuccess = await deleteObject(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    'c_pwsecurity5__09a5d567_564e_46ef_a0dd_9b738dd66ddf',
  );

  if (lsuccess == false) {
    throw new Error('security delete object: assert failed');
  }
});

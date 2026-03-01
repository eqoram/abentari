import { test, expect } from '@playwright/test';
import {
  createObject,
  deleteObject,
  securitySelect,
  securityInsert,
  securityUpdate,
  securityDelete,
  createPermission,
  deletePermissions,
} from './helper4320.js';

// one: unauth has no permissions
test('security create object', async ({ page }) => {
  let lsuccess = await createObject(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    '39251e2c-31f7-4bc3-bfac-438eaa68b587',
    'c_pwsecurity4__39251e2c_31f7_4bc3_bfac_438eaa68b587',
    'PW Security 4',
  );

  if (lsuccess == false) {
    throw new Error('security create object: assert failed');
  }
});

test('security admin insert', async ({ page }) => {
  let lsuccess = await securityInsert(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    'c_pwsecurity4__39251e2c_31f7_4bc3_bfac_438eaa68b587',
    'pw_helper4330_useradmin_securityInsert1: ' + process.env.PJOBID,
    'd0565959-730e-4ac3-a278-d2e88b66f026',
  );

  if (lsuccess == false) {
    throw new Error('security usert insert: assert failed');
  }
});

test('security user object history', async ({ page }) => {
  let lresponse = await securitySelect(
    'invaliduseremail',
    'invaliduserpassword',
    'h_pwsecurity4__39251e2c_31f7_4bc3_bfac_438eaa68b587',
    'yes',
  );

  if (lresponse.length > 0) {
    throw new Error('security user select: assert failed');
  }
});

test('security user setup', async ({ page }) => {
  let lresponse = await securitySelect('invaliduseremail', 'invaliduserpassword', 'objects', 'yes');

  if (lresponse.length > 0) {
    throw new Error('security user select: assert failed');
  }
});

test('security user setup history', async ({ page }) => {
  let lresponse = await securitySelect(
    'invaliduseremail',
    'invaliduserpassword',
    'i_objects',
    'yes',
  );

  if (lresponse.length > 0) {
    throw new Error('security user select: assert failed');
  }
});

test('security user select', async ({ page }) => {
  let lresponse = await securitySelect(
    'invaliduseremail',
    'invaliduserpassword',
    'c_pwsecurity4__39251e2c_31f7_4bc3_bfac_438eaa68b587',
    'yes',
  );

  if (lresponse.length > 0) {
    throw new Error('security user select: assert failed');
  }
});

// test('security admin select', async ({ page }) => {
//   let lresponse = await securitySelect(
//     process.env.PADMINEMAIL,
//     process.env.PADMINPASSWORD,
//     'c_pwsecurity4__39251e2c_31f7_4bc3_bfac_438eaa68b587',
//   );

//   if (lresponse.length <= 0) {
//     throw new Error('security admin select: assert failed');
//   }
// });

test('security user insert', async ({ page }) => {
  let lsuccess = await securityInsert(
    'invaliduseremail',
    'invaliduserpassword',
    'c_pwsecurity4__39251e2c_31f7_4bc3_bfac_438eaa68b587',
    'pw_helper4330_user_securityInsert1: ' + process.env.PJOBID,
    'd0565959-730e-4ac3-a278-d2e88b66f026',
    'yes',
  );

  if (lsuccess == true) {
    throw new Error('security usert insert: assert failed');
  }
});

// test('security admin insert', async ({ page }) => {
//   let lsuccess = await securityInsert(
//     process.env.PADMINEMAIL,
//     process.env.PADMINPASSWORD,
//     'c_pwsecurity4__39251e2c_31f7_4bc3_bfac_438eaa68b587',
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
    'invaliduseremail',
    'invaliduserpassword',
    'c_pwsecurity4__39251e2c_31f7_4bc3_bfac_438eaa68b587',
    'pw_helper4330_user_securityInsert1: ' + process.env.PJOBID,
    'pw_helper4330_user_securityUpdate1' + process.env.PJOBID,
    'd0565959-730e-4ac3-a278-d2e88b66f026',
    'yes',
  );

  if (lsuccess == true) {
    throw new Error('security usert insert: assert failed');
  }
});

// test('security admin update', async ({ page }) => {
//   let lsuccess = await securityUpdate(
//     process.env.PADMINEMAIL,
//     process.env.PADMINPASSWORD,
//     process.env.PADMINEMAIL,
//     process.env.PADMINPASSWORD,
//     'c_pwsecurity4__39251e2c_31f7_4bc3_bfac_438eaa68b587',
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
    'invaliduseremail',
    'invaliduserpassword',
    'c_pwsecurity4__39251e2c_31f7_4bc3_bfac_438eaa68b587',
    'pre1',
    'yes',
  );

  if (lsuccess == true) {
    throw new Error('security usert delete: assert failed');
  }
});

// test('security admin delete', async ({ page }) => {
//   let lsuccess = await securityDelete(
//     process.env.PADMINEMAIL,
//     process.env.PADMINPASSWORD,
//     process.env.PADMINEMAIL,
//     process.env.PADMINPASSWORD,
//     'c_pwsecurity4__39251e2c_31f7_4bc3_bfac_438eaa68b587',
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
    'c_pwsecurity4__39251e2c_31f7_4bc3_bfac_438eaa68b587',
  );

  if (lsuccess == false) {
    throw new Error('security delete object: assert failed');
  }
});

// two: unauth has permissions
test('security create object two', async ({ page }) => {
  let lsuccess = await createObject(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    '5a6c669b-e93d-4b0b-9727-216655cef304',
    'c_pwsecurity6__5a6c669b_e93d_4b0b_9727_216655cef304',
    'PW Security 6',
  );

  await createPermission(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    '43bf8fe6-9add-4ff4-b759-f8e1445f5914',
    'c_pwsecurity6__5a6c669b_e93d_4b0b_9727_216655cef304.all.select',
  );

  await createPermission(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    '43bf8fe6-9add-4ff4-b759-f8e1445f5914',
    'h_pwsecurity6__5a6c669b_e93d_4b0b_9727_216655cef304.all.select',
  );

  await createPermission(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    '43bf8fe6-9add-4ff4-b759-f8e1445f5914',
    'c_pwsecurity6__5a6c669b_e93d_4b0b_9727_216655cef304.all.insert',
  );

  await createPermission(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    '43bf8fe6-9add-4ff4-b759-f8e1445f5914',
    'c_pwsecurity6__5a6c669b_e93d_4b0b_9727_216655cef304.all.update',
  );

  await createPermission(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    '43bf8fe6-9add-4ff4-b759-f8e1445f5914',
    'c_pwsecurity6__5a6c669b_e93d_4b0b_9727_216655cef304.all.delete',
  );

  if (lsuccess == false) {
    throw new Error('security create object: assert failed');
  }
});

test('security user object history two', async ({ page }) => {
  let lresponse = await securitySelect(
    'invaliduseremail',
    'invaliduserpassword',
    'h_pwsecurity6__5a6c669b_e93d_4b0b_9727_216655cef304',
    'yes',
  );

  if (lresponse.length == 0) {
    throw new Error('security user select: assert failed');
  }
});

test('security user setup two', async ({ page }) => {
  let lresponse = await securitySelect('invaliduseremail', 'invaliduserpassword', 'objects', 'yes');

  // will have access to objects table as it has c_pwsecurity6__5a6c669b_e93d_4b0b_9727_216655cef304.all.select
  if (lresponse.length == 0) {
    throw new Error('security user select: assert failed');
  }
});

test('security user setup history two', async ({ page }) => {
  let lresponse = await securitySelect(
    'invaliduseremail',
    'invaliduserpassword',
    'i_objects',
    'yes',
  );

  // will still not have access to this (see comment above)
  if (lresponse.length > 0) {
    throw new Error('security user select: assert failed');
  }
});

test('security user select two', async ({ page }) => {
  let lresponse = await securitySelect(
    'invaliduseremail',
    'invaliduserpassword',
    'c_pwsecurity6__5a6c669b_e93d_4b0b_9727_216655cef304',
    'yes',
  );

  if (lresponse.length == 0) {
    throw new Error('security user select: assert failed');
  }
});

// test('security admin select', async ({ page }) => {
//   let lresponse = await securitySelect(
//     process.env.PADMINEMAIL,
//     process.env.PADMINPASSWORD,
//     'c_pwsecurity6__5a6c669b_e93d_4b0b_9727_216655cef304',
//   );

//   if (lresponse.length <= 0) {
//     throw new Error('security admin select: assert failed');
//   }
// });

test('security user insert two', async ({ page }) => {
  let lsuccess = await securityInsert(
    'invaliduseremail',
    'invaliduserpassword',
    'c_pwsecurity6__5a6c669b_e93d_4b0b_9727_216655cef304',
    'pw_helper4330_user_securityInsert1: ' + process.env.PJOBID,
    'd0565959-730e-4ac3-a278-d2e88b66f026',
    'yes',
  );

  if (lsuccess == false) {
    throw new Error('security usert insert: assert failed');
  }
});

// test('security admin insert', async ({ page }) => {
//   let lsuccess = await securityInsert(
//     process.env.PADMINEMAIL,
//     process.env.PADMINPASSWORD,
//     'c_pwsecurity6__5a6c669b_e93d_4b0b_9727_216655cef304',
//     'pw_helper4330_admin_securityInsert1: ' + process.env.PJOBID,
//   );

//   if (lsuccess == false) {
//     throw new Error('security admin insert: assert failed');
//   }
// });

test('security user update two', async ({ page }) => {
  let lsuccess = await securityUpdate(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    'invaliduseremail',
    'invaliduserpassword',
    'c_pwsecurity6__5a6c669b_e93d_4b0b_9727_216655cef304',
    'pw_helper4330_user_securityInsert1: ' + process.env.PJOBID,
    'pw_helper4330_user_securityUpdate1' + process.env.PJOBID,
    'd0565959-730e-4ac3-a278-d2e88b66f026',
    'yes',
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
//     'c_pwsecurity6__5a6c669b_e93d_4b0b_9727_216655cef304',
//     'pw_helper4330_admin_securityInsert1: ' + process.env.PJOBID,
//     'pw_helper4330_admin_securityUpdate2' + process.env.PJOBID,
//   );

//   if (lsuccess == false) {
//     throw new Error('security admin insert: assert failed');
//   }
// });

test('security user delete two', async ({ page }) => {
  let lsuccess = await securityDelete(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    'invaliduseremail',
    'invaliduserpassword',
    'c_pwsecurity6__5a6c669b_e93d_4b0b_9727_216655cef304',
    'pre1',
    'yes',
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
//     'c_pwsecurity6__5a6c669b_e93d_4b0b_9727_216655cef304',
//     'pw_helper4330_admin_securityUpdate2' + process.env.PJOBID,
//   );

//   if (lsuccess == false) {
//     throw new Error('security admin delete: assert failed');
//   }
// });

test('security delete object two', async ({ page }) => {
  await deletePermissions(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    process.env.PUSEREMAIL,
    process.env.PUSERPASSWORD,
    '43bf8fe6-9add-4ff4-b759-f8e1445f5914',
  );

  let lsuccess = await deleteObject(
    process.env.PADMINEMAIL,
    process.env.PADMINPASSWORD,
    'c_pwsecurity6__5a6c669b_e93d_4b0b_9727_216655cef304',
  );

  if (lsuccess == false) {
    throw new Error('security delete object: assert failed');
  }
});

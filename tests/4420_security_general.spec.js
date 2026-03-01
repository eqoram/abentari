import { test, expect } from '@playwright/test';
import {
  supabaseLogin,
  supabaseCreatePermission,
  supabaseDeletePermissions,
  supabaseInsert,
} from './helperSupabase.js';

test('4420_security_general:unauthwithsetup_fail', async ({ page }) => {
  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '43bf8fe6-9add-4ff4-b759-f8e1445f5914',
  });

  let lsuccess = await supabaseCreatePermission({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '43bf8fe6-9add-4ff4-b759-f8e1445f5914',
    ppermissionname: 'setup',
  });

  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '43bf8fe6-9add-4ff4-b759-f8e1445f5914',
  });

  if (lsuccess == true) {
    throw new Error('4420: assert failed');
  }
});

test('4420_security_general:unauthwithsetuplimited_fail', async ({ page }) => {
  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '43bf8fe6-9add-4ff4-b759-f8e1445f5914',
  });

  let lsuccess = await supabaseCreatePermission({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '43bf8fe6-9add-4ff4-b759-f8e1445f5914',
    ppermissionname: 'setuplimited',
  });

  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '43bf8fe6-9add-4ff4-b759-f8e1445f5914',
  });

  if (lsuccess == true) {
    throw new Error('4420: assert failed');
  }
});

test('4420_security_general:unauthwithsettingsinsert_fail', async ({ page }) => {
  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '43bf8fe6-9add-4ff4-b759-f8e1445f5914',
  });

  let lsuccess = await supabaseCreatePermission({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '43bf8fe6-9add-4ff4-b759-f8e1445f5914',
    ppermissionname: 'settings.setup.insert',
  });

  await supabaseDeletePermissions({
    padminemail: process.env.PADMINEMAIL,
    padminpassword: process.env.PADMINPASSWORD,
    pprofileid: '43bf8fe6-9add-4ff4-b759-f8e1445f5914',
  });

  if (lsuccess == false) {
    throw new Error('4420: assert failed');
  }
});

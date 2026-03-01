import { test, expect } from '@playwright/test';
import { loginUser, logoutUser } from './helper4000.js';
import { createObject } from './helper4140.js';

test('admin create object 0', async ({ page }) => {
  await loginUser(page, process.env.PADMINEMAIL, process.env.PADMINPASSWORD);

  await createObject(page, 'pwobject0', 'PW Object 0');

  await logoutUser(page);
});

test('admin create object 1', async ({ page }) => {
  await loginUser(page, process.env.PADMINEMAIL, process.env.PADMINPASSWORD);

  await createObject(page, 'pwobject1', 'PW Object 1');

  await logoutUser(page);
});

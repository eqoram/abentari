import { test, expect } from '@playwright/test';
import { loginUser, logoutUser } from './helper4000.js';
import { deletePermission, deleteProfile } from './helper4920.js';

test.skip('admin delete permission', async ({ page }) => {
  await loginUser(page, process.env.PADMINEMAIL, process.env.PADMINPASSWORD);

  await deletePermission(page, 'pwprofile1', 'Playwright Profile 1', 'setup');

  await logoutUser(page);
});

test('admin delete profile', async ({ page }) => {
  await loginUser(page, process.env.PADMINEMAIL, process.env.PADMINPASSWORD);

  await deleteProfile(page, 'pwprofile1', 'Playwright Profile 1');

  await logoutUser(page);
});

import { test, expect } from '@playwright/test';
import { loginUser, logoutUser } from './helper4000.js';
import { createProfile, createPermission } from './helper4120.js';

test('admin create profile', async ({ page }) => {
  await loginUser(page, process.env.PADMINEMAIL, process.env.PADMINPASSWORD);

  await createProfile(page, 'pwprofile1', 'Playwright Profile 1');

  await logoutUser(page);
});

test.skip('admin create permission', async ({ page }) => {
  await loginUser(page, process.env.PADMINEMAIL, process.env.PADMINPASSWORD);

  await createPermission(page, 'pwprofile1', 'Playwright Profile 1', 'setup');

  await logoutUser(page);
});

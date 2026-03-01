import { test, expect } from '@playwright/test';
import { loginUser, logoutUser } from './helper4000.js';

test('login as admin', async ({ page }) => {
  await loginUser(page, process.env.PADMINEMAIL, process.env.PADMINPASSWORD);

  await logoutUser(page);
});

test('login as user', async ({ page }) => {
  await loginUser(page, process.env.PUSEREMAIL, process.env.PUSERPASSWORD);

  await logoutUser(page);
});

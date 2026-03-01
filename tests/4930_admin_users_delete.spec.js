import { test, expect } from '@playwright/test';
import { loginUser, logoutUser } from './helper4000.js';
import { deleteUser } from './helper4930.js';

test('admin delete user', async ({ page }) => {
  await loginUser(page, process.env.PADMINEMAIL, process.env.PADMINPASSWORD);

  await deleteUser(page, 'pwuser1@abentari.invalid');

  await logoutUser(page);
});

import { test, expect } from '@playwright/test';
import { loginUser, logoutUser } from './helper4000.js';
import { deleteField, deleteObject } from './helper4940.js';

test('admin delete object 1', async ({ page }) => {
  await loginUser(page, process.env.PADMINEMAIL, process.env.PADMINPASSWORD);

  await deleteObject(page, 'pwobject1', 'PW Object 1');

  await logoutUser(page);
});

test('admin delete object 0', async ({ page }) => {
  await loginUser(page, process.env.PADMINEMAIL, process.env.PADMINPASSWORD);

  await deleteObject(page, 'pwobject0', 'PW Object 0');

  await logoutUser(page);
});

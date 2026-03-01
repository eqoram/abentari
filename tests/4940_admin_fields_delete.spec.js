import { test, expect } from '@playwright/test';
import { loginUser, logoutUser } from './helper4000.js';
import { deleteField } from './helper4940.js';

test('admin delete field 1', async ({ page }) => {
  await loginUser(page, process.env.PADMINEMAIL, process.env.PADMINPASSWORD);

  await deleteField(
    page,
    'pwobject1',
    'PW Object 1',
    'pwfield41501',
    'Playwright Field bool 41501',
  );

  await logoutUser(page);
});

test('admin delete field 0', async ({ page }) => {
  await loginUser(page, process.env.PADMINEMAIL, process.env.PADMINPASSWORD);

  await deleteField(
    page,
    'pwobject1',
    'PW Object 1',
    'pwfield41502',
    'Playwright Field date 41502',
  );

  await logoutUser(page);
});

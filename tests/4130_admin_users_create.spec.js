import { test, expect } from '@playwright/test';
import { loginUser, logoutUser } from './helper4000.js';
import { createUser, signupUser } from './helper4130.js';

test('admin create user', async ({ page }) => {
  await loginUser(page, process.env.PADMINEMAIL, process.env.PADMINPASSWORD);

  await createUser(page, 'pw_user', 'pwuser1@abentari.invalid', process.env.PADMINPASSWORD + '1');

  await logoutUser(page);
});

test('signup user', async ({ page }) => {
  await signupUser(
    page,
    'pw_user',
    'pwuser1@abentari.invalid',
    process.env.PADMINPASSWORD + '1',
    process.env.PADMINPASSWORD + '1',
  );
});

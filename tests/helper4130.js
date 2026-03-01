import { test, expect } from '@playwright/test';
import { clickDropdownElement } from './helperhelper.js';

export async function createUser(page, profilename, usermail, usersecret) {
  await page.goto(process.env.PURL);
  await page.waitForLoadState('networkidle0');

  await page.locator('a').filter({ hasText: 'userssetup' }).click();

  await page.locator('button').filter({ hasText: 'add' }).click();

  await page
    .locator('div')
    .filter({ hasText: /^profile \(profile_id\) \*$/ })
    .first()
    .click();

  await clickDropdownElement(page, profilename, 100);

  await page.getByLabel('email (invite_email) *').fill(usermail);

  await page.getByLabel('secret (invite_secret) *').fill(usersecret);

  await page.locator('button').filter({ hasText: 'save' }).click();

  await expect(page.getByRole('main').getByText(usermail)).toBeVisible();

  // await page.waitForTimeout(4000);
}

export async function signupUser(page, profilename, usermail, userpassword, usersecret) {
  await page.goto(process.env.PURL);
  await page.waitForLoadState('networkidle0');

  await page.getByRole('button', { name: 'create an account' }).click();

  await page.getByLabel('email').fill(usermail);

  await page.getByLabel('password').fill(userpassword);

  await page.getByLabel('secret').fill(usersecret);

  await page.getByRole('button', { name: 'signup' }).click();

  await page.getByRole('button', { name: 'login' }).click();

  await expect(page.getByRole('heading', { name: 'hello, ' + usermail + '!' })).toBeVisible();

  // await page.waitForTimeout(4000);
}

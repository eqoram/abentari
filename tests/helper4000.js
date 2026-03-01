import { test, expect } from '@playwright/test';
import { clickDropdownElement } from './helperhelper.js';

export async function loginUser(page, username, password) {
  await page.goto(process.env.PURL);

  await page.waitForLoadState('networkidle0');
  let isLoginPage = await page.getByRole('button', { name: 'login' }).isVisible();
  if (isLoginPage) {
    // process.stdout.write('TRUE: isLoginPage');
  } else {
    // process.stdout.write('FALSE: isLoginPage');
    await page.getByText('sign out').click();
  }

  await page.waitForLoadState('networkidle0');
  await page.getByLabel('email').fill(username);

  await page.getByLabel('password').fill(password);

  await page.getByRole('button', { name: 'login' }).click();

  await expect(page.getByRole('heading', { name: 'hello, ' + username + '!' })).toBeVisible();

  //await page.waitForTimeout(4000);
}

export async function logoutUser(page) {
  await page.getByText('sign out').click();

  await expect(page.getByRole('button', { name: 'login' })).toBeVisible();

  //await page.waitForTimeout(4000);
}

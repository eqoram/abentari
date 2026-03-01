import { test, expect } from '@playwright/test';
import { clickDropdownElement } from './helperhelper.js';

export async function createProfile(page, profileapiname, profilename) {
  await page.goto(process.env.PURL);
  await page.waitForLoadState('networkidle0');

  await page.locator('a').filter({ hasText: 'profilessetup' }).click();

  await page.locator('button').filter({ hasText: 'add' }).click();

  await page.getByLabel('api_name *').fill(profileapiname);

  await page.getByLabel('name *', { exact: true }).fill(profilename);

  await page.locator('button').filter({ hasText: 'save' }).click();

  await expect(page.getByRole('main').getByText(profilename)).toBeVisible();

  // await page.waitForTimeout(4000);
}

export async function createPermission(page, profileapiname, profilename, permissionname) {
  await page.goto(process.env.PURL);
  await page.waitForLoadState('networkidle0');

  await page.locator('a').filter({ hasText: 'profilessetup' }).click();

  await page.getByRole('main').getByText(profilename).click();

  await page.getByRole('button', { name: 'Expand "More"' }).click();

  await page.getByRole('listitem').filter({ hasText: 'permissions' }).click();

  await page.locator('button').filter({ hasText: 'add' }).click();

  // Step 1: Click the QSelect label to open the dropdown
  await page
    .locator('div')
    .filter({ hasText: /^permission \*$/ })
    .first()
    .click();

  await clickDropdownElement(page, permissionname, 100);

  await page.keyboard.press('Escape');

  await page.locator('button').filter({ hasText: 'save' }).click();

  await page.getByRole('button', { name: 'Expand "More"' }).click();

  await page.getByRole('listitem').filter({ hasText: 'permissions' }).click();

  await expect(page.getByRole('main').getByText(permissionname)).toBeVisible();

  // await page.waitForTimeout(4000);
}

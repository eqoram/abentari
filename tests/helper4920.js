import { test, expect } from '@playwright/test';

export async function deletePermission(page, profileapiname, profilename, permissionname) {
  await page.goto(process.env.PURL);
  await page.waitForLoadState('networkidle0');

  await page.locator('a').filter({ hasText: 'profilessetup' }).click();

  await page.getByRole('main').getByText(profilename).click();

  await page.getByRole('button', { name: 'Expand "More"' }).click();

  await page.getByRole('listitem').filter({ hasText: 'permissions' }).click();

  await page.getByRole('main').getByText(permissionname).click();

  await page.locator('button').filter({ hasText: 'delete' }).click();

  await page.getByRole('button', { name: 'delete' }).click();

  await page.getByRole('button', { name: 'Expand "More"' }).click();

  await page.getByRole('listitem').filter({ hasText: 'permissions' }).click();

  await page.waitForLoadState('networkidle0');
  await expect(page.getByRole('main').getByText(permissionname)).toHaveCount(0);

  // await page.waitForTimeout(4000);
}

export async function deleteProfile(page, profileapiname, profilename) {
  await page.goto(process.env.PURL);
  await page.waitForLoadState('networkidle0');

  await page.locator('a').filter({ hasText: 'profilessetup' }).click();

  await page.getByRole('main').getByText(profilename).click();

  await page.locator('button').filter({ hasText: 'delete' }).click();

  await page.getByRole('button', { name: 'delete' }).click();

  await page.waitForLoadState('networkidle0');
  await expect(page.getByText(profilename)).toHaveCount(0);

  // await page.waitForTimeout(4000);
}

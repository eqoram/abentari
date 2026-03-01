import { test, expect } from '@playwright/test';
import { clickDropdownElement } from './helperhelper.js';

export async function deleteUser(page, usermail) {
  await page.goto(process.env.PURL);
  await page.waitForLoadState('networkidle0');

  await page.locator('a').filter({ hasText: 'userssetup' }).click();

  page.getByRole('main').getByText(usermail).click();

  await page.locator('button').filter({ hasText: 'delete' }).click();

  await page.getByRole('button', { name: 'delete' }).click();

  await page.waitForLoadState('networkidle0');
  await expect(page.getByText(usermail)).toHaveCount(0);

  // await page.waitForTimeout(4000);
}

import { test, expect } from '@playwright/test';

export async function createObject(page, objectapiname, objectname) {
  await page.goto(process.env.PURL);
  await page.waitForLoadState('networkidle0');

  await page.locator('a').filter({ hasText: 'objectssetup' }).click();

  await page.locator('button').filter({ hasText: 'add' }).click();

  await page.getByLabel('api_name *').fill(objectapiname);

  await page.getByLabel('name *', { exact: true }).fill(objectname);

  await page.locator('button').filter({ hasText: 'save' }).click();

  await expect(page.getByText(objectname).first()).toBeVisible();

  // await page.waitForTimeout(4000);
}

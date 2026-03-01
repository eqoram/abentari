import { test, expect } from '@playwright/test';

export async function deleteField(page, objectapiname, objectname, fieldapiname, fieldname) {
  await page.goto(process.env.PURL);
  await page.waitForLoadState('networkidle0');

  await page.locator('a').filter({ hasText: 'objectssetup' }).click();

  await page.getByRole('main').getByText(objectname).click();

  await page.getByRole('button', { name: 'Expand "More"' }).click();

  await page.getByRole('listitem').filter({ hasText: 'fields' }).click();

  await page.getByRole('main').getByText(fieldname).click();

  await page.locator('button').filter({ hasText: 'delete' }).click();

  await page.getByRole('button', { name: 'delete' }).click();

  await page.getByRole('button', { name: 'Expand "More"' }).click();

  await page.getByRole('listitem').filter({ hasText: 'fields' }).click();

  await page.waitForLoadState('networkidle0');
  await expect(page.getByText(fieldname)).toHaveCount(0);

  // await page.waitForTimeout(4000);
}

export async function deleteObject(page, objectapiname, objectname) {
  await page.goto(process.env.PURL);
  await page.waitForLoadState('networkidle0');

  await page.locator('a').filter({ hasText: 'objectssetup' }).click();

  await page.getByRole('main').getByText(objectname).click();

  await page.locator('button').filter({ hasText: 'delete' }).click();

  await page.getByRole('button', { name: 'delete' }).click();

  await page.waitForLoadState('networkidle0');
  await expect(page.getByText(objectname)).toHaveCount(0);

  // await page.waitForTimeout(4000);
}

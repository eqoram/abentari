import { test, expect } from '@playwright/test';
import { clickDropdownElement } from './helperhelper.js';

export async function deleteRecord(page, objectapiname, objectname, textvalue) {
  await page.goto(process.env.PURL);
  await page.waitForLoadState('networkidle0');

  await page
    .locator('a')
    .filter({ hasText: objectname + 'object' })
    .click();

  // console.log(textvalue);
  // process.stdout.write(textvalue);
  await page.getByRole('main').getByText(textvalue).click();
  //await page.getByText('name 1 UPDATED local_1766379386').click();
  // await page.getByText(/^name UPDATED 1 /).click();

  await page.locator('button').filter({ hasText: 'delete' }).click();

  await page.getByRole('button', { name: 'delete' }).click();

  await page.waitForTimeout(1000);

  await expect(page.getByText(textvalue)).toHaveCount(0);
  //await expect(page.getByText('name 1 UPDATED local_1766379386')).toHaveCount(0);
  // await expect(page.getByText(/^name UPDATED 1 /)).toHaveCount(0);
}

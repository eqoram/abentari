import { test, expect } from '@playwright/test';
import { clickDropdownElement } from './helperhelper.js';

export async function updateRecord(page, objectapiname, objectname, textvalue, textvalueupdate) {
  await page.goto(process.env.PURL);
  await page.waitForLoadState('networkidle0');

  await page
    .locator('a')
    .filter({ hasText: objectname + 'object' })
    .click();

  // console.log(textvalue);
  // process.stdout.write(textvalue);
  await page.getByRole('main').getByText(textvalue).click();
  //await page.getByText('name 1 local_1766379386').click();
  // await page.getByText(/^name 1 /).click();

  await page.getByLabel('name *').fill(textvalueupdate);
  //await page.getByLabel('name *').fill('name 1 UPDATED local_1766379386');

  await page.locator('button').filter({ hasText: 'save' }).click();

  await page.waitForTimeout(1000);

  await expect(page.getByText(textvalueupdate, { exact: true })).toBeVisible();
  //await expect(page.getByText('name 1 UPDATED local_1766379386', { exact: true })).toBeVisible();
  // await expect(page.getByText(/^name 1 UPDATED /)).toBeVisible();
}

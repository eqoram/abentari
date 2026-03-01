import { test, expect } from '@playwright/test';
import { clickDropdownElement } from './helperhelper.js';

export async function createRecord0(page, objectapiname, objectname, textvalue) {
  await page.goto(process.env.PURL);
  await page.waitForLoadState('networkidle0');

  await page
    .locator('a')
    .filter({ hasText: objectname + 'object' })
    .click();

  await page.locator('button').filter({ hasText: 'add' }).click();

  await page.getByLabel('name *').fill(textvalue);

  await page.locator('button').filter({ hasText: 'save' }).click();

  await expect(page.getByText(textvalue, { exact: true })).toBeVisible();

  // await page.waitForTimeout(4000);
}

export async function createRecord1(
  page,
  objectapiname,
  objectname,
  textvalue,
  longtextvalue,
  numbervalue,
  picklistvalue,
  picklistmultivalue,
  relationvalue,
  relationmultivalue,
  secondtextvalue,
) {
  await page.goto(process.env.PURL);
  await page.waitForLoadState('networkidle0');

  await page
    .locator('a')
    .filter({ hasText: objectname + 'object' })
    .click();

  await page.locator('button').filter({ hasText: 'add' }).click();

  await page.getByLabel('name *').fill(textvalue);

  await page.getByLabel('Playwright Field bool 41501').click();

  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  const formattedDate = `${year}-${month}-${day}`;
  await page.getByLabel('Playwright Field date 41502 *').fill(formattedDate);

  const now = new Date();
  const day1 = String(now.getDate()).padStart(2, '0');
  const month1 = String(now.getMonth() + 1).padStart(2, '0');
  const year1 = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const formattedDateTime = `${year1}-${month1}-${day1}T${hours}:${minutes}:${seconds}`;
  await page.getByLabel('Playwright Field datetime 41503 *').fill(formattedDateTime);

  await page
    .locator('input[type="file"][data-name="file--Playwright Field file 41505"]')
    .setInputFiles({
      name: 'example.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('Hello from Playwright!'),
    });

  await page.getByLabel('Playwright Field longtext 41506 *').fill(longtextvalue);

  await page.getByLabel('Playwright Field number 41507 *').fill(numbervalue);

  await page
    .locator('div')
    .filter({ hasText: /^Playwright Field picklist 41508 \*$/ })
    .first()
    .click();
  await page.waitForTimeout(100);
  await clickDropdownElement(page, picklistvalue, 100);
  await page.waitForTimeout(100);

  await page
    .locator('div')
    .filter({ hasText: /^Playwright Field picklistmulti 41509 \*$/ })
    .first()
    .click();
  await page.waitForTimeout(100);
  await clickDropdownElement(page, picklistmultivalue, 100);
  await page.waitForTimeout(100);
  await page.keyboard.press('Escape');

  await page
    .locator('div')
    .filter({ hasText: /^Playwright Field relation 415010 \*$/ })
    .first()
    .click();
  await page.waitForTimeout(100);
  await clickDropdownElement(page, relationvalue, 100);
  await page.waitForTimeout(100);
  await page.keyboard.press('Escape');

  await page
    .locator('div')
    .filter({ hasText: /^Playwright Field relationmulti 415011 \*$/ })
    .first()
    .click();
  await page.getByText(relationmultivalue).first();
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await page.keyboard.press('Escape');

  await page.getByLabel('Playwright Field text 415012 *').fill(secondtextvalue);

  await page.waitForTimeout(100);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(100);
  await page.locator('button').filter({ hasText: 'save' }).click();

  // changed recently
  await page.waitForTimeout(100);
  // no checks because it would fail in the update or delete class
  // await expect(page.locator('button').filter({ hasText: 'save' })).toHaveCount(0);
  await expect(page.getByText(textvalue, { exact: true }).first()).toBeVisible();
}

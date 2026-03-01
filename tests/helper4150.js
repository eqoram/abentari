import { test, expect } from '@playwright/test';
import { clickDropdownElement } from './helperhelper.js';

export async function createField(
  page,
  objectapiname,
  objectname,
  fieldapiname,
  fieldname,
  type,
  display,
  displayvalue,
  picklist,
  picklistvalues,
  relation,
  relationname,
  relationobject,
) {
  await page.goto(process.env.PURL);
  await page.waitForLoadState('networkidle0');

  await page.locator('a').filter({ hasText: 'objectssetup' }).click();

  await page.getByRole('main').getByText(objectname).click();

  await page.getByRole('button', { name: 'Expand "More"' }).click();

  await page.getByRole('listitem').filter({ hasText: 'fields' }).click();

  await page.locator('button').filter({ hasText: 'add' }).click();

  await page.getByLabel('api_name *').fill(fieldapiname);

  await page.getByLabel('name *', { exact: true }).fill(fieldname);

  await page
    .locator('div')
    .filter({ hasText: /^type \*$/ })
    .first()
    .click();

  await clickDropdownElement(page, type, 100);

  if (display) {
    await page.locator('.q-editor__content').fill(displayvalue);
  }

  if (picklist) {
    for (let i = 0; i < picklistvalues.length; i++) {
      if (i == 0) {
        await page.getByLabel('value:').first().fill(picklistvalues[i].value);
      } else {
        await page.getByLabel('value:').nth(i).fill(picklistvalues[i].value);
      }

      if (i != picklistvalues.length - 1) {
        await page.locator('button').filter({ hasText: 'add' }).click();
      }
    }
  }

  if (relation) {
    await page.getByLabel('relation name (relationname) *').fill(relationname);

    await page
      .locator('div')
      .filter({ hasText: /^relation object \(relation_id\) \*$/ })
      .first()
      .click();

    await clickDropdownElement(page, relationobject, 100);
  }

  await page.locator('button').filter({ hasText: 'save' }).click();

  await page.getByRole('button', { name: 'Expand "More"' }).click();

  await page.getByRole('listitem').filter({ hasText: 'fields' }).click();

  await expect(page.getByText(fieldname)).toBeVisible();

  // await page.waitForTimeout(4000);
}

export async function addFieldToObject(page, objectapiname, objectname, fieldapiname, fieldname) {
  // await page.goto(process.env.PURL);
  // await page.waitForLoadState('networkidle0');
  // await page.locator('a').filter({ hasText: 'objectssetup' }).click();
  // await page.getByRole('main').getByText(objectname).click();
  // await page.getByTestId('fieldsorder').click();
  // await clickDropdownElement(page, fieldname, 100);
  // await page.keyboard.press('Escape');
  // await page.locator('button').filter({ hasText: 'save' }).click();
  // await page.getByRole('main').getByText(objectname).click();
  // await expect(page.getByText(fieldname)).toBeVisible();
  // await page.waitForTimeout(4000);
}

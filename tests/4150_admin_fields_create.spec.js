import { test, expect } from '@playwright/test';
import { loginUser, logoutUser } from './helper4000.js';
import { createObject } from './helper4140.js';
import { createField, addFieldToObject } from './helper4150.js';

test('admin create field 41501', async ({ page }) => {
  await loginUser(page, process.env.PADMINEMAIL, process.env.PADMINPASSWORD);

  await createField(
    page,
    'pwobject1',
    'PW Object 1',
    'pwfield41501',
    'Playwright Field bool 41501',
    'bool',
  );

  await logoutUser(page);
});

test('admin add field to object 41501', async ({ page }) => {
  await loginUser(page, process.env.PADMINEMAIL, process.env.PADMINPASSWORD);

  await addFieldToObject(
    page,
    'pwobject1',
    'PW Object 1',
    'pwfield41501',
    'Playwright Field bool 41501',
  );

  await logoutUser(page);
});

test('admin create field 41502', async ({ page }) => {
  await loginUser(page, process.env.PADMINEMAIL, process.env.PADMINPASSWORD);

  await createField(
    page,
    'pwobject1',
    'PW Object 1',
    'pwfield41502',
    'Playwright Field date 41502',
    'date',
  );

  await logoutUser(page);
});

test('admin add field to object 41502', async ({ page }) => {
  await loginUser(page, process.env.PADMINEMAIL, process.env.PADMINPASSWORD);

  await addFieldToObject(
    page,
    'pwobject1',
    'PW Object 1',
    'pwfield41502',
    'Playwright Field date 41502',
  );

  await logoutUser(page);
});

test('admin create field 41503', async ({ page }) => {
  await loginUser(page, process.env.PADMINEMAIL, process.env.PADMINPASSWORD);

  await createField(
    page,
    'pwobject1',
    'PW Object 1',
    'pwfield41503',
    'Playwright Field datetime 41503',
    'datetime',
  );

  await logoutUser(page);
});

test('admin add field to object 41503', async ({ page }) => {
  await loginUser(page, process.env.PADMINEMAIL, process.env.PADMINPASSWORD);

  await addFieldToObject(
    page,
    'pwobject1',
    'PW Object 1',
    'pwfield41503',
    'Playwright Field datetime 41503',
  );

  await logoutUser(page);
});

test('admin create field 41504', async ({ page }) => {
  await loginUser(page, process.env.PADMINEMAIL, process.env.PADMINPASSWORD);

  await createField(
    page,
    'pwobject1',
    'PW Object 1',
    'pwfield41504',
    'Playwright Field display 41504',
    'display',
    true,
    'displayvalue41504',
  );

  await logoutUser(page);
});

test('admin add field to object 41504', async ({ page }) => {
  await loginUser(page, process.env.PADMINEMAIL, process.env.PADMINPASSWORD);

  await addFieldToObject(
    page,
    'pwobject1',
    'PW Object 1',
    'pwfield41504',
    'Playwright Field display 41504',
  );

  await logoutUser(page);
});

test('admin create field 41505', async ({ page }) => {
  await loginUser(page, process.env.PADMINEMAIL, process.env.PADMINPASSWORD);

  await createField(
    page,
    'pwobject1',
    'PW Object 1',
    'pwfield41505',
    'Playwright Field file 41505',
    'file',
  );

  await logoutUser(page);
});

test('admin add field to object 41505', async ({ page }) => {
  await loginUser(page, process.env.PADMINEMAIL, process.env.PADMINPASSWORD);

  await addFieldToObject(
    page,
    'pwobject1',
    'PW Object 1',
    'pwfield41505',
    'Playwright Field file 41505',
  );

  await logoutUser(page);
});

test('admin create field 41506', async ({ page }) => {
  await loginUser(page, process.env.PADMINEMAIL, process.env.PADMINPASSWORD);

  await createField(
    page,
    'pwobject1',
    'PW Object 1',
    'pwfield41506',
    'Playwright Field longtext 41506',
    'longtext',
  );

  await logoutUser(page);
});

test('admin add field to object 41506', async ({ page }) => {
  await loginUser(page, process.env.PADMINEMAIL, process.env.PADMINPASSWORD);

  await addFieldToObject(
    page,
    'pwobject1',
    'PW Object 1',
    'pwfield41506',
    'Playwright Field longtext 41506',
  );

  await logoutUser(page);
});

test('admin create field 41507', async ({ page }) => {
  await loginUser(page, process.env.PADMINEMAIL, process.env.PADMINPASSWORD);

  await createField(
    page,
    'pwobject1',
    'PW Object 1',
    'pwfield41507',
    'Playwright Field number 41507',
    'number',
  );

  await logoutUser(page);
});

test('admin add field to object 41507', async ({ page }) => {
  await loginUser(page, process.env.PADMINEMAIL, process.env.PADMINPASSWORD);

  await addFieldToObject(
    page,
    'pwobject1',
    'PW Object 1',
    'pwfield41507',
    'Playwright Field number 41507',
  );

  await logoutUser(page);
});

test('admin create field 41508', async ({ page }) => {
  await loginUser(page, process.env.PADMINEMAIL, process.env.PADMINPASSWORD);

  await createField(
    page,
    'pwobject1',
    'PW Object 1',
    'pwfield41508',
    'Playwright Field picklist 41508',
    'picklist',
    false,
    '',
    true,
    [
      { value: 'picklistvalue1' },
      { value: 'picklistvalue2' },
      { value: 'picklistvalue3' },
      { value: 'picklistvalue4' },
    ],
  );

  await logoutUser(page);
});

test('admin add field to object 41508', async ({ page }) => {
  await loginUser(page, process.env.PADMINEMAIL, process.env.PADMINPASSWORD);

  await addFieldToObject(
    page,
    'pwobject1',
    'PW Object 1',
    'pwfield41508',
    'Playwright Field picklist 41508',
  );

  await logoutUser(page);
});

test('admin create field 41509', async ({ page }) => {
  await loginUser(page, process.env.PADMINEMAIL, process.env.PADMINPASSWORD);

  await createField(
    page,
    'pwobject1',
    'PW Object 1',
    'pwfield41509',
    'Playwright Field picklistmulti 41509',
    'picklist multiple',
    false,
    '',
    true,
    [
      { value: 'picklistvalue1' },
      { value: 'picklistvalue2' },
      { value: 'picklistvalue3' },
      { value: 'picklistvalue4' },
    ],
  );

  await logoutUser(page);
});

test('admin add field to object 41509', async ({ page }) => {
  await loginUser(page, process.env.PADMINEMAIL, process.env.PADMINPASSWORD);

  await addFieldToObject(
    page,
    'pwobject1',
    'PW Object 1',
    'pwfield41509',
    'Playwright Field picklistmulti 41509',
  );

  await logoutUser(page);
});

test('admin create field 415010', async ({ page }) => {
  await loginUser(page, process.env.PADMINEMAIL, process.env.PADMINPASSWORD);

  await createField(
    page,
    'pwobject1',
    'PW Object 1',
    'pwfield415010',
    'Playwright Field relation 415010',
    'relation',
    false,
    '',
    false,
    [],
    true,
    'relationname1',
    'PW Object 0',
  );

  await logoutUser(page);
});

test('admin add field to object 415010', async ({ page }) => {
  await loginUser(page, process.env.PADMINEMAIL, process.env.PADMINPASSWORD);

  await addFieldToObject(
    page,
    'pwobject1',
    'PW Object 1',
    'pwfield415010',
    'Playwright Field relation 415010',
  );

  await logoutUser(page);
});

test('admin create field 415011', async ({ page }) => {
  await loginUser(page, process.env.PADMINEMAIL, process.env.PADMINPASSWORD);

  await createField(
    page,
    'pwobject1',
    'PW Object 1',
    'pwfield415011',
    'Playwright Field relationmulti 415011',
    'relation multiple',
    false,
    '',
    false,
    [],
    true,
    'relationname2',
    'PW Object 0',
  );

  await logoutUser(page);
});

test('admin add field to object 415011', async ({ page }) => {
  await loginUser(page, process.env.PADMINEMAIL, process.env.PADMINPASSWORD);

  await addFieldToObject(
    page,
    'pwobject1',
    'PW Object 1',
    'pwfield415011',
    'Playwright Field relationmulti 415011',
  );

  await logoutUser(page);
});

test('admin create field 415012', async ({ page }) => {
  await loginUser(page, process.env.PADMINEMAIL, process.env.PADMINPASSWORD);

  await createField(
    page,
    'pwobject1',
    'PW Object 1',
    'pwfield415012',
    'Playwright Field text 415012',
    'text',
  );

  await logoutUser(page);
});

test('admin add field to object 415012', async ({ page }) => {
  await loginUser(page, process.env.PADMINEMAIL, process.env.PADMINPASSWORD);

  await addFieldToObject(
    page,
    'pwobject1',
    'PW Object 1',
    'pwfield41502',
    'Playwright Field text 415012',
  );

  await logoutUser(page);
});

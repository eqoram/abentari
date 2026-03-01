import { test, expect } from '@playwright/test';
import { loginUser, logoutUser } from './helper4000.js';
import { createRecord0, createRecord1 } from './helper4220.js';
import { getJobId } from './helperhelper.js';

test('admin create record 0 1', async ({ page }) => {
  await loginUser(page, process.env.PADMINEMAIL, process.env.PADMINPASSWORD);

  await createRecord0(page, 'pwobject0', 'PW Object 0', 'name ' + '1' + ' ' + getJobId());

  await logoutUser(page);
});

test('admin create record 1 1', async ({ page }) => {
  await loginUser(page, process.env.PADMINEMAIL, process.env.PADMINPASSWORD);

  await createRecord1(
    page,
    'pwobject1',
    'PW Object 1',
    'name ' + '1' + ' ' + getJobId(),
    'longname ' + '1' + ' ' + getJobId(),
    '1',
    'picklistvalue1',
    'picklistvalue1',
    'name ' + '1' + ' ' + getJobId(),
    'name ' + '1' + ' ' + getJobId(),
    'secondtext ' + '1' + ' ' + getJobId(),
  );

  await logoutUser(page);
});

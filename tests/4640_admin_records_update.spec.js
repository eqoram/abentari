import { test, expect } from '@playwright/test';
import { loginUser, logoutUser } from './helper4000.js';
import { updateRecord } from './helper4640.js';
import { getJobId } from './helperhelper.js';

test('admin update record', async ({ page }) => {
  await loginUser(page, process.env.PADMINEMAIL, process.env.PADMINPASSWORD);

  await updateRecord(
    page,
    'pwobject1',
    'PW Object 1',
    'name ' + '1' + ' ' + getJobId(),
    'name ' + '1' + ' UPDATED ' + getJobId(),
  );

  await logoutUser(page);
});

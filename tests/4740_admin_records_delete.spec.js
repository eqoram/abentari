import { test, expect } from '@playwright/test';
import { loginUser, logoutUser } from './helper4000.js';
import { deleteRecord } from './helper4740.js';
import { getJobId } from './helperhelper.js';

test('admin delete record', async ({ page }) => {
  await loginUser(page, process.env.PADMINEMAIL, process.env.PADMINPASSWORD);

  await deleteRecord(page, 'pwobject1', 'PW Object 1', 'name ' + '1' + ' UPDATED ' + getJobId());

  await logoutUser(page);
});

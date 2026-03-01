import { test, expect } from '@playwright/test';

export async function clickDropdownElement(page, elementname, elementnumber) {
  // Step 2: Wait for the Quasar dropdown container to appear
  const dropdown = page.locator('.q-menu:visible, .q-menu__content:visible').first();
  await dropdown.waitFor({ state: 'visible' });

  // Step 3: Scroll and find the lazy-loaded "setup" option
  let found = false;
  for (let i = 0; i < elementnumber; i++) {
    const option = dropdown.locator('[role="option"]', {
      hasText: new RegExp(`^${elementname}$`, 'i'),
    });

    if ((await option.count()) > 0) {
      await option.first().scrollIntoViewIfNeeded();
      await option.first().click();
      found = true;
      break;
    }

    // Scroll the dropdown container (Quasar handles virtualization this way)
    await dropdown.evaluate((el) => el.scrollBy(0, 150));
    await page.waitForTimeout(300); // Wait for lazy-loaded items
  }

  if (!found) {
    throw new Error('Could not find element option in the dropdown.');
  }
}

export function getJobId() {
  let ljobid = '';

  if (process.env.PJOBID) {
    ljobid = process.env.PJOBID;
  }

  return ljobid;
}

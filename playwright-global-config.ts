// global-setup.ts
import type { FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  let ljobid = '';

  if (process.env.PJOBID) {
    ljobid = process.env.PJOBID;
  }

  console.log('🚀 Running test with jobid: ' + ljobid);
  // You can do things like:
  // - Prepare a database
  // - Set environment variables
  // - Generate a login token and store it
}

export default globalSetup;

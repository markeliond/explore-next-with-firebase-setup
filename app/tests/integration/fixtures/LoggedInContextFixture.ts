import { test as base } from '@playwright/test';
import type { BrowserContext,  } from '@playwright/test';
import { TEST_SERVER_URL } from '../testHelpers';

// Declare worker fixtures.
type LoggedInContextFixtures = {
  loggedInContext: BrowserContext
};

// Note that we did not provide any test-scoped fixtures, so we pass {}.
const test = base.extend<{}, LoggedInContextFixtures>({

  // this fixture starts automatically for every worker - we pass "auto" for that.
  loggedInContext: [ async ({ browser }, use, testInfo) => {

    // Setup context.
    const context = await browser.newContext();
    
    // Login.
    console.log('Logging in...');
    const page = await context.newPage();
    await page.goto(`${TEST_SERVER_URL}/dashboard`);
    await page.waitForSelector('.firebaseui-title');
    await page.fill('input[name="email"]', 'mark@eliondigital.com');
    await page.click('text=Next');
    await page.fill('input[name="password"]', 'tester');
    await page.click('button:has-text("sign in")');
    await page.waitForSelector('id=user-avatar');
    console.log('Logging in...done');

    // Use the logged in context in the tests.
    await use(context);

    // NOTE:  no need for cleanup as expecting default context used (can't clean this up)
    //
    // // Cleanup.
    // console.log('Closing Browser context...');
    // await new Promise(f => context.close());
    // console.log('Closing Browser context...closed');
  }, { scope: 'worker', auto: true } ],
});

export default test;
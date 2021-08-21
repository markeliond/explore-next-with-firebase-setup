import { expect, test } from '@playwright/test';
import { TEST_SERVER_URL } from './testHelpers';
import testLoggedIn from './fixtures/LoggedInContextFixture';
 
   
test('shows sign in page when user not authenticated', async ( { browser }) => {
    
    const page = await browser.newPage();

    await page.goto(`${TEST_SERVER_URL}/dashboard`);

    await page.waitForSelector('id=sign-in-prompt');

    expect(await page.textContent('id=sign-in-prompt')).toMatch(/(Sign in).*/);

    expect(await page.title()).toBe('Dashboard');
    
});


testLoggedIn('successfully loads when user authenticated', async ( { loggedInContext }) => {
    
    const page = await loggedInContext.newPage();

    await page.goto(`${TEST_SERVER_URL}/dashboard`);

    await page.waitForSelector('id=page-title');
    
    expect(await page.textContent('id=page-title')).toMatch(/(Dashboard).*/);

    expect(await page.title()).toBe('Dashboard');
    
});



    

import { expect, test } from '@playwright/test';
import { DEFAULT_USER_EMAIL, DEFAULT_USER_PASSWORD, TEST_SERVER_URL } from './testHelpers';
import testLoggedIn from './fixtures/LoggedInContextFixture';
 
   
test('shows sign in page when user not authenticated', async ( { browser }) => {
    
    const page = await browser.newPage();

    await page.goto(`${TEST_SERVER_URL}/signin`);

    await page.waitForSelector('id=sign-in-prompt');

    expect(await page.textContent('id=sign-in-prompt')).toMatch(/(Sign in).*/);

    expect(await page.title()).toBe('Sign In');
    
});

test('redirects to routeTo param after user signs in', async ( { browser }) => {
    
    const TARGET_URL = 'atargeturlthatdoesnotexist';

    const page = await browser.newPage();

    await page.goto(`${TEST_SERVER_URL}/signin?routeTo=${TARGET_URL}`);
    await page.waitForSelector('.firebaseui-title');
    await page.fill('input[name="email"]', DEFAULT_USER_EMAIL);
    await page.click('text=Next');
    await page.fill('input[name="password"]', DEFAULT_USER_PASSWORD);
    await page.click('button:has-text("sign in")');
    await page.waitForSelector('id=user-avatar');

    await page.waitForURL(`${TEST_SERVER_URL}/${TARGET_URL}`);

    await page.waitForSelector('h1');
   
    expect(await page.textContent('h1')).toMatch('404');

    // title starts with 404 
    expect(await page.title()).toMatch(/(404).*/);
    
});


testLoggedIn('redirects to dashboard if already logged in', async ( { loggedInContext }) => {
    
    const page = await loggedInContext.newPage();

    await page.goto(`${TEST_SERVER_URL}/signin`);

    // should auto redirect as are signed in

    await page.waitForSelector('id=page-title');
    
    expect(await page.textContent('id=page-title')).toMatch(/(Dashboard).*/);

    expect(await page.title()).toBe('Dashboard');

    expect(await page.screenshot()).toMatchSnapshot('dashboard.png');
    
});

testLoggedIn('redirects to target url if already logged in and target url is in the query', async ( { loggedInContext }) => {
    
    const TARGET_URL = 'atargeturlthatdoesnotexist'

    const page = await loggedInContext.newPage();

    await page.goto(`${TEST_SERVER_URL}/signin?routeTo=${TARGET_URL}`);

    // should auto redirect as are signed in, but this 
    await page.waitForURL(`${TEST_SERVER_URL}/${TARGET_URL}`);

    await page.waitForSelector('h1');
    
    expect(await page.textContent('h1')).toMatch('404');

    // title starts with 404 
    expect(await page.title()).toMatch(/(404).*/);
});



    

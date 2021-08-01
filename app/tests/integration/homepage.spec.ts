import { test, expect } from '@playwright/test';
import { TEST_SERVER_URL } from "./testHelpers";

test.describe('Home page', () => {

  test('successfully loads', async ({ page }) => {

    await page.goto(TEST_SERVER_URL);
    await page.waitForSelector("id=page-title")
    
    expect(await page.title()).toBe('Next with Firebase');
  
    expect(await page.screenshot()).toMatchSnapshot('homepage.png');
  });

})

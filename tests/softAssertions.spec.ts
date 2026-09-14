import { test, expect, chromium, Page } from '@playwright/test';


//browser -> context -> page
test('soft assertions', async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();

    //creating two pages
    const page1 = await context.newPage();
    await page1.goto('https://testautomationpractice.blogspot.com/');
    await expect.soft(page1).toHaveURL("https://testautomationpractice.blogsot.com/");

    const page2 = await context.newPage();
    await page2.goto('https://www.youtube.com/');
    await expect(page2).toHaveURL("https://www.youtube.com/");
});


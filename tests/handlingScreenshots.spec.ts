import { test, expect, chromium, Page } from '@playwright/test';


test('Handling screenshots', async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();

    //creating two pages
    const page1 = await context.newPage();
    await page1.goto('https://testautomationpractice.blogspot.com/');
    
    //capture screenshot 
    // await page1.screenshot({path:'screenshots/report.png'});

    //fullscreen screenshot
    // const timestamp = Date.now(); 
    // await page1.screenshot({
    //     path:'screenshots/'+'homepage'+timestamp+'.png',
    //     fullPage:true
    // });

    //element screenshot
    const  cpuProcess = page1.locator(".chrome-cu");
    const timestamp = Date.now(); 
    await cpuProcess.screenshot({
        path:'screenshots/'+'homepage'+timestamp+'.png'});


    // const page2 = await context.newPage();
    // await page2.goto('https://www.youtube.com/');
    // await expect(page2).toHaveURL("https://www.youtube.com/");
    
});

test.only('Handling screenshots video', async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/');

    const cpuProcess = page.locator(".chrome-cu");

    const timestamp = Date.now();

    await cpuProcess.screenshot({
        path: `screenshots/homepage${timestamp}.png`
    });
});

test('handling tabs',async({context})=>{

    const parentPage = await context.newPage();

    await parentPage.goto("https://testautomationpractice.blogspot.com/");

    // context.waitForEvent('page');
    // parentPage.locator("button:has-text('New Tab'").click();
    const [childPage] = await Promise.all([context.waitForEvent('page'),await parentPage.locator("button:has-text('New Tab')").click()])

    //switch between tabs and get title
    const pages=context.pages();
    console.log(pages.length);

    //approach - 1
    console.log(await pages[0].title());
    console.log(await pages[1].title());

    //approach - 2
    console.log(await parentPage.title());
    console.log(await childPage.title());

})

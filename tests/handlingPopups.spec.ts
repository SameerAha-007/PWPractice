import {test,expect,Locator,Page} from "@playwright/test";

test("Handling Popups",async ({context})=>{
    const page=await context.newPage();
    await page.goto("https://testautomationpractice.blogspot.com/");

    await Promise.all([page.waitForEvent('popup'),await page.locator("#PopUp").click()]);
    const allPopupwindows = context.pages();
    console.log(allPopupwindows[0].url());

    for(const pg of allPopupwindows){
        const title=await pg.title();
        if(title.includes("playwright")){
            await pg.locator(".getStarted_Sjon").click();
            await pg.close();
        }
    }

    //Authenticated popups
    // Approach - 1

    // await page.goto("http:admin:admin@theinternet.herokuapp.com"); // basic auth
    // await page.waitForLoadState(); //await for page load
    // expect(page.locator(text=congrats)).toBeVisible();

    // Approach - 2

    // const context = await browser.newContext({httpCrediantials:{username:'admin',password:'admin'}});
    // const page = await context.newPage();
    // page.goto("url");

})

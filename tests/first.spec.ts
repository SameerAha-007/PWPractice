import {test,expect} from '@playwright/test';

test("verify page title",async ({page})=>{
    await page.goto("https://chatgpt.com/");
    let title : string = await page.title();
    console.log(title);
    await expect(page).toHaveTitle("ChatGPT");
})
import {test,expect} from '@playwright/test';

test("test demo",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/p/playwrightpractice.html");

    await page.getByRole("textbox",{name:"Username:"}).fill("sam");
    await page.waitForTimeout(3000);

    await expect(page.getByText("Locate elements by their text content.")).toBeVisible();
    await page.waitForTimeout(3000);

    await page.getByLabel("Email Address:").fill("john@example.com");
    await page.waitForTimeout(3000);

    await page.getByPlaceholder("Type your message here...").fill("sameer ahamad");
    await page.waitForTimeout(3000);

    await expect(page.getByAltText("logo image")).toBeVisible();

    await page.getByTitle("Click to save your changes").click();
})
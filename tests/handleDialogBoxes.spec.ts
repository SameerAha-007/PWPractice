import { test, expect, Locator, Page } from "@playwright/test";

test("handling dialog boxes", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    //we should put the page.on method before the actual locator
    page.on("dialog",(dialog)=>{
        console.log(dialog.type());
        console.log(dialog.message());
        //dialog.accept();
        dialog.dismiss();
    })

    // await page.locator("#alertBtn").click();
    await page.locator("#confirmBtn").click();
    const message=await page.locator("#demo").textContent();
    expect(message).toContain("Cancel");



})
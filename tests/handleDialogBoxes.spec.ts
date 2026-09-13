import { test, expect, Locator, Page } from "@playwright/test";

test("handling dialog boxes", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    //we should put the page.on method before the actual locator
    page.on("dialog",(dialog)=>{
        console.log(dialog.type());
        console.log(dialog.message());
        //dialog.accept(); //1
        // dialog.dismiss();  //2
        expect(dialog.defaultValue()).toContain("Harry Potter");
        dialog.accept("sameer");
    })

    // await page.locator("#alertBtn").click(); //1

    // await page.locator("#confirmBtn").click(); //2
    // const message=await page.locator("#demo").textContent();
    // expect(message).toContain("Cancel");

    await page.locator("#promptBtn").click(); 
    const message=await page.locator("#demo").textContent();
    expect(message).toContain("sameer");


})
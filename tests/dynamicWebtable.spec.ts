import { test, expect, Locator } from "@playwright/test";

test("Handling dynamic tables", async ({ page }) => {
    await page.goto("https://practice.expandtesting.com/dynamic-table");
    

    //select all the rows,then find no of rows.
    const table = page.locator("table tbody");

})
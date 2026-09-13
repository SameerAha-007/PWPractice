import { test, expect, Locator, Page} from "@playwright/test";

//JQL datepickers
async function selectDate(targetyear: string, targetMonth: string, targetDate: string, page: Page, isFuture: boolean) {
    while (true) {

        const currentMonth = await page.locator(".ui-datepicker-month").textContent();
        const currentYear = await page.locator(".ui-datepicker-year").textContent();

        if (currentMonth === targetMonth && currentYear === targetyear) {
            break;
        }
        if(isFuture){
            await page.locator(".ui-datepicker-next").click();//future
        }
        else{
            await page.locator(".ui-datepicker-prev").click();//past
        }
        // await page.waitForTimeout(3000);
    }

    const allDates=await page.locator(".ui-datepicker-calendar td").all();
    for (let dt of allDates){
        if(await dt.innerText()===targetDate){
            await dt.click();
            break;
        }
    }

}


test("Handling DatePickers", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const datePicker: Locator = page.locator("input#datepicker");
    expect(datePicker).toBeVisible();
    //mm/dd/yyyy - using fill() method
    // await datePicker.fill("08/27/2004");
    // await page.waitForTimeout(3000);
     await datePicker.click();

     const month:string = "August";
     const year:string = "2004";
     const date:string = "27";
     await selectDate(year,month,date,page,false);
     const expectedDate="08/27/2004";
     expect(datePicker).toHaveValue(expectedDate);
})

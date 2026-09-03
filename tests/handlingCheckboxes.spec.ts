import {test,expect,Locator} from "@playwright/test";

test("Handling Checkboxes",async ({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    //select specific checkbox using getlabel with assertions
    const sundayCheckbox = page.getByLabel("Sunday");
    await sundayCheckbox.check();
    await expect(sundayCheckbox).toBeChecked();
    await page.waitForTimeout(3000);

    //access and select all checkboxes and asser each is checked
    const days:string[] = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const checkboxes:Locator[] = days.map(index=>page.getByLabel(index));
    for(const checkbox of checkboxes){
        await checkbox.check();
        await expect(checkbox).toBeChecked();
    }

    for (const checkbox of checkboxes.slice(-3)){
        await checkbox.uncheck();
        await expect(checkbox).not.toBeChecked();
    }

    //select checkboxes by index
    const indexes:number[] = [1,2]; 
    for (let i of indexes){
            if(await checkboxes[i].isChecked()){
                await checkboxes[i].uncheck();
                await page.waitForTimeout(2000);
                await expect(checkboxes[i]).not.toBeChecked();
            }
    }

    //select checkboxes by target label
    const targt:string="Sunday";
    for (let label of days){
        if(label===targt){
            await page.getByLabel(label).uncheck();
            await expect(page.getByLabel(label)).not.toBeChecked();
        }
    }
    await page.waitForTimeout(3000);

})

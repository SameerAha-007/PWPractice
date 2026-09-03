import {test,expect,Locator} from "@playwright/test";

test("Handling Dropdowns",async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    //select option from the dropdown 4 ways
    const dropdowne = page.locator("#country");

    //1. select by value
    await dropdowne.selectOption({value:"india"});
    await expect(dropdowne).toHaveValue("india");

    //2. select by label
    await dropdowne.selectOption({label:"Japan"});
    await expect(dropdowne.locator("option:checked"))
    .toHaveText("Japan");

    //3. select by Visible text
    await dropdowne.selectOption("China");
    await expect(dropdowne.locator("option:checked"))
    .toHaveText("China");

    //4. select by index
    await dropdowne.selectOption({index:3});
    await expect(dropdowne.locator("option:checked"))
    .toHaveText("Germany"); 
    

    //5.count of dropdown options
    const options : Locator = page.locator("#country > option");
    const count = await options.count();
    console.log("Total options in the dropdown are : "+count);
    await expect(options).toHaveCount(10);

    //check an option present in dropdown or not
    const optionsText:string[] = (await options.allTextContents()).map(text => text.trim());
    console.log("Options in the dropdown are : "+optionsText);
    for (let opt of optionsText){
        console.log(opt);
    }
    expect(optionsText).toContain("India");

    //multi select dropdown
    await page.locator("#colors").selectOption(["red","blue"]);
    await page.locator("#colors").selectOption([{label:"Yellow"},{label:"Green"}]);



})

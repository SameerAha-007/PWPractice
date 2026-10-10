import { test, expect, Locator } from "@playwright/test";

//tags approach 1
test("@sanity Handling Dropdowns", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    //select option from the dropdown 4 ways
    const dropdowne = page.locator("#country");

    //1. select by value
    await dropdowne.selectOption({ value: "india" });
    await expect(dropdowne).toHaveValue("india");

    //2. select by label
    await dropdowne.selectOption({ label: "Japan" });
    await expect(dropdowne.locator("option:checked"))
        .toHaveText("Japan");

    //3. select by Visible text
    await dropdowne.selectOption("China");
    await expect(dropdowne.locator("option:checked"))
        .toHaveText("China");

    //4. select by index
    await dropdowne.selectOption({ index: 3 });
    await expect(dropdowne.locator("option:checked"))
        .toHaveText("Germany");
})

//tags approach 2
test("Handling Dropdowns 1",{tag:'@regression'}, async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    //select option from the dropdown 4 ways
    const dropdowne = page.locator("#country");

    //1. select by value
    await dropdowne.selectOption({ value: "india" });
    await expect(dropdowne).toHaveValue("india");

    //2. select by label
    await dropdowne.selectOption({ label: "Japan" });
    await expect(dropdowne.locator("option:checked"))
        .toHaveText("Japan");

    //3. select by Visible text
    await dropdowne.selectOption("China");
    await expect(dropdowne.locator("option:checked"))
        .toHaveText("China");

    //4. select by index
    await dropdowne.selectOption({ index: 3 });
    await expect(dropdowne.locator("option:checked"))
        .toHaveText("Germany");


    //5.count of dropdown options
    const options: Locator = page.locator("#country > option");
    const count = await options.count();
    console.log("Total options in the dropdown are : " + count);
    await expect(options).toHaveCount(10);

    //check an option present in dropdown or not
    const optionsText: string[] = (await options.allTextContents()).map(text => text.trim());
    console.log("Options in the dropdown are : " + optionsText);
    for (let opt of optionsText) {
        console.log(opt);
    }
    expect(optionsText).toContain("India");

    //multi select dropdown
    await page.locator("#colors").selectOption(["red", "blue"]);
    await page.locator("#colors").selectOption([{ label: "Yellow" }, { label: "Green" }]);

})

//approach 2 multiple tags
test("Handling Dropdowns",{tag:['@sanity','@regression']}, async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    //select option from the dropdown 4 ways
    const dropdowne = page.locator("#country");

    //1. select by value
    await dropdowne.selectOption({ value: "india" });
    await expect(dropdowne).toHaveValue("india");

    //2. select by label
    await dropdowne.selectOption({ label: "Japan" });
    await expect(dropdowne.locator("option:checked"))
        .toHaveText("Japan");

    //3. select by Visible text
    await dropdowne.selectOption("China");
    await expect(dropdowne.locator("option:checked"))
        .toHaveText("China");

    //4. select by index
    await dropdowne.selectOption({ index: 3 });
    await expect(dropdowne.locator("option:checked"))
        .toHaveText("Germany");


    //5.count of dropdown options
    const options: Locator = page.locator("#country > option");
    const count = await options.count();
    console.log("Total options in the dropdown are : " + count);
    await expect(options).toHaveCount(10);

    //check an option present in dropdown or not
    const optionsText: string[] = (await options.allTextContents()).map(text => text.trim());
    console.log("Options in the dropdown are : " + optionsText);
    for (let opt of optionsText) {
        console.log(opt);
    }
    expect(optionsText).toContain("India");

    //multi select dropdown
    await page.locator("#colors").selectOption(["red", "blue"]);
    await page.locator("#colors").selectOption([{ label: "Yellow" }, { label: "Green" }]);

})


//to run these tests with tags
/*
1.run all sanity or regression
npx playwright test tags.spec.ts --grep "@sanity"
or
npx playwright test tags.spec.ts --grep-invert "@sanity"

2.run tests for both sanity and regression
npx playwright test tags.spec.ts --grep "(?=.*@sanity) (?=.*regression)"

3.run tests belong to either sanity or regression
npx playwright test tags.spec.ts --grep "@sanity|@regression"

4.configure globally in playwright.config.ts
export default defineConfig({
  grep:/@sanity/,
  or
  grepInvert:/@regression/
  
*/ 
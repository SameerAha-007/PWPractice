import {test,expect,Locator} from "@playwright/test";

test("xpath practice",async ({page})=>{
    await page.goto("https://selectorshub.com/xpath-practice-page/");

    //label for username by using xpath
    const usrnmLabel : string | null = await page.locator("//*[@class='userform']/label[1]").textContent();
    expect(usrnmLabel).toBe("User Email");
    console.log("Username label is : "+usrnmLabel);

    //all labels within userform class by using xpath
    const allLabels:string[] = await page.locator("//*[@class='userform']/label").allTextContents();
    expect(allLabels).toEqual(["User Email","Password"]);
    console.log("All labels are : "+allLabels);

    //contains() function in xpath
    await page.locator("//*[contains(@name,'sswo')]").fill("sam@123");

    //printing value we entered
    const pswd:Locator = page.locator("//input[@id='pass']");
    const pswdValue : string = await pswd.inputValue();
    console.log("Password value is : "+pswdValue);

    //starts-with() function in xpath
    await page.locator("//input[starts-with(@name,'compa')]").first().fill("sam@123");

    //normalize-space() function in xpath
    await page.locator("//span[normalize-space()='Courses']").first().click();

    //text() function in xpath
    const goTOCourses:Locator=page.locator("//span[text()='Go To The Course']");
    await expect(goTOCourses.first()).toBeVisible();
    await goTOCourses.first().click();
    console.log(await goTOCourses.first().textContent());
    await page.waitForTimeout(3000);
})
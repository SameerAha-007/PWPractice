import {test,expect,Locator} from "@playwright/test";

test("Css locators demo",async ({page})=>{
    await page.goto("https://www.hyrtutorials.com/p/css-selectors-practice.html");
    
    //css locator by id
    const firstName:Locator =page.locator("#firstName");
    await expect(firstName).toBeEditable();
    await firstName.fill("Sameer");
    console.log("First name :",await firstName.inputValue());

    //css locator by tag with class and attribute
    const lastName:Locator = page.locator("input.name[placeholder='Last Name']");
    await expect(firstName).toBeEditable();
    await lastName.fill("Shaik");
    console.log("Last name :",await lastName.inputValue());

    //css locator by class
    const gender:Locator = page.locator(".gender");
    await expect(firstName).toBeEditable();
    await gender.fill("Male");
    console.log("Gender :",await gender.inputValue());

    //css locator by attribute
    await expect(page.locator("[placeholder='City']")).toBeEditable();
    await page.locator("[placeholder='City']").fill("Hyderabad");
    console.log("City :",await page.locator("[placeholder='City']").inputValue());

    //absolute css locator
    const country:Locator = page.locator(".container>input[placeholder='Country']");
    await expect(country).toBeEditable();
    await country.fill("India");
    const countryValue:string =await country.inputValue()
    console.log("Country :",countryValue);
    expect(countryValue).toBe("India");
    
    //starts-with(^) css locator
    const question:Locator = page.locator("input[placeholder^='Enter your security ques']");
    await expect(question).toBeEditable();
    await question.fill("who is your favorite batsmen");
    console.log("Security Question :",await question.inputValue());

    //ends-with($) css locator
    const answer:Locator = page.locator("input[placeholder$='answer']");
    await expect(answer).toBeEditable();
    await answer.fill("Maxwell");
    console.log("Security Answer :",await answer.inputValue());

    //contains(*) css locator
    const verify:Locator = page.locator("input[placeholder*='personal']");
    await expect(verify).toBeEditable();
    await verify.fill("Verified");
    console.log("Verify your personal details :",await verify.inputValue());



})
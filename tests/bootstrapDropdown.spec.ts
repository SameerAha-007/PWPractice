import {test,expect,Locator} from "@playwright/test";

test("Handling Bootstrap Dropdowns",async ({page})=>{

    await page.goto("https://www.flipkart.com/");
    await page.locator("input[name='q']").first().fill("shoes");
    await page.waitForTimeout(5000);

    //get all the suggested options 
    const options:Locator=page.locator("ul>li");
    const count:number=await options.count();
    console.log("count of the suggesstion : ",count);

    //printing all the suggested options in the console
    for (let i=0;i<count;i++){
        const text:string=await options.nth(i).innerText();
        console.log(text);
    }
    for (let i=0;i<count;i++){
        // select or click on the options
        const text:string=await options.nth(i).innerText();
        if(text===("shoes for women")){
            options.nth(i).click();
            break;
        }
    }
    await expect(page).toHaveURL(/search/);
})
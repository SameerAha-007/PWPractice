import { test, expect, Locator } from "@playwright/test";

test("Handling dynamic tables", async ({ page }) => {
    await page.goto("https://practice.expandtesting.com/dynamic-table");
    

    //select all the rows,then find no of rows.
    const table = page.locator("table tbody"); 
    const allRows:Locator[]=await table.locator("tr").all();
    console.log(allRows.length);
    expect(allRows).toHaveLength(4);

    //for chrome process get value of cpu load
    let cpuLoad='';
    for (const row of allRows){
        if (await row.locator("td").nth(0).innerText()==="Chrome"){
            cpuLoad=await row.locator("td:has-text('%')").innerText();
            console.log(cpuLoad);
            break;
        }
    }

    //read each row check chrome is present
    //compare it with value in the yellow box
    let yellowBox = await page.locator("#chrome-cpu").innerText();
    console.log(yellowBox);
    if(yellowBox.includes(cpuLoad)){
        console.log("Equal");
    }
    else{
        console.log("Not Equal");
    }




})
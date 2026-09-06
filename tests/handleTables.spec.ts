import { test, expect, Locator } from "@playwright/test";

test("Handling tables", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    //chaining of locators
    const table: Locator = page.locator("table[name='BookTable'] tbody");
    const rows: Locator = table.locator("tr");
    const columns: Locator = rows.locator("th");

    //read all data from 2nd row
    const scndrowCells: Locator = rows.nth(2).locator("td");
    const scndrowTexts: string[] = await scndrowCells.allInnerTexts();
    console.log(scndrowTexts);

    //printing 2nd row data
    for (let text of scndrowTexts) {
        console.log(text);
    }


    //read all data from table including headers
    const allRows: Locator[] = await rows.all();
    for (let row of allRows.slice(1)) {
        const rowData = await row.locator("td").allInnerTexts();
        console.log(rowData.join("\t"));
    }


    //print book names where auther is mukesh
    const mukeshBooks: string[] = [];
    for (let row of allRows.slice(1)) {
        const column: string[] = await row.locator("td").allInnerTexts();
        const bookName = column[0];
        const autherName = column[1];
        if (autherName == "Mukesh") {
            console.log(`${autherName} \t ${bookName}`);
            mukeshBooks.push(bookName);
        }
    }
    expect(mukeshBooks).toHaveLength(2);



    //caluculate total price of all books
    let totalPrice: number = 0;
    for (let row of allRows.slice(1)) {
        const column: string[] = await row.locator("td").allInnerTexts();
        const price=column[3];
        totalPrice+=parseInt(price);
    }
    console.log(totalPrice);
    expect(totalPrice).toBe(7100);

})

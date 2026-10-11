import { test, expect } from '@playwright/test';
import * as fs from 'node:fs'; //to read file
import path from 'node:path';
import {parse} from 'csv-parse/sync';


//array of test data
const searchItems: string[] = ['laptop', 'gift card', 'smartphone'];
test.describe('single array', () => {
    for (let items of searchItems) {
        test(`array of data ${items}`, async ({ page }) => {
            await page.goto('https://demowebshop.tricentis.com/');
            const searchInput = page.locator("#small-searchterms");
            await searchInput.fill(items);
            await page.locator("input[class*='search-box-button']").click();
            await expect.soft(page).toHaveURL(`https://demowebshop.tricentis.com/search?q=${encodeURIComponent(items)}`);
        });
    }
});

//multi dimensional array of login data
const loginTestData: string[][] = [["laura.taylor1234@example.com", "test123", "valid"],
["invaliduser@example.com", "test321", "invalid"],
["validuser@example.com", "testxyz", "invalid"],
["", "", "invalid"],
];

test.describe('multi dimensional array', () => {
    for (let [email, password, validity] of loginTestData) {
        test(`array of data ${email}`, async ({ page }) => {
            await page.goto('https://demowebshop.tricentis.com/login');
            await page.locator("#Email").fill(email);
            await page.locator("#Password").fill(password);
            await page.locator("input[value='Log in']").click();
            if(validity.toLowerCase()==="valid"){
                //assert log out link is avaliable - indicates successfull login
                const logoutLink = page.locator("a[href='/logout']");
                expect(logoutLink).toBeVisible({timeout:5000});
            }
            else{
                //assert error message is visible
                const errMsg=page.locator(".validation-summary-errors");
                console.log(await errMsg.innerText());
                expect(errMsg).toBeVisible({timeout:5000});
                // assert still in login page
                expect(page).toHaveURL('https://demowebshop.tricentis.com/login');
            }
        }
        )
    }
});


//reading data from json
const jsonPath = path.resolve('tests', 'files', 'logindata.json');
const loginData:any=JSON.parse(fs.readFileSync(jsonPath,'utf-8'));

test.describe('read json data', () => {
    for (let [email, password, expectedResult] of loginData) {
        test(`array of data ${email}`, async ({ page }) => {
            await page.goto('https://demowebshop.tricentis.com/login');
            await page.locator("#Email").fill(email);
            await page.locator("#Password").fill(password);
            await page.locator("input[value='Log in']").click();
            if(expectedResult.toLowerCase()==="valid"){
                //assert log out link is avaliable - indicates successfull login
                const logoutLink = page.locator("a[href='/logout']");
                expect(logoutLink).toBeVisible({timeout:5000});
            }
            else{
                //assert error message is visible
                const errMsg=page.locator(".validation-summary-errors");
                console.log(await errMsg.innerText());
                expect(errMsg).toBeVisible({timeout:5000});
                // assert still in login page
                expect(page).toHaveURL('https://demowebshop.tricentis.com/login');
            }
        }
        )
    }
});

//read data from csv
/*
const csvPath = 'path';
const fileContent=fs.readFileSync(csvPath,'utf-8');
const records = parse(fileContent,{columns:true,skip_empty_lines:true})

test.describe('read json data', () => {
    for (const data of records) {
        test(`array of data ${email}`, async ({ page }) => {
            await page.goto('https://demowebshop.tricentis.com/login');
            await page.locator("#Email").fill(data.email);
            await page.locator("#Password").fill(data.password);
            await page.locator("input[value='Log in']").click();
            if(data.expectedResult.toLowerCase()==="valid"){
                //assert log out link is avaliable - indicates successfull login
                const logoutLink = page.locator("a[href='/logout']");
                expect(logoutLink).toBeVisible({timeout:5000});
            }
            else{
                //assert error message is visible
                const errMsg=page.locator(".validation-summary-errors");
                console.log(await errMsg.innerText());
                expect(errMsg).toBeVisible({timeout:5000});
                // assert still in login page
                expect(page).toHaveURL('https://demowebshop.tricentis.com/login');
            }
        }
        )
    }
});
*/


// read data from excel
/*
import * as xlsx from 'xlsx';
//reading excel
//file->workbook->sheets(rows & columns)
const excelPath = "path";
const workbook = xlsx.readFile(excelPath);
const sheetNames = workbook.sheetNames[0];
const worksheet = workbook.sheets[sheetNames];
const logindata = xlsx.utils.sheet_to_json(worksheet);

test.describe('read json data', () => {
    for (let [email, password, expectedResult] of loginData) {
        test(`array of data ${email}`, async ({ page }) => {
            await page.goto('https://demowebshop.tricentis.com/login');
            await page.locator("#Email").fill(email);
            await page.locator("#Password").fill(password);
            await page.locator("input[value='Log in']").click();
            if(expectedResult.toLowerCase()==="valid"){
                //assert log out link is avaliable - indicates successfull login
                const logoutLink = page.locator("a[href='/logout']");
                expect(logoutLink).toBeVisible({timeout:5000});
            }
            else{
                //assert error message is visible
                const errMsg=page.locator(".validation-summary-errors");
                console.log(await errMsg.innerText());
                expect(errMsg).toBeVisible({timeout:5000});
                // assert still in login page
                expect(page).toHaveURL('https://demowebshop.tricentis.com/login');
            }
        }
        )
    }
});

*/

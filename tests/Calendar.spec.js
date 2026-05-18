const {test,expect} = require("@playwright/test");


test("Calendar validations", async ({page})=>
{
    const monthNumber = "6";
    const date = "15";
    const year = "2027";
    const expectedList = [monthNumber, date, year];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__tile").nth(monthNumber-1).click();
    await page.locator("//abbr[text()='"+date+"']").click();
    //  await page.locator("//abbr[text()='"+date+"']").click();
   //small change in a new branch
    const inputs =  page.locator('.react-date-picker__inputGroup__input');

    // erst warten, bis die Werte wirklich gesetzt sind
    await expect(inputs.nth(0)).toHaveValue(monthNumber);
    await expect(inputs.nth(1)).toHaveValue(date);
    await expect(inputs.nth(2)).toHaveValue(year);
    for(let i=0; i<expectedList.length; i++)
    {
        const value = await inputs.nth(i).inputValue();
        expect(value).toEqual(expectedList[i]);

    }


})
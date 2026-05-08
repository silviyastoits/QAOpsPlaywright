const {test, expect} = require('@playwright/test');

test.describe.configure({mode:'serial'});
test("Popup validation", async({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    
    //back and forward 
    // await page.goto("http://google.com");
    // await page.goBack();
    // await page.goForward();

     await expect(page.locator('#displayed-text')).toBeVisible();
     await page.locator('#hide-textbox').click();
     await expect(page.locator('#displayed-text')).toBeHidden();

     //handle java popup dialog
     //listen for an event to occur
     page.on('dialog', dialog => dialog.accept());
     await page.locator('#confirmbtn').click();

     //how to hover 
     await page.locator('#mousehover').hover();

     //IFRAME: attached webpages - child frames //tagname = iframe
     const framesPage = page.frameLocator('#courses-iframe');
     //select only the element which is visible (there are 2 elements located - one of them is hidden)
     await framesPage.locator("li a[href*='lifetime-access']:visible").click();
     const textCheck = await framesPage.locator(".text h2").textContent();
     console.log(textCheck.split(" ")[1]);
})
test("Screenshot and Visual comparison", async({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
     await expect(page.locator('#displayed-text')).toBeVisible();
     //take screenshot on locator level
     await page.locator('#displayed-text').screenshot({path: 'partialScreenshot.png'});
     await page.locator('#hide-textbox').click();
     //take screenshot on page level
     await page.screenshot({path: 'screenshot.png'});
     await expect(page.locator('#displayed-text')).toBeHidden();

});
test("visual", async({page}) =>
{
    await page.goto("https://www.google.com/");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');

})

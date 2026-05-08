// Import the Before function
const playwright = require('@playwright/test');
const { Before, After, AfterStep, Status} = require('@cucumber/cucumber')
const { POManager } = require('../../pageobjects/POManager');

Before( async function () {
    const browser = await playwright.chromium.launch({headless: false}); //cucumber launches the browser
    const context = await browser.newContext(); //fresh browser instance is open / await until this is done
    this.page = await context.newPage();
    this.poManager = new POManager(this.page); 
})

After(async function (scenario) {
    console.log("I am the last to execute");
})
AfterStep(async function({result}) {
    if(result.status ===Status.FAILED)
    {
        await this.page.screenshot({path: 'screenshot1.png'});
    }

})
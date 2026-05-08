//Login UI -> store in .json
//test, browser  -> inject the .json to open the browser with these settings
// cart-, order, orderdetails...other tests in this browser

const {test, expect} = require('@playwright/test');
let webContext;
test.beforeAll(async ({browser}) => 
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto ("https://rahulshettyacademy.com/client");
    const userPassword =  page.locator('#userPassword');
    const userEmail =  page.locator('#userEmail');
    await userEmail.fill("silviyastoitseva@gmail.com");
    await userPassword.fill("Iamking@00");
    await page.locator("[value = 'Login']").click();
    //    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();

    await context.storageState({path:'state.json'});
    webContext = await browser.newContext({storageState: 'state.json'})
})



test('Page ClientApp LogIn', async ()=>
{
    //chrome instance crate
    //chrome-plugins/cookies
    const page = await webContext.newPage();
    await page.goto ("https://rahulshettyacademy.com/client");
    await page.waitForLoadState('networkidle');

   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles);
})
test('ClientApp Buy And Checkout E2E', async ()=>
{
    const email = "silviyastoitseva@gmail.com";
    const productName = "ZARA COAT 3"
    const page = await webContext.newPage();
    await page.goto ("https://rahulshettyacademy.com/client");
    await page.waitForLoadState('networkidle');
    const products = page.locator(".card-body")
    
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    //Zara Coat 3
    //iterate through all products and find the coat
    const count = await products.count();
    console.log(count);

    for(let i=0; i < count; ++i)
    {
        if(await products.nth(i).locator("b").textContent() === productName){
            //add product to card
            await products.nth(i).locator("text = Add To Cart").click();    
            break;
        }   
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool =  await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    //assert there is an item in the cart
    expect(bool).toBeTruthy();

    //go to checkout
    await page.locator("text=Checkout").click();
    //insert Country
    await page.getByPlaceholder("Select Country").pressSequentially("swi", { delay: 150 });
    await page.getByRole("button", {name: " Switzerland"}).click();


    //assert the email address which is set
    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    //submit order
    await page.locator(".action__submit").click();
    //assert order has been successfull sent
    await expect(page.locator(".hero-primary").first()).toHaveText(" Thankyou for the order. ");
    
    //get orderId
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
    //orderId need to be formatted so only the id can be used
    const cleanOrderId = orderId.replace(/\|/g, '').trim();
    console.log(cleanOrderId);


    //check orders tab - selct your order and click on view button to view your order
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody tr").last().waitFor();
    const rowsCount = await page.locator('tbody tr').filter({ hasText: 'View' }).count();
    console.log(rowsCount);
    

    for (let i = 1; i <= rowsCount; i++) {
        const row =  page.locator('tr').nth(i);
        const field =  row.locator('th').first();
        const text =  (await field.textContent())?.trim();

        console.log(`row ${i}: ${text}`);

    if (text === cleanOrderId) {
        console.log("Match found!");
        // await row.getByRole('button', { name: 'View' }).click();
        await row.locator('button').first().click();
        break;
    }
}
    // await expect(page.locator('.col-text.-main')).toHaveText(cleanOrderId);
    const orderIdDetails = await page.locator('.col-text').textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
    // await page.pause();
});


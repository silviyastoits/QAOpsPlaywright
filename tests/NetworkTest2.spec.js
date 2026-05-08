const {test, expect} = require('@playwright/test');


test('@Security test request intercept', async({page}) =>
{
    //login and reach orders page
   await page.goto ("https://rahulshettyacademy.com/client");
   const userPassword =  page.locator('#userPassword');
   const userEmail =  page.locator('#userEmail');
   await userEmail.fill("silviyastoitseva@gmail.com");
   await userPassword.fill("Iamking@00");
   await page.locator("[value = 'Login']").click();
   await page.locator(".card-body b").first().waitFor();
   await page.locator("button[routerlink*='myorders']").click();


    //be aware of this pattern: the id is * -> any id could be viewed
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        //sends route's request to the network with optional overrides. Here overrides the id with another invalid one 
        //intercepts the request call
        route=>route.continue({url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=69f1e11ff86ba51a65923932'})
    )
    //it doesnt matter which one is clicked, but only one should be clicked
    await page.locator("button:has-text('View')").first().click();
    // validation
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order")
   
})
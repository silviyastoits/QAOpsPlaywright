const {test, expect} = require('@playwright/test');

// test('Page ClientApp Registration', async ({page})=>
// {
//    await page.goto ("https://rahulshettyacademy.com/client");
//    const userPassword =  page.locator('#userPassword');
//    const userEmail =  page.locator('#userEmail');

//    const firstName =  page.locator('#firstName');
//    const lastName =  page.locator('#lastName');
//    const userMobile =  page.locator('#userMobile');
//    const occupation = page.locator('select[formcontrolname="occupation"]');
//    const genderFemale = page.locator('input[formcontrolname="gender"][value="Female"]');
//    const confirmPassword =  page.locator('#confirmPassword');
//    const required18 = page.locator('input[formcontrolname="required"]');
//    const registerBtn =  page.locator('#login');

//    await page.getByText('Register here', { exact: true }).click();
//    await firstName.fill('Silviya');
//    await lastName.fill("Stoitseva");
//    await userEmail.fill("silviyastoitseva@gmail.com");
//    await userMobile.fill("1179123456");
//    await occupation.selectOption({ label: 'Engineer' });

//    await genderFemale.check();
//    await userPassword.fill("Iamking@00");
//    await confirmPassword.fill("Iamking@00");
//    await required18.check();
//    await registerBtn.click();
//    await page.pause();

// });

test('Page ClientApp LogIn', async ({page})=>
{
    //chrome instance crate
    //chrome-plugins/cookies
   await page.goto ("https://rahulshettyacademy.com/client");

   const userPassword =  page.locator('#userPassword');
   const userEmail =  page.locator('#userEmail');

   await userEmail.fill("silviyastoitseva@gmail.com");
   await userPassword.fill("Iamking!00");
   await page.locator("[value = 'Login']").click();

   await page.waitForLoadState('networkidle');
//    await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles);
});
test('ClientApp Buy And Checkout E2E', async ({page})=>
{
    const email = "silviyastoitseva@gmail.com";
    const productName = "ZARA COAT 3"
    const products = page.locator(".card-body")
    await page.goto ("https://rahulshettyacademy.com/client");
    const userPassword =  page.locator('#userPassword');
    const userEmail =  page.locator('#userEmail');
    const logInBtn = page.locator("[value = 'Login']");

    await userEmail.fill(email);
    await userPassword.fill("Iamking!00");
    await logInBtn.click();

    //wait for page to load
    await page.waitForLoadState('networkidle');
    // await page.locator(".card-body b").first().waitFor();
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


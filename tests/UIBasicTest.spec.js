const {test, expect} = require('@playwright/test');



test('Browser Context Playwright test', async ({browser})=>
{
    const context = await browser.newContext(); //fresh browser instance is open / await until this is done
    const page = await context.newPage(); // new page, on which automation is 
    //blocks css
   //  page.route("**/*.css", route=>route.abort());
   //   page.route("**/*.{jpg,png, jepeg}", route=>route.abort()); 
    const userName = page.locator("#username");
    const passWord = page.locator("#password");
    const signIn = page.locator("#signInBtn");
    const cardTitles = await page.locator(".card-body a");
    //listen to any request call which occurs 
    page.on('request', request=>console.log(request.url()));
    //listen to the responce of any request call
    page.on('response', response=>console.log(response.url(), response.status()))
    await page.goto ("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await  page.title());
    //css
    await userName.fill("rahulshetty"); //academy
    await passWord.fill("Learning@830$3mK2");//Learning@830$3mK2
    await signIn.click();

    //wait untill this locator is shown up on page
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    await userName.clear();
    await userName.fill("rahulshettyacademy");
    await signIn.click();
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles); 
});
test('UI Controls', async ({page})=>
{
    
   await page.goto ("https://rahulshettyacademy.com/loginpagePractise/");
   const userName = page.locator("#username");
   const signIn = page.locator("#signInBtn");
   const passWord = page.locator("#password");
   const dropdown = page.locator("select.form-control");
   const okButton = page.locator('#okayBtn');
   const documentLink = page.locator("[href*='documents-request']");


   await userName.clear();
   await userName.fill("rahulshettyacademy");
   await passWord.fill("Learning@830$3mK2");//Learning@830$3mK2
   
   
   await dropdown.selectOption("consult");
   await page.locator('#usertype').last().click();
   await expect(okButton).toBeVisible();
   await okButton.click();
   await page.locator("#terms").click();
   //assertion
   await expect(page.locator('#terms').last()).toBeChecked();
   console.log(page.locator('#usertype').last().isChecked());
   
   await page.locator('#terms').uncheck();
   expect(await page.locator('#terms').isChecked()).toBeFalsy();  //toBeFalsy();  it should be
   

   //assertion
   await expect(page.locator('#usertype').last()).toBeChecked();
   await expect(documentLink).toHaveAttribute("class", "blinkingText");
   

   await page.pause();

   
});
test('@Child Windows handle', async ({browser})=>
{
   const context = await browser.newContext(); //fresh browser instance is open / await until this is done
   const page = await context.newPage(); // new page wariable, on which automation is    
   await page.goto ("https://rahulshettyacademy.com/loginpagePractise/");
   const documentLink = page.locator("[href*='documents-request']");

   const [newPage]= await Promise.all(
   [
        context.waitForEvent('page'), //listen for any new page anytime, in status pending, rejected, fulfilled
        documentLink.click(),
   ])
   const text = await newPage.locator(".red").textContent();
   const arrayText =  text.split("@");
   const domain =  arrayText[1].split(" ")[0];
//    console.log(domain);

   //flip to the first page
   await page.locator('#username').fill(domain);
//    await page.pause();
   console.log(await page.locator('#username').inputValue());
   

});
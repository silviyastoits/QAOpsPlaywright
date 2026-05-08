const {test} = require('@playwright/test');

test('Playwright Special Locators', async ({page})=>
{
   await page.goto ("https://rahulshettyacademy.com/angularpractice/");
   await page.getByLabel('Check me out if you Love IceCreams!').click();
   await page.getByLabel('Employed').check();
   await page.getByLabel('Gender').selectOption("Female");
   await page.getByPlaceholder("Password").fill("abc123");
   await page.getByRole("button", {name: 'Submit'}).click();
   await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
   await page.getByRole("link", {name: 'Shop'}).click();
   await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();

   // await page.pause();


   
});

test('test by codegen', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/angularpractice/');
  await page.getByRole('link', { name: 'Shop' }).click();
  await page.locator('app-card').filter({ hasText: 'iphone X $24.99 Lorem ipsum' }).getByRole('button').click();
  await page.locator('app-card').filter({ hasText: 'Samsung Note 8 $24.99 Lorem' }).getByRole('button').click();
  await page.getByText('Checkout ( 2 ) (current)').click();
  await page.getByRole('row', { name: 'iphone X by Sim cart Status:' }).locator('#exampleInputEmail1').click();
  await page.getByRole('row', { name: 'iphone X by Sim cart Status:' }).locator('#exampleInputEmail1').click();
  await page.getByRole('row', { name: 'iphone X by Sim cart Status:' }).locator('#exampleInputEmail1').click();
  await page.getByRole('row', { name: 'iphone X by Sim cart Status:' }).locator('#exampleInputEmail1').click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByRole('textbox', { name: 'Please choose your delivery' }).click();
  await page.getByRole('textbox', { name: 'Please choose your delivery' }).fill('swi');
  await page.getByText('Switzerland').click();
  await page.locator('div').filter({ hasText: 'I agree with the term &' }).nth(2).click();
  await page.getByRole('button', { name: 'Purchase' }).click();
  await expect(page.getByText('Success!')).toBeVisible();
  await expect(page.getByText('× Success! Thank you! Your')).toBeVisible();
});
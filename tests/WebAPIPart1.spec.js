const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');
const loginPayLoad = {userEmail:"silviyastoitseva@gmail.com",userPassword:"Iamking!00"};
const orderPayLoad = {orders:[{country:"Switzerland",productOrderedId:"6960eac0c941646b7a8b3e68"}]};

 
let response;
test.beforeAll( async()=>
{
   const apiContext = await request.newContext();
   const apiUtils = new APIUtils(apiContext,loginPayLoad);
   response =  await apiUtils.createOrder(orderPayLoad);
 
})
 
 
//create order is success
test('@API Place the order', async ({ page }) => {
  expect(response.token).toBeTruthy();

  await page.goto('https://rahulshettyacademy.com/client');

  await page.evaluate(token => {
    window.localStorage.setItem('token', token);
  }, response.token);

  await page.reload();

  const myOrdersButton = page.locator("button[routerlink*='myorders']");
  await expect(myOrdersButton).toBeVisible();

  await myOrdersButton.click();

  await expect(page.locator('tbody')).toBeVisible();

  const rows = page.locator('tbody tr');

  for (let i = 0; i < await rows.count(); ++i) {
    const rowOrderId = await rows.nth(i).locator('th').textContent();

    if (response.orderId.includes(rowOrderId?.trim())) {
      await rows.nth(i).locator('button').first().click();
      break;
    }
  }

  const orderIdDetails = await page.locator('.col-text').textContent();
  expect(response.orderId).toContain(orderIdDetails?.trim());
});
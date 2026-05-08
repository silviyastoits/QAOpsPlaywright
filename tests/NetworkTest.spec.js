const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');
const loginPayLoad = {userEmail:"silviyastoitseva@gmail.com",userPassword:"Iamking!00"};
const orderPayLoad = {orders:[{country:"Switzerland",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
const fakePayLoadOrders = { data: [], message: "No Orders" };

 
let response;
test.beforeAll( async()=>
{
   const apiContext = await request.newContext();
   const apiUtils = new APIUtils(apiContext,loginPayLoad);
   response =  await apiUtils.createOrder(orderPayLoad);
 
})
 
 
//create order is success
test('@API Place the order', async ({ page }) => {

  // ✅ Route IMMER vor goto() registrieren, damit der Request sicher abgefangen wird
  await page.route(
    "**/api/ecom/order/get-orders-for-customer/*",
    async route => {

      // ❌ NICHT die echte API aufrufen (führt zu "socket hang up")
      // const response = await page.request.fetch(route.request());

      // ✅ Stattdessen direkt eine Fake-Response zurückgeben
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(fakePayLoadOrders), // unsere Mock-Daten
      });
    }
  );

  // ✅ Token vor dem Laden der Seite in localStorage setzen (Login umgehen)
  await page.addInitScript(token => {
    window.localStorage.setItem('token', token);
  }, response.token);

  // Seite laden
  await page.goto("https://rahulshettyacademy.com/client");

  // ✅ waitForResponse UND click gleichzeitig starten (Race Condition vermeiden)
  await Promise.all([
    page.waitForResponse(resp =>
      resp.url().includes("/api/ecom/order/get-orders-for-customer/") &&
      resp.status() === 200
    ),
    page.locator("button[routerlink*='myorders']").click()
  ]);

  // ✅ Erwartung prüfen: UI zeigt "No Orders"
  await expect(page.locator("text=No Orders")).toBeVisible();

});


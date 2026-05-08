const { test, expect } = require('@playwright/test');
const{ customtest } = require('../utils/test-base');
const { POManager } = require('../pageobjects/POManager');
//JSON->convert first in String -> js object
const dataset = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));

for(const data of dataset)
{
   test(` @Web ClientApp Buy And Checkout E2E for ${data.productName}`, async ({page})=>
   {
      const poManager = new POManager(page); 
      const loginPage = poManager.getLoginPage();
      await loginPage.goTo(); 
      await loginPage.validLogin(data.username,data.password);

      const dashboardPage = poManager.getDashboardPage();
      await dashboardPage.searchProductAddCart(data.productName);
      await dashboardPage.navigateToCart();

      const cartPage = poManager.getCartPage();
      await cartPage.verifyCartPageIsOpen(data.productName);
      await cartPage.checkOut();

      const ordersReviewPage = poManager.getOrdersReviewPage();
      await ordersReviewPage.searchCountryAndSelect("swi"," Switzerland")
      //assert the email address which is set
      await ordersReviewPage.validateEmail(data.username);
      //submit order //assert order has been successfull sent
      const orderId = await ordersReviewPage.submitAndGetOrderId();
      console.log(orderId);
      
      await dashboardPage.navigateToOrders();
      const ordersHistoryPage = poManager.getOrdersHistoryPage();
      await ordersHistoryPage.searchOrderAndSelect(orderId);
      expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
   });
}
customtest(`ClientApp login`, async ({page, testDataForOrder})=>
   {
      const poManager = new POManager(page); 
      const loginPage = poManager.getLoginPage();
      await loginPage.goTo(); 
      await loginPage.validLogin(testDataForOrder.username,testDataForOrder.password);

      const dashboardPage = poManager.getDashboardPage();
      await dashboardPage.searchProductAddCart(testDataForOrder.productName);
      await dashboardPage.navigateToCart();

      const cartPage = poManager.getCartPage();
      await cartPage.verifyCartPageIsOpen(testDataForOrder.productName);
      await cartPage.checkOut();
   })
const{Given,When,Then} = require('@cucumber/cucumber');
const { POManager } = require('../../pageobjects/POManager');
const { expect } = require('@playwright/test');
const playwright = require('@playwright/test');

Given('a login to Ecommerce applicateion with {string} and {string}', {timeout: 100*1000}, async   function(username,password){
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo(); 
    await loginPage.validLogin(username,password);
});
When('Add {string} to Cart', async function(productName){
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddCart(productName);
    await this.dashboardPage.navigateToCart();
});
Then('Verify {string} is displayed in the Cart', async function(productName){
    cartPage = this.poManager.getCartPage();
    await cartPage.verifyCartPageIsOpen(productName);
    await cartPage.checkOut();
})
When('Enter valid details and Place the Order', async function(){
    const ordersReviewPage = this.poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("swi"," Switzerland")
    //submit order //assert order has been successfull sent` 
    this.orderId = await ordersReviewPage.submitAndGetOrderId();
    console.log(this.orderId);
});
Then('Verify order is present in the OrderHistory', async function(){
    await this.dashboardPage.navigateToOrders();
    const ordersHistoryPage =  this.poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(this.orderId);
    expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});
Given('a login to Ecommerce2 applicateion with {string} and {string}', {timeout: 100*1000}, async function (username, password) {
    const userName = this.page.locator("#username");
    const passWord = this.page.locator("#password");
    const signIn = this.page.locator("#signInBtn");
    await this.page.goto ("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await  this.page.title());
    //css
    await userName.fill(username); //academy
    await passWord.fill(password);//Learning@830$3mK2
    await signIn.click();
});
Then('Verify Error message is displayed', {timeout: 100*1000}, async function () {

    //wait untill this locator is shown up on page
    console.log(await this.page.locator("[style*='block']").textContent());
    await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');
});

 



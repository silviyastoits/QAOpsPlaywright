const { expect } = require('@playwright/test');

class OrdersReviewPage {
  constructor(page) {
    this.page = page;
    this.country = page.locator("[placeholder*='Country']");
    this.dropdown = page.locator(".ta-results");
    this.emailId = page.locator(".user__name [type='text']").first();
    this.submit = page.locator(".action__submit");
    this.orderConfirmationText = page.locator(".hero-primary");
    this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
  }

  async searchCountryAndSelect(countryCode, countryName) {
  await this.country.pressSequentially(countryCode,  { delay: 150 });
  await this.dropdown.waitFor();

  const options = await this.dropdown.locator("button").allTextContents();
  console.log(options);

  await this.dropdown.locator("button").filter({ hasText: countryName }).first().click();
}

  async validateEmail(username) {
    await expect(this.emailId).toHaveText(username);
  }

  async submitAndGetOrderId() {
    await this.submit.click();
    await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ");

    const orderIdText = await this.orderId.textContent();
    return orderIdText;
  }
}

module.exports = { OrdersReviewPage };
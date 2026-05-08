const { expect } = require('@playwright/test');


class CartPage
{
    constructor(page)
    {
        this.page = page;
        this.checkout = page.locator("text=Checkout");
        this.cartProducts = page.locator("div li").first();  
    }
    async verifyCartPageIsOpen(productName)
    {
        await this.cartProducts.waitFor();
        await expect(this.getProductLocator(productName)).toBeVisible();
    }
    async checkOut()
    {
        await this.checkout.click();
    }
    getProductLocator(productName)
    {
        return this.page.locator(`h3:has-text("${productName}")`);
    }
}
module.exports = { CartPage };
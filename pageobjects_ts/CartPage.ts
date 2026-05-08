import { expect, Locator, Page} from '@playwright/test';


export class CartPage
{
    page: Page;
    checkout: Locator;
    cartProducts: Locator;
    
    constructor(page)
    {
        this.page = page;
        this.checkout = page.locator("text=Checkout");
        this.cartProducts = page.locator("div li").first();  
    }
    async verifyCartPageIsOpen(productName: string)
    {
        await this.cartProducts.waitFor();
        await expect(this.getProductLocator(productName)).toBeVisible();
    }
    async checkOut()
    {
        await this.checkout.click();
    }
    getProductLocator(productName:string)
    {
        return this.page.locator(`h3:has-text("${productName}")`);
    }
}
module.exports = { CartPage };
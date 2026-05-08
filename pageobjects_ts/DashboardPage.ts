import { Locator, Page } from "@playwright/test";

export class DashboardPage
{
    page : Page;
    products : Locator;
    productsTexts : Locator;
    cart : Locator;
    orders : Locator;

    constructor(page:Page)
    {
        this.page = page;
        this.products =  page.locator(".card-body");
        this.productsTexts =  page.locator(".card-body b")
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']");
    }
    async searchProductAddCart(productName : string)
    {
        const titles = this.productsTexts.allTextContents();
        
        
        //Zara Coat 3
        //iterate through all products and find the coat
        let count : number;
        count = await this.products.count();
        console.log(count);
        let i: number;
        for(i=0; i < count; ++i)
        {
            let title:any;
            title = await this.products.nth(i).locator("b").textContent();
            if(title?.trim() === productName){
                //add product to card
                await this.products.nth(i).locator("text = Add To Cart").click();    
                break;
            }
        }  
        console.log(titles); 
    }
          
    async navigateToCart()
    {
        await this.cart.click();
        await this.page.waitForLoadState('networkidle');
        
    }
    async navigateToOrders()
    {
        await this.orders.click();
        await this.page.waitForLoadState('networkidle');
        
    }
    
}
module.exports = { DashboardPage };
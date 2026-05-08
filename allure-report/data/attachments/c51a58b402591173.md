# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ClientAppPO.spec.js >>  @Web ClientApp Buy And Checkout E2E for ADIDAS ORIGINAL
- Location: tests/ClientAppPO.spec.js:9:4

# Error details

```
Error: locator.click: Test ended.
Call log:
  - waiting for locator('[routerlink*=\'cart\']')

```

# Test source

```ts
  1  | class DashboardPage
  2  | {
  3  |     constructor(page)
  4  |     {
  5  |         this.page = page;
  6  |         this.products =  page.locator(".card-body");
  7  |         this.productsTexts =  page.locator(".card-body b")
  8  |         this.cart = page.locator("[routerlink*='cart']");
  9  |         this.orders = page.locator("button[routerlink*='myorders']");
  10 |     }
  11 |     async searchProductAddCart(productName)
  12 |     {
  13 |         const titles = this.productsTexts.allTextContents();
  14 |         
  15 |         
  16 |         //Zara Coat 3
  17 |         //iterate through all products and find the coat
  18 |         const count = await this.products.count();
  19 |         console.log(count);
  20 | 
  21 |         for(let i=0; i < count; ++i)
  22 |         {
  23 |             const title = await this.products.nth(i).locator("b").textContent();
  24 |             if(title?.trim() === productName){
  25 |                 //add product to card
  26 |                 await this.products.nth(i).locator("text = Add To Cart").click();    
  27 |                 break;
  28 |             }
  29 |         }  
  30 |         console.log(titles); 
  31 |     }
  32 |           
  33 |     async navigateToCart()
  34 |     {
> 35 |         await this.cart.click();
     |                         ^ Error: locator.click: Test ended.
  36 |         await this.page.waitForLoadState('networkidle');
  37 |         
  38 |     }
  39 |     async navigateToOrders()
  40 |     {
  41 |         await this.orders.click();
  42 |         await this.page.waitForLoadState('networkidle');
  43 |         
  44 |     }
  45 |     
  46 | }
  47 | module.exports = { DashboardPage };
```
import { Locator, Page } from "@playwright/test";
export class LoginPage{

    page : Page;
    signInButton : Locator;
    userPassword : Locator;
    unserName : Locator;

    constructor(page : Page)
    {
        this.page =  page;
        this.signInButton = page.locator("[value = 'Login']");
        this.userPassword =  page.locator('#userPassword');
        this.unserName =  page.locator('#userEmail');
    }
    async goTo()
    {
         await this.page.goto("https://rahulshettyacademy.com/client");
         
    }
    async validLogin(username: string, password: string){
        await this.unserName.fill(username);
        await this.userPassword.fill(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}
module.exports = {LoginPage};

class LoginPage{

    constructor(page)
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
    async validLogin(username, password){
        await this.unserName.fill(username);
        await this.userPassword.fill(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}
module.exports = {LoginPage};
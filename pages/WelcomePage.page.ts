import {Page,Locator} from "@playwright/test";

export class WelcomePage{
    UNameINP:Locator;
    UPassINP:Locator;
    LoginBTN:Locator;
    RegisterBTN:Locator;

    constructor(page:Page){
        this.UNameINP=page.locator('//input[@name="username"]');
        this.UPassINP=page.locator('//input[@name="password"]');
        this.LoginBTN=page.locator('//input[@class="button"]');
        this.RegisterBTN=page.getByRole("link",{name:"Register"});
    }


}
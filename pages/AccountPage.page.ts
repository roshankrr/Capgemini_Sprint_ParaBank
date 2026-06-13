import {Page,Locator} from "@playwright/test";

export class AccountPage{
    page:Page;
    AccountType:Locator;
    AccountNumber:Locator;
    CreateNewAccountBTN:Locator;
    

    constructor(page:Page){
        this.page=page;
        this.AccountType=page.locator('//select[@id="type"]');
        this.AccountNumber=page.locator('//select[@id="fromAccountId"]');
        this.CreateNewAccountBTN=page.getByRole("button",{name:"Open New Account"});
    }


}
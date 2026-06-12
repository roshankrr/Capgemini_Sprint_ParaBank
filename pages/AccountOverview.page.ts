import {Page,Locator} from "@playwright/test";

export class AccountOverviewPage{
    page:Page;
    FirstAccount:Locator;
    SecondAccount:Locator;
    
    

    constructor(page:Page,FirstAccountNumber:Locator,SecondAccountNumber:Locator){
        this.page=page;
        this.FirstAccount=page.locator('');
        this.SecondAccount=page.locator('');
    }



}
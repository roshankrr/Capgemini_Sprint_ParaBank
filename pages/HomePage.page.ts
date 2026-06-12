import {Page,Locator} from "@playwright/test";

export class HomePage{
    page:Page;
    AccountLink:Locator;

    constructor(page:Page){
        this.page=page;
        this.AccountLink=page.getByRole("link",{name:"Accounts Overview"});
    }
    
    async navigatToService(service:string):Promise<void>{
        this.AccountLink=this.page.getByRole("link",{name:service});
        await this.AccountLink.click();
    };

}
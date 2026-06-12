import {Locator, Page} from "@playwright/test";


export class TransferFundsPage{
    page:Page;
    FromAccount:Locator;
    ToAccount:Locator;
    AmountINP:Locator;
    TransferBTN:Locator;

    constructor(page:Page){
        this.page=page;
        this.FromAccount=page.locator('//select[@id="fromAccountId"]');
        this.ToAccount=page.locator('//select[@id="toAccountId"]');
        this.AmountINP=page.locator('//input[@id="amount"]');
        this.TransferBTN=page.getByRole("button",{name:"Transfer"});
    }

}   
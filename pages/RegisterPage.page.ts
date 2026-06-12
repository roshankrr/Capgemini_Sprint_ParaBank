import {Page,Locator} from "@playwright/test";

export class RegisterPage{
    FirstNameINP:Locator;
    LastNameINP:Locator
    AddressINP:Locator;
    CityINP:Locator;
    StateINP:Locator;
    ZipCodeINP:Locator;
    PhoneINP:Locator;
    SSNINP:Locator;
    UNameINP:Locator;
    PassINP:Locator;
    ConfirmPassINP:Locator;
    RegisterBTN:Locator;

    constructor(page:Page){
        this.FirstNameINP=page.locator('//input[@id="customer.firstName"]');
        this.LastNameINP=page.locator('//input[@id="customer.lastName"]');
        this.AddressINP=page.locator('//input[@id="customer.address.street"]');
        this.CityINP=page.locator('//input[@id="customer.address.city"]');
        this.StateINP=page.locator('//input[@id="customer.address.state"]');
        this.ZipCodeINP=page.locator('//input[@id="customer.address.zipCode"]');
        this.PhoneINP=page.locator('//input[@id="customer.phoneNumber"]');
        this.SSNINP=page.locator('//input[@id="customer.ssn"]');
        this.UNameINP=page.locator('//input[@id="customer.username"]');
        this.PassINP=page.locator('//input[@id="customer.password"]');
        this.ConfirmPassINP=page.locator('//input[@id="repeatedPassword"]');
        this.RegisterBTN=page.locator('//input[@value="Register"]');
    }

    async registerUser(userData:any):Promise<void>{
        await this.FirstNameINP.fill(userData.FirstName);
        await this.LastNameINP.fill(userData.LastName);
        await this.AddressINP.fill(userData.Address);
        await this.CityINP.fill(userData.City);
        await this.StateINP.fill(userData.State);
        await this.ZipCodeINP.fill(userData.ZipCode);
        await this.PhoneINP.fill(userData.Phone);
        await this.SSNINP.fill(userData.SSN);
        await this.UNameINP.fill(userData.Username);
        await this.PassINP.fill(userData.Password);
        await this.ConfirmPassINP.fill(userData.ConfirmPassword);
        await this.RegisterBTN.click();
    }


}
import {test as base,Page } from "@playwright/test";
import {WelcomePage} from "../pages/WelcomePage.page";
import{RegisterPage} from "../pages/RegisterPage.page";
import data from '../test_data/userData.json'


type REGESTER_FIXTURE={
    RegisterFixture:Page;
}


export const test=base.extend<REGESTER_FIXTURE>({
    RegisterFixture:async({page},use)=>{
    await page.goto('/');
    const welcomePage=new WelcomePage(page);
    await welcomePage.UNameINP.fill(data.Username);
    await welcomePage.UPassINP.fill(data.Password);
    await welcomePage.LoginBTN.click();
    if(await welcomePage.RegisterBTN.isVisible()){
        await welcomePage.RegisterBTN.click();
        const registerPage=new RegisterPage(page);
        await registerPage.registerUser(data);
    }
    await use(page);
    }
})




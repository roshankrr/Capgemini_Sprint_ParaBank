import {test,expect} from "@playwright/test";
import { WelcomePage } from "../../pages/WelcomePage.page";
import { RegisterPage } from "../../pages/RegisterPage.page";
import data from '../../test_data/FR1_Data.json';
import { SuccessMessage } from "../../utils/SuccessMessage";
import { HomePage } from "../../pages/HomePage.page";
import { AccountPage } from "../../pages/AccountPage.page";
//FR1 : User should be able to create an account successfully 

//Sceanario 1: User should be able to create an account with valid credentials
test.describe("TS-01:Register and login  User Successfully",()=>{
    test.only("TC-UI-01:Register User",async ({page})=>{
        await page.goto('/');
        let welcome= new WelcomePage(page);
        await welcome.RegisterBTN.click();
        let registerPage=new RegisterPage(page);
        await registerPage.registerUser(data.validUserData);
        await SuccessMessage("Your account was created successfully. You are now logged in.",page);
    })

    test.only("TC-UI-02:Login after Register",async ({page})=>{
        await page.goto('/');
        let welcome= new WelcomePage(page);
        await welcome.UNameINP.fill(data.validUserData.Username);
        await welcome.UPassINP.fill(data.validUserData.Password);
        await welcome.LoginBTN.click();
        let navigate =new HomePage(page);
        await navigate.navigatToService('Open New Account');
        let accountPage=new AccountPage(page);
        await accountPage.CreateNewAccountBTN.click();
        await expect(page.getByText('Account Opened')).toBeVisible();

    })
})

//Sceanario 2: User should not be able to create an account with invalid credentials
test.describe("TS-02:Register  User UnSuccessfully",()=>{
    test("TC-UI-03:Register User with blank data",async ({page})=>{
        await page.goto('/');
        let welcome= new WelcomePage(page);
        await welcome.RegisterBTN.click();
        let registerPage=new RegisterPage(page);
        await registerPage.RegisterBTN.click();
        await expect(await page.locator('//span[@class="error"]').count()).toBeGreaterThan(0);
    })

    test("TC-UI-04:Register User with invalid confirm password",async ({page})=>{
        await page.goto('/');
        let welcome= new WelcomePage(page);
        await welcome.RegisterBTN.click();
        let registerPage=new RegisterPage(page);
        await registerPage.registerUser(data.invalidUserData);

        await expect(page.getByText('Passwords did not match')).toBeVisible();
        
    })
})
import {test} from "@playwright/test";
import {WelcomePage} from "../../pages/WelcomePage.page";
import data from '../../test_data/userData.json';

test("Login with valid credentials",async({page})=>{
    await page.goto('/');
    const welcomePage=new WelcomePage(page);
    await welcomePage.UNameINP.fill(data.Username);
    await welcomePage.UPassINP.fill(data.Password);
    await welcomePage.LoginBTN.click();
    await page.screenshot({ path: `screenshots/Login-${Date.now()}.png` });
})
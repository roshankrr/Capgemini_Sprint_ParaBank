import { expect } from "@playwright/test";
import {test} from "../../fixture/RegisterFixture.fixture";
import { HomePage } from "../../pages/HomePage.page";
import { TransferFundsPage } from "../../pages/TransferFunds.page";
import { AccountPage } from "../../pages/AccountPage.page";
import { GetCustId } from "../../utils/getCustId";
import data from "../../test_data/userData.json";
import { GetAccounts } from "../../utils/getAccounts";
import { env } from "../../config/env";


test("End To End Test for Fund Transfer Functionallity using UI + API",async({RegisterFixture,request})=>{
    //opening new account to transfer funds
            let homePage=new HomePage(RegisterFixture);
            await homePage.navigatToService('Open New Account');
            let accountPage=new AccountPage(RegisterFixture);
            await accountPage.CreateNewAccountBTN.click();
            //opening one more new account to transfer funds
            await homePage.navigatToService('Open New Account');
            await accountPage.CreateNewAccountBTN.click();

            //get all accounts using GetAccount utility function
            let accountIDFn= new GetAccounts();
            let accounts=await accountIDFn.getAccounts(request);
            console.log("Accounts:",accounts);

            //navigate to transfer funds
            await homePage.navigatToService('Transfer Funds');
            
            let transferFundPage=await new TransferFundsPage(RegisterFixture);
            await transferFundPage.FromAccount.selectOption({index:0});
            await transferFundPage.ToAccount.selectOption({index:1});
            await transferFundPage.AmountINP.fill('100');
            await transferFundPage.TransferBTN.click();
            await expect(RegisterFixture.getByText('Transfer Complete!')).toBeVisible();

            //perform transaction using API and verify the transaction using API

            let responseData=await request.post(`${env.API_BASEURL}/transfer/?fromAccountId=${accounts[0].id}&toAccountId=${accounts[1].id}&amount=100`,{
                headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                }
            });
            console.log("Funds transfered successfully using API",responseData);
            expect(responseData.status()).toBe(200);
            await RegisterFixture.screenshot({ path: `screenshots/TC-E2E-FR7-${Date.now()}.png` });


})
import {test} from "../../fixture/RegisterFixture.fixture";
import {HomePage} from "../../pages/HomePage.page";
import {AccountPage} from "../../pages/AccountPage.page";
import { TransferFundsPage } from "../../pages/TransferFunds.page";
import {expect} from "@playwright/test";
import { SuccessMessage } from "../../utils/SuccessMessage";

test.use({
    launchOptions: {
        slowMo: 500
    }
})

test.describe("TS-08:Transfer Funds Using UI",()=>{
    test("TC-UI-08: Validate Funds transfer between accounts using UI",async({RegisterFixture})=>{
        //opening new account to transfer funds
        let homePage=new HomePage(RegisterFixture);
        await homePage.navigatToService('Open New Account');
        let accountPage=new AccountPage(RegisterFixture);
        await accountPage.CreateNewAccountBTN.click();
        //opening one more new account to transfer funds
        await homePage.navigatToService('Open New Account');
        await accountPage.CreateNewAccountBTN.click();
        //navigate to transfer funds
        await homePage.navigatToService('Transfer Funds');
        
        let transferFundPage=await new TransferFundsPage(RegisterFixture);
        await transferFundPage.FromAccount.selectOption({index:0});
        await transferFundPage.ToAccount.selectOption({index:1});
        await transferFundPage.AmountINP.fill('100');
        await transferFundPage.TransferBTN.click();
        await expect(RegisterFixture.getByText('Transfer Complete!')).toBeVisible();

        //check the balance of the first account
        await homePage.navigatToService('Find Transactions');
    })

    test.fixme("TC-UI-09: Validate Funds transfer with insufficient balance using UI",async({RegisterFixture})=>{
        //navigate to transfer funds
        let homePage=new HomePage(RegisterFixture);
        await homePage.navigatToService('Transfer Funds');
        
        let transferFundPage=await new TransferFundsPage(RegisterFixture);
        await transferFundPage.FromAccount.selectOption({index:0});
        await transferFundPage.ToAccount.selectOption({index:1});
        await transferFundPage.AmountINP.fill('1000000');
        await transferFundPage.TransferBTN.click();
        await expect.soft(RegisterFixture.getByText('Transfer Failed. You have insufficient funds.')).toBeVisible();
    })

})



test.describe("TS-09:Transfer Funds Using UI with negitive cases",()=>{
    test.fixme("TC-UI-10: Try transfering funds to different account with incorrect details",async({RegisterFixture})=>{
        //opening new account to transfer funds
        let homePage=new HomePage(RegisterFixture);
        await homePage.navigatToService('Open New Account');
        let accountPage=new AccountPage(RegisterFixture);
        await accountPage.CreateNewAccountBTN.click();
        //opening one more new account to transfer funds
        await homePage.navigatToService('Open New Account');
        await accountPage.CreateNewAccountBTN.click();
        //navigate to transfer funds
        await homePage.navigatToService('Transfer Funds');
        
        let transferFundPage=await new TransferFundsPage(RegisterFixture);
        await transferFundPage.FromAccount.selectOption({index:0});
        await transferFundPage.ToAccount.selectOption({index:1});
        await transferFundPage.AmountINP.fill(' ');
        await transferFundPage.TransferBTN.click();
        await expect.soft(RegisterFixture.getByText('Transfer Complete!')).toBeVisible();

        //check the balance of the first account
        await homePage.navigatToService('Find Transactions');
    })

    test.fixme("TC-UI-09: Validate Funds transfer with insufficient balance using UI",async({RegisterFixture})=>{
        //navigate to transfer funds
        let homePage=new HomePage(RegisterFixture);
        await homePage.navigatToService('Transfer Funds');
        
        let transferFundPage=await new TransferFundsPage(RegisterFixture);
        await transferFundPage.FromAccount.selectOption({index:0});
        await transferFundPage.ToAccount.selectOption({index:1});
        await transferFundPage.AmountINP.fill('-100');
        await transferFundPage.TransferBTN.click();
        await expect.soft(RegisterFixture.getByText('Transfer Failed. You have insufficient funds.')).toBeVisible();
    })

})



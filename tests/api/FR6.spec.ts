import {test} from "../../fixture/RegisterFixture.fixture";
import {expect} from "@playwright/test";
import data from "../../test_data/FR2_Data.json"
import { GetCustId } from "../../utils/getCustId";
import { GetAccounts } from "../../utils/getAccounts";
import {env} from "../../config/env";


test.describe("TS-10: Transfer Funds Using API",()=>{

    test("TC-API-10: Validate Funds transfer between accounts using API",async({request,RegisterFixture})=>{
        // Step 1: Get customer ID
        let custIDFn= new GetCustId();
        const custId=await custIDFn.getCustID(request,data.Username,data.Password);
        console.log("Customer ID:",custId);

        // Step 2: Get the default account (first account)
        let accountIDFn= new GetAccounts();
        let accounts=await accountIDFn.getAccounts(request);
        console.log("Accounts:",accounts);
        const fromAccountId=accounts[0].id;

        // Step 3: Create a new account to transfer funds to
        let createAccountResponse=await request.post(`${env.API_BASEURL}/createAccount?customerId=${custId}&newAccountType=1&fromAccountId=${fromAccountId}`,{
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
        });
        expect(createAccountResponse.status()).toBe(200);
        let newAccount=await createAccountResponse.json();
        const toAccountId=newAccount.id;
        console.log("New Account ID:",toAccountId);

        // Step 4: Transfer funds from default account to new account
        const transferAmount=100;
        let transferResponse=await request.post(`${env.API_BASEURL}/transfer?fromAccountId=${fromAccountId}&toAccountId=${toAccountId}&amount=${transferAmount}`,{
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
        });
        expect(transferResponse.status()).toBe(200);
        console.log("Transfer successful");

        // Step 5: Verify the transaction using /transactions/{transactionId}
        // Get transactions for the toAccount to find the transfer transaction
        let transactionsResponse=await request.get(`${env.API_BASEURL}/accounts/${toAccountId}/transactions`,{
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
        });
        expect(transactionsResponse.status()).toBe(200);
        let transactions=await transactionsResponse.json();
        console.log("Transactions:",transactions);
        expect(transactions.length).toBeGreaterThan(0);

        // Get the latest transaction and verify using transactionId
        const transactionId=transactions[transactions.length-1].id;
        let transactionDetailResponse=await request.get(`${env.API_BASEURL}/transactions/${transactionId}`,{
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
        });
        expect(transactionDetailResponse.status()).toBe(200);
        let transactionDetail=await transactionDetailResponse.json();
        console.log("Transaction Detail:",transactionDetail);
        expect(transactionDetail.amount).toBe(transferAmount);
        expect(transactionDetail.type).toBe("Credit");
        console.log("Transaction verified successfully using /transactions/{transactionId}");
    })


    test("TC-API-11: Validate Funds transfer reflects correct balance using API",async({request,RegisterFixture})=>{
        // Step 1: Get customer ID and accounts
        let custIDFn= new GetCustId();
        const custId=await custIDFn.getCustID(request,data.Username,data.Password);

        let accountIDFn= new GetAccounts();
        let accounts=await accountIDFn.getAccounts(request);
        const fromAccountId=accounts[0].id;

        // Step 2: Create a new account
        let createAccountResponse=await request.post(`${env.API_BASEURL}/createAccount?customerId=${custId}&newAccountType=1&fromAccountId=${fromAccountId}`,{
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
        });
        expect(createAccountResponse.status()).toBe(200);
        let newAccount=await createAccountResponse.json();
        const toAccountId=newAccount.id;

        // Step 3: Get balance of from account before transfer
        let fromAccountBefore=await request.get(`${env.API_BASEURL}/accounts/${fromAccountId}`,{
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
        });
        let fromAccountBeforeJson=await fromAccountBefore.json();
        const balanceBefore=fromAccountBeforeJson.balance;
        console.log("Balance before transfer:",balanceBefore);

        // Step 4: Transfer funds
        const transferAmount=50;
        let transferResponse=await request.post(`${env.API_BASEURL}/transfer?fromAccountId=${fromAccountId}&toAccountId=${toAccountId}&amount=${transferAmount}`,{
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
        });
        expect(transferResponse.status()).toBe(200);

        // Step 5: Get balance after transfer and verify deduction
        let fromAccountAfter=await request.get(`${env.API_BASEURL}/accounts/${fromAccountId}`,{
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
        });
        let fromAccountAfterJson=await fromAccountAfter.json();
        const balanceAfter=fromAccountAfterJson.balance;
        console.log("Balance after transfer:",balanceAfter);
        expect(balanceAfter).toBe(balanceBefore-transferAmount);
        console.log("Balance deduction verified successfully");
    })
})


test.describe("TS-11: Transfer Funds Using API Negative Scenarios",()=>{

    test.fixme("TC-API-12: Validate Funds transfer with invalid fromAccountId using API",async({request,RegisterFixture})=>{
        let custIDFn= new GetCustId();
        const custId=await custIDFn.getCustID(request,data.Username,data.Password);

        let accountIDFn= new GetAccounts();
        let accounts=await accountIDFn.getAccounts(request);
        const toAccountId=accounts[0].id;

        // Transfer with invalid fromAccountId
        let transferResponse=await request.post(`${env.API_BASEURL}/transfer?fromAccountId=999999&toAccountId=${toAccountId}&amount=100`,{
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
        });
        expect(transferResponse.status()).toBe(400);
        console.log("Transfer failed with invalid fromAccountId as expected");
    })

    test.fixme("TC-API-13: Validate Funds transfer with zero amount using API",async({request,RegisterFixture})=>{
        let custIDFn= new GetCustId();
        const custId=await custIDFn.getCustID(request,data.Username,data.Password);

        let accountIDFn= new GetAccounts();
        let accounts=await accountIDFn.getAccounts(request);
        const fromAccountId=accounts[0].id;

        // Create a new account
        let createAccountResponse=await request.post(`${env.API_BASEURL}/createAccount?customerId=${custId}&newAccountType=1&fromAccountId=${fromAccountId}`,{
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
        });
        let newAccount=await createAccountResponse.json();
        const toAccountId=newAccount.id;

        // Transfer with zero amount
        let transferResponse=await request.post(`${env.API_BASEURL}/transfer?fromAccountId=${fromAccountId}&toAccountId=${toAccountId}&amount=0`,{
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
        });
        expect.soft(transferResponse.status()).toBe(400);
        console.log("Transfer failed with zero amount as expected");
    })
})

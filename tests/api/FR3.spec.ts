import {test} from "../../fixture/RegisterFixture.fixture";
import {expect} from "@playwright/test";
import data from "../../test_data/FR2_Data.json"
import dataFR3 from "../../test_data/FR3_Data.json"
import { GetCustId } from "../../utils/getCustId";
import {env} from "../../config/env";
import { GetAccounts } from "../../utils/getAccounts";
//FR3: Validate new account exist using api


test.describe("TS-05: Validate New account creation using API", ()=>{

    let newAccountId:number;
    let custId:number;
    test("TC-API-05: Validate New account creation using API",async({request,RegisterFixture})=>{
        let custIDFn= new GetCustId();
        custId=await custIDFn.getCustID(request,data.Username,data.Password);

        let accountResponse=await request.get(`${env.API_BASEURL}/customers/${custId}/accounts`,{
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
        });
        let accountResponseJson=await accountResponse.json();
        console.log(accountResponseJson);
        let responseDataCreate = await request.post(`${env.API_BASEURL}/createAccount?customerId=${custId}&newAccountType=${dataFR3.accountType}&fromAccountId=${accountResponseJson[0].id}`,{
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
        });
        expect(responseDataCreate.status()).toBe(200);

    })


    test("TC-API-06: Validate Newly Created Account exist using API",async({request,RegisterFixture})=>{
        let custIDFn= new GetCustId();
        custId=await custIDFn.getCustID(request,data.Username,data.Password);
        //get accounts for the user and count current number of accounts
        let accountIDFn= new GetAccounts();
        let accountresponse=await accountIDFn.getAccounts(request);
        const accountCountBefore=accountresponse.length;

        //create new account
        let responseDataCreate = await request.post(`${env.API_BASEURL}/createAccount?customerId=${custId}&newAccountType=${dataFR3.accountType}&fromAccountId=${accountresponse[0].id}`,{
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
        });
        expect(responseDataCreate.status()).toBe(200);

        //get the count of accounts after creating previous one to chekc
        let accountresponseAfter=await accountIDFn.getAccounts(request);
        const accountCountAfter=accountresponseAfter.length;
        expect(accountCountAfter).toBeGreaterThanOrEqual(accountCountBefore+1);
        console.log("The newly account was created and verified successfully using API");

    })
}
)



test.describe("TS-06: Get Accounts using API Negative Sceanario", ()=>{

        test("TC-API-07: Validate New account creation with invalid accountid",async({request,RegisterFixture})=>{
            let custIDFn= new GetCustId();
        const custId=await custIDFn.getCustID(request,data.Username,data.Password);
        //create new account
        let responseDataCreate = await request.post(`${env.API_BASEURL}/createAccount?customerId=${custId}&newAccountType=${dataFR3.accountType}&fromAccountId=999999`,{
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
        });
        expect(responseDataCreate.status()).toBe(400);
        console.log("The account creation was failed with invalid fromAccountId as expected");
        })

    })
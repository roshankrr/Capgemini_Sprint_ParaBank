import {test} from "../../fixture/RegisterFixture.fixture";
import {GetAccounts} from "../../utils/getAccounts";
import {expect} from "@playwright/test";
import {env} from "../../config/env";

test.describe("TS-07:Validate Account Details",()=>{
    test("TC-API-08: Validate Account details using API",async({request,RegisterFixture})=>{
        let accountIDFn= new GetAccounts();
        let accountresponse=await accountIDFn.getAccounts(request);
        console.log(accountresponse);
        let responseData=await request.get(`${env.API_BASEURL}/accounts/${accountresponse[0].id}`,{
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
        });
        let responseJson=await responseData.json();
        console.log(responseJson);
        expect(responseData.status()).toBe(200);
        expect(responseJson.id).toBe(accountresponse[0].id);
        expect(responseJson.type).toBe(accountresponse[0].type);
        expect(responseJson.balance).toBe(accountresponse[0].balance);
        console.log("The account details were validated successfully using API");
    })


    test("TC-API-09: Validate Account details using API",async({request,RegisterFixture})=>{
        let accountIDFn= new GetAccounts();
        let accountresponse=await accountIDFn.getAccounts(request);
        console.log(accountresponse);
        let responseData=await request.get(`${env.API_BASEURL}/accounts/${accountresponse[0].id}`,{
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
        });
        let responseJson=await responseData.json();
        console.log(responseJson);
        expect(responseData.status()).toBe(200);
        expect(responseJson.type).toBe(accountresponse[0].type);
        console.log("The account Type were validated successfully using API");
    })
})
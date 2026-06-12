import {test} from "../../fixture/RegisterFixture.fixture"
import data from "../../test_data/FR2_Data.json"
import {env} from "../../config/env";

test.describe("TS-03: Get Accounts using api Positive Sceanario", ()=>{
    test("TC-API-01 & TC-API-02: Get Account details with credentials",async({request,RegisterFixture})=>{
        let responseData=await request.get(`${env.API_BASEURL}/login/${data.Username}/${data.Password}`,{
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
        });
        let responseJson=await responseData.json();
        console.log(responseJson);
        const custId=responseJson.id;
        let accountResponse=await request.get(`${env.API_BASEURL}/customers/${custId}/accounts`,{
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
        });
        let accountResponseJson=await accountResponse.json();
        console.log(accountResponseJson);
        test.expect(accountResponse.status()).toBe(200);
        test.expect(accountResponseJson.length).toBeGreaterThan(0);
    })

})


test.describe("TS-04: Get Accounts using api Negative Sceanario", ()=>{
    test.fixme("TC-API-03 Get Account details with invalid credentials",async({request,RegisterFixture})=>{
        let responseData =await request.get(`${env.API_BASEURL}/accounts/99999`,{
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
        })
        console.log(responseData);
        test.expect.soft(responseData.status()).toBe(404);
        console.log("The user Account was not found with the given credentials");
    })

    test.only("TC-API-04: Get Account details with wrong customer id",async({request,RegisterFixture})=>{
        const custId=99999;
        let accountResponse=await request.get(`${env.API_BASEURL}/customers/${custId}/accounts`);
        console.log(accountResponse);
    })

})
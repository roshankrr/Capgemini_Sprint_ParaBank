import {APIRequestContext} from "@playwright/test";
import data from '../test_data/FR2_Data.json';
import {env} from "../config/env";
export class GetCustId{
    constructor(){}
    async getCustID( request:APIRequestContext,username:string,password:string){
        let responseData=await request.get(`${env.API_BASEURL}/login/${username}/${password}`,{
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
        });
        let responseJson=await responseData.json();
        console.log(responseJson);
        const custId=responseJson.id;
        return custId;
    }
    
}
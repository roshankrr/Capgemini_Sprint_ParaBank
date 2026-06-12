import {APIRequestContext} from "@playwright/test";
import data from '../test_data/FR2_Data.json';
import {env} from "../config/env";
import { GetCustId } from "./getCustId";
export class GetAccounts{
    constructor(){}
    async getAccounts( request:APIRequestContext){
        let custIDFn= new GetCustId();
        const custId=await custIDFn.getCustID(request,data.Username,data.Password);
        let responseData=await request.get(`${env.API_BASEURL}/customers/${custId}/accounts`,{
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
        });
        let responseJson=await responseData.json();
        return responseJson;
    }
    
}
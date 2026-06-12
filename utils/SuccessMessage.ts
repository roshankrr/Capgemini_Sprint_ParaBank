import { Page,expect } from "@playwright/test";


//I will just pass the message here and it will check if the message was visible or not
export async function SuccessMessage(message:string,page:Page):Promise<void>{
    let msgLocator=await page.getByText(message);
    if(await msgLocator.isVisible()){
        console.log("Success Message is displayed: "+message);
        await  expect.soft(msgLocator).toBeVisible();
    }
    else{
        console.log("Success Message is not displayed: User is alwredy Registered "+message);
    }
    
}
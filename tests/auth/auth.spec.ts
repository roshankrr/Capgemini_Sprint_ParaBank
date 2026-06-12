import {test} from "../../fixture/RegisterFixture.fixture";
const path='./auth/userdata.json';
test("Register User",async({RegisterFixture})=>{
    await RegisterFixture.context().storageState({path:path});
})

import { use, expect } from 'chai'
import {default as chaiHttp, request} from 'chai-http'
import {Given, Then} from '@cucumber/cucumber'
const chai = use(chaiHttp)

//chai.request.execute()

let baseUrl = 'https://api-1.sitedocs.com/api/v1';
let testWorker = '47c9b2a0-0e47-46fd-9236-7780a01bf4fc';

Given('I fetch a worker', async function(){
    console.log(baseUrl);
    console.log('/'+testWorker);
    let res = await request.execute(baseUrl)
    .get('/workers/'+testWorker)
    .set('Authorization', '');
    chai.expect(res).to.have.status(200);
});

Then('I should get all the listed fields', async function(){

});

Then('The fields should have expected data', async function(){
    return null;
});
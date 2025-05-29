import Secrets from '../../secret.js'
import Functions from '../../functions.js'
import { use, expect, should } from 'chai'
import {default as chaiHttp, request} from 'chai-http'
import {Given, Then} from '@cucumber/cucumber'
const chai = use(chaiHttp)

//#region Custom Parameter Types

/*
defineParameterType({
    name: 'entity',
    regexp: /(worker|location|form)/,
    transformer: (s) => s+'s'
});

defineParameterType({
    name: 'authorize',
    regexp: /(authorize|unauthorize)/,
    transformer: (s) => s+"d"
});
*/
//#endregion

let baseUrl = 'https://api-1.sitedocs.com/api/v1';
let response;
let responseBody;


let currentEntity;
let givenEntityValues;
let expectedEntityValues;
let givenEntityFields;
let expectedEntityFields;

let workerDetails;

Given('I fetch {int} {authorize}(d) {validity} {entity}(s)', async function(count, authorize, validity, entity){
    currentEntity = entity

    let auth = authorize == 'authorized' ? Secrets.GetAuth() : 'unauthorized'
    let id = validity == 'valid' ? "/"+Functions.GetTestID(entity) : '/00000000-0000-0000-0000-000000000000'

    response = await request.execute(baseUrl)
    .get('/'+entity+id)
    .set('Authorization', auth)
    .query('count', count)
    .query('page', 0);

    responseBody = response.body;
});

Then('I expect a {int} error code', async function(code){
    chai.expect(response).to.have.status(code);
});

Then('I should get all the expected listed fields', async function(){
    let givenFields = new Array(Object.keys(responseBody).length)
    for(let i = 0; i < Object.keys(responseBody).length; i++){
        givenFields[i] = Object.keys(responseBody)[i];
    }
    //console.log(responseBody)
    expectedEntityFields = Functions.GetExpectedEntityFields(currentEntity)

    let valuesJustInGiven = givenFields.filter(x=>!expectedEntityFields.includes(x))
    let valuesJustInExpected = expectedEntityFields.filter(x=>!givenFields.includes(x))

    chai.expect(valuesJustInGiven).to.have.length(0)
    chai.expect(valuesJustInExpected).to.have.length(0)
});

Then('The fields should have expected data', async function(){
    let givenJSON = JSON.stringify(responseBody)
    let expectJson = JSON.stringify(Functions.GetExpectedEntityValues(currentEntity));

    chai.expect(givenJSON).equal(expectJson);
});
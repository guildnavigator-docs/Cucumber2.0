import Secrets from '../../secret.js'
import Functions from '../../functions.js'
import { use, expect, should } from 'chai'
import {default as chaiHttp, request} from 'chai-http'
import {Given, Then, When} from '@cucumber/cucumber'
const chai = use(chaiHttp)

let baseUrl = 'https://api-1.sitedocs.com/api/v1';
let response, responseBody;
let auth, id;

let currentEntity;
let expectedEntityFields;

let changedFieldValue, changedFieldKey;

Given('I fetch {int} {authorize}(d) {validity} {entity}(s)', async function(count, authorize, validity, entity){
    currentEntity = entity

    auth = authorize == 'authorized' ? Secrets.GetAuth() : 'unauthorized'
    id = validity == 'valid' ? "/"+Functions.GetTestID(entity) : '/00000000-0000-0000-0000-000000000000'

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
    expectedEntityFields = Functions.GetExpectedEntityFields(currentEntity)

    let valuesJustInGiven = givenFields.filter(x=>!expectedEntityFields.includes(x))
    let valuesJustInExpected = expectedEntityFields.filter(x=>!givenFields.includes(x))

    chai.expect(valuesJustInGiven).to.have.length(0)
    chai.expect(valuesJustInExpected).to.have.length(0)
});

Then('The fields are in the correct order', async function(){
    let expectedOrder = Functions.GetExpectedEntityFields(currentEntity);
    chai.expect(Object.keys(responseBody)).to.have.ordered.members(expectedOrder)
});

Then('The fields should have expected data', async function(){
    let cleanedResponseBody = responseBody;
    cleanedResponseBody['LastModifiedOn'] = '2000-01-01T00:00:00';
    let givenJSON = JSON.stringify(cleanedResponseBody)
    let expectJson = JSON.stringify(Functions.GetExpectedEntityValues(currentEntity));

    chai.expect(givenJSON).equal(expectJson);
});

When('I change the notes field', async function(){
    let patchableValues = Functions.clone(Functions.GetExpectedPatchableEntityValues(currentEntity));
    changedFieldValue = Math.random().toFixed(2);
    patchableValues['EmergencyNotes'] = changedFieldValue;

    response = await request.execute(baseUrl)
    .patch('/'+currentEntity)
    .set('Authorization', auth)
    .send(patchableValues)

    responseBody = response.body;
});

Then('The changed field will be present', async function(){
    let response = await request.execute(baseUrl)
    .get('/'+currentEntity+id)
    .set('Authorization', auth)

    //console.log(response.body)

    for(let i = 0; i < 10; i ++){
        if(response.body['EmergencyNotes']!=changedFieldValue)
        {
            Functions.sleepFor(1);
            response = await request.execute(baseUrl)
            .get('/'+currentEntity+id)
            .set('Authorization', auth)
        }
        else
            break;
    }

    chai.expect(response.body['EmergencyNotes']).to.be.equal(changedFieldValue)
});

Then('I change it back', async function(){
    let originalDetails = Functions.clone(Functions.GetExpectedPatchableEntityValues(currentEntity));

    response = await request.execute(baseUrl)
    .patch('/'+currentEntity)
    .set('Authorization', auth)
    .send(originalDetails)

    Functions.sleepFor(2000);

    response = await request.execute(baseUrl)
    .get('/'+currentEntity+id)
    .set('Authorization', auth)

    //Functions.sleepFor(2000);

    chai.expect(response.body['EmergencyNotes']).to.be.equal(originalDetails['EmergencyNotes'])
});

When('I activate one {entity}', async function(entity){
    currentEntity = entity;
    let entityID = Functions.GetTestID(entity)

    response = await request.execute(baseUrl)
    .post('/'+entity+'/status')
    .send('{"'+Functions.GetStatusBodyKey(entity)+'": "' + entityID + '"}')
    .auth('Authorization', auth)
    .end(function(error, response, body){
        if(error)
        {
            document(error);
        }
        else
        {
            document();
        }
    });
});

When('I deactivate one {entity}', async function(entity){
    
    currentEntity = entity;
    
    response = await request.execute(baseUrl)
    .post('/'+entity+'/status')
    .del('{'+Functions.GetStatusBodyKey(entity))
    .auth('Authorization', auth)
    .end(function(error, response, body){
        if(error)
        {
            document(error);
        }
        else
        {
            document();
        }
    });
});

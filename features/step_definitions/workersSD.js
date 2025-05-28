import Secrets from '../../secret.js'
import { use, expect, should } from 'chai'
import {default as chaiHttp, request} from 'chai-http'
import {defineParameterType, Given, Then} from '@cucumber/cucumber'
const chai = use(chaiHttp)


let baseUrl = 'https://api-1.sitedocs.com/api/v1';
let response;
let responseBody;
let testWorker = '47c9b2a0-0e47-46fd-9236-7780a01bf4fc';
let testLocation = '';

let currentEntity;
let givenEntityValues;
let expectedEntityValues;
let givenEntityFields;
let expectedEntityFields;

let workerDetails;
let expectedWorkerValues = {
  Id: '47c9b2a0-0e47-46fd-9236-7780a01bf4fc',
  FirstName: 'FOR API TESTING - FIRST NAME',
  LastName: 'FOR API TESTING - LAST NAME',
  JobTitle: 'FOR API TESTING - JOB TITLE',
  EmployerId: '05e080fb-d67f-4f2e-9b16-d2ee7abea706',
  StreetAddress: 'FOR API TESTING - ADDRESS',
  City: 'FOR API TESTING - CITY',
  PostalCode: 'FOR API TESTING - ZIP',
  MobileNumber: '555-555-5555',
  PhoneNumber: '123-456-7890',
  DateHired: '2000-01-01T00:00:00',
  EmployeeNumber: 'FOR API TESTING - EMPLOYEE NUMBER',
  EmergencyContact1: 'FOR API TESTING - CONTACT  1',
  EmergencyContact2: 'FOR API TESTING - CONTACT 2',
  EmergencyNotes: 'FOR API TESTING - NOTES',
  PictureId: null,
  Active: true,
  CreatedOn: '2025-05-26T21:55:51.543',
  LastModifiedOn: '2025-05-26T21:57:15.25',
  Email: 'forapitesting@email.com',
  IsExternal: false,
  ContractorId: null,
  ContractorName: null,
  FullName: 'FOR API TESTING - FIRST NAME FOR API TESTING - LAST NAME'
};
let expectedWorkerFields = [
  "Id",
  "FirstName",
  "LastName",
  "JobTitle",
  "EmployerId",
  "StreetAddress",
  "City",
  "PostalCode",
  "MobileNumber",
  "PhoneNumber",
  "DateHired",
  "EmployeeNumber",
  "EmergencyContact1",
  "EmergencyContact2",
  "EmergencyNotes",
  "PictureId",
  "Active",
  "CreatedOn",
  "LastModifiedOn",
  "Email",
  "IsExternal",
  "ContractorId",
  "ContractorName",
  "FullName"
];

//#region Custom Parameters

defineParameterType({
    name: 'validity',
    regexp: /(valid|invalid)/,
    transformer: (s) => s
});

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

//#endregion

//#region Custom Functions

function GetTestID(entity){
    switch(entity){
        case 'workers':
            return testWorker;
            break;
        case 'locations':
            return testLocation;
            break;
        default:
            return 'default'
            break;
    }
}

function GetExpectedEntityValues(entity){
    switch(entity){
        case 'workers':
            return expectedWorkerValues;
        case 'locations':
            return expectedLocationValues;
        default:
            expect(0).equal(1);
    }
}

function GetExpectedEntityFields(entity){
    switch(entity){
        case 'workers':
            return expectedWorkerFields;
        case 'locations':
            return expectedLocationFields;
        default:
            expect(0).equal(1);
    }
}

//#endregion

Given('I fetch {int} {authorize}(d) {validity} {entity}(s)', async function(count, authorize, validity, entity){
    currentEntity = entity
    let auth = authorize == 'authorized' ? Secrets.GetAuth() : 'unauthorized'
    let id = validity == 'valid' ? GetTestID(entity) : '00000000-0000-0000-0000-000000000000'

    response = await request.execute(baseUrl)
    .get('/'+entity+'/'+id)
    .set('Authorization', auth);

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

    expectedEntityFields = GetExpectedEntityFields(currentEntity)

    let valuesJustInGiven = givenFields.filter(x=>!expectedEntityFields.includes(x))
    let valuesJustInExpected = expectedEntityFields.filter(x=>!givenFields.includes(x))

    chai.expect(valuesJustInGiven).to.have.length(0)
    chai.expect(valuesJustInExpected).to.have.length(0)
});

Then('The fields should have expected data', async function(){
    let givenJSON = JSON.stringify(responseBody)
    let expectJson = JSON.stringify(GetExpectedEntityValues(currentEntity));

    chai.expect(givenJSON).equal(expectJson);
});
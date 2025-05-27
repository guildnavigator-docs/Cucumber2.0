import Secrets from '../../secret.js'
import { use, expect, should } from 'chai'
import {default as chaiHttp, request} from 'chai-http'
import {Given, Then} from '@cucumber/cucumber'
const chai = use(chaiHttp)


let baseUrl = 'https://api-1.sitedocs.com/api/v1';
let testWorker = '47c9b2a0-0e47-46fd-9236-7780a01bf4fc';
let workerDetails;
let expectedWorkerDetails = {
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
  IsExternal: null,
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

Given('I fetch a worker', async function(){
    let res = await request.execute(baseUrl)
    .get('/workers/'+testWorker)
    .set('Authorization', Secrets.GetAuth());

    workerDetails = res.body;
    chai.expect(res).to.have.status(200);
});

Then('I should get all the listed fields', async function(){
    let givenFields = new Array(Object.keys(workerDetails).length)
    for(let i = 0; i < Object.keys(workerDetails).length; i++){
        givenFields[i] = Object.keys(workerDetails)[i];
    }

    let valuesJustInGiven = givenFields.filter(x=>!expectedWorkerFields.includes(x))
    let valuesJustInExpected = expectedWorkerFields.filter(x=>!givenFields.includes(x))

    chai.expect(valuesJustInGiven).to.have.length(0)
    chai.expect(valuesJustInExpected).to.have.length(0)
});

Then('The fields should have expected data', async function(){
    let givenJSON = JSON.stringify(workerDetails)
    let expectJson = JSON.stringify(expectedWorkerDetails);

    chai.expect(givenJSON).equal(expectJson);
});

Then('Unauthorized calls should return 401', async function(){
    let res = await request.execute(baseUrl)
    .get('/workers/'+testWorker)
    .set('Authorization', 'bad authorizaton');

    chai.expect(res).to.have.status(401);
});

Then('Invalid Worker IDs should return 404', async function(){
    let res = await request.execute(baseUrl)
    .get('/workers/randomstringoflettersandnumbers123')
    .set('Authorization', Secrets.GetAuth());

    chai.expect(res).to.have.status(404);
});

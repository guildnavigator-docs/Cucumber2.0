import Secrets from '../../secret.js'
import { use, expect, should } from 'chai'
import {default as chaiHttp, request} from 'chai-http'
import {Given, Then} from '@cucumber/cucumber'
const chai = use(chaiHttp)


let baseUrl = 'https://api-1.sitedocs.com/api/v1';
let testLocation = '47c9b2a0-0e47-46fd-9236-7780a01bf4fc';
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

Given('I fetch jump worker', async function(count){
    return null;
    let res = await request.execute(baseUrl)
    .get('/locations/'+testLocation)
    .set('Authorization', Secrets.GetAuth());

    workerDetails = res.body;
    chai.expect(res).to.have.status(200);
});
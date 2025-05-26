import { use, expect } from 'chai'
import {default as chaiHttp, request} from 'chai-http'
import {Given} from '@cucumber/cucumber'
const chai = use(chaiHttp)

//chai.request.execute()

Given('I get {string} pokemons', async function(poke){
    let res = await request.execute('https://pokeapi.co/api/v2/pokemon').get("/"+poke);
    chai.expect(res).to.have.status(200);
});
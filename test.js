import * as chai from 'chai'
import {default as chaiHttp,request} from "chai-http"
chai.use(chaiHttp)



describe('Workers', function(){
    it('GET', async function () {
        this.timeout(0)
        console.log('hello')

        let res = await request.execute('https://api-1.sitedocs.com/api/v1')
        .get('/workers')
        .set('Authorization', 'ces3p07eFKcqzVUtiHVGbYwlA9sReczwEuDJZ4XnEkY9HpzZgLmWknFAU1a7JfqUnXzozE18NYsFG9si6hLQ');
        
        chai.expect(res).to.have.status(200)
    });
});

describe('Locations', function(){
    it('GET', async function () {
        this.timeout(0)
        console.log('hello')

        let res = await request.execute('https://api-1.sitedocs.com/api/v1')
        .get('/locations')
        .set('Authorization', 'ces3p07eFKcqzVUtiHVGbYwlA9sReczwEuDJZ4XnEkY9HpzZgLmWknFAU1a7JfqUnXzozE18NYsFG9si6hLQ');
        
        chai.expect(res).to.have.status(200)
    });
});


const supertest = require('supertest');
const app = require('../app');



    let user ;
    let token ;



describe("Testing the get all users API", () => {



        
	it("tests login endpoint", async () => {

		const response = await supertest(app).post('/api/account/login').send({
            userName : "123",
            password : "123"

        });

        expect(response.status).toBe(200);
        token = response.body.token.split(' ')[1] ;

	});

	it("tests the get all users endpoint with token so should work", async () => {

		const response = await supertest(app).get('/api/user').set('Authorization', `Bearer ${token}`);
       user = response.body.message[0];

        expect(response.status).toBe(200);
        

    });

    it("tests the get all users endpoint without token so shouldn't return unauthorized ", async () => {

		const response = await supertest(app).get('/api/user');

		expect(response.status).toBe(401);

    });


    
    
    it("tests update userPack with rotten id ", async () => {

        const response = await supertest(app).put(`/api/user/someRandomString`)
        .set('Authorization', `Bearer ${token}`)
        .send(
            {
                pack : '5e8625f2eaa07d0bfc7c3e40',
            }
        );
        expect(response.status).toBe(400);

    });

    
    



});
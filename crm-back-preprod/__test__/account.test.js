
const supertest = require('supertest');
const app = require('../app');



    let user ;
    let token ;



describe("Testing the get all users API", () => {



        
	it("tests login endpoint", async () => {

		const response = await supertest(app).post('/api/account/login').send({
            userName : "Ali",
            password : "123456"

        });

        expect(response.status).toBe(200);
        token = response.body.token.split(' ')[1] ;

	});

	it("tests the get all accounts endpoint with token so should work", async () => {

		const response = await supertest(app).get('/api/account/get').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        

    });

    it("tests the get all accounts endpoint without token so should return unauthorized ", async () => {

		const response = await supertest(app).get('/api/account/get');

		expect(response.status).toBe(401);

    });




    
    



});
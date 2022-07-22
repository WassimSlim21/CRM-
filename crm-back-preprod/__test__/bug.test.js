
const supertest = require('supertest');
const app = require('../app');



    let token ;
    let bug ;


    describe("Testing the get all bugs API", () => {
        it("tests login endpoint", async () => {
            const response = await supertest(app).post('/api/account/login').send({
                userName : "Ali",
                password : "123456"
            });
            expect(response.status).toBe(200);
            token = response.body.token.split(' ')[1] ;
        });
        //----------------------------------------------------------------------------
        it("tests the get all bugs endpoint", async () => {
            const response = await supertest(app).get('/api/bug').set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
        });
        //----------------------------------------------------------------------------
        it("tests add bug", async () => {
            const response = await supertest(app).post(`/api/bug/add`)
            .set('Authorization', `Bearer ${token}`);
            bug = response.body.bug ;
            expect(response.status).toBe(201);
        });
        //----------------------------------------------------------------------------
        it("tests delete bug", async () => {
            const response = await supertest(app).delete(`/api/bug/${bug._id}`)
            .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(201);
            expect(response.body.message).toBe('Bug Deleted !');
        });
        //----------------------------------------------------------------------------
        it("tests delete bug with wrong id", async () => {
            const response = await supertest(app).delete(`/api/bug/${bug}`)
            .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(400);
        });
    });
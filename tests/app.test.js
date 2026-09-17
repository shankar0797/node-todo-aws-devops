const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

describe('Todo Application', function () {

    it('should load the Todo page', async function () {
        const response = await request(app).get('/todo');

        expect(response.status).to.equal(200);
        expect(response.text).to.include('AWS DevOps Todo Application');
    });

    it('should add a Todo item', async function () {
        const response = await request(app)
            .post('/todo/add/')
            .send('newtodo=Learn AWS ECS');

        expect(response.status).to.equal(302);
        expect(response.headers.location).to.equal('/todo');
    });

});
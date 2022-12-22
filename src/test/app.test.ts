import {server} from "../crudAPI/app";
import request from 'supertest';

describe('First test', () => {
    it('GET /api/users',async () => {
        const res = await request(server).get('/api/users');
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual([]);
    })
})

server.close();
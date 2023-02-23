import { server } from "../crudAPI/app";
import request from 'supertest';

describe('Test all requests GET POST PUT DELETE', () => {
    const url = '/api/users'
    const user1 = { username: "User", age: 22, hobbies: ["jump"] };
    const user2 = { username: "User1", age: 18, hobbies: ["listening music"] };
    const user3 = { username: "User2", age: 30, hobbies: [] };
    const response = request(server);
    const idArr:string[] = []

    test('GET /api/users - expecting an empty array', async () => {
        const result = await response.get(url);
        expect(result.statusCode).toBe(200)
        expect(result.body.length).toBe(0);
    })


    test('Create 2 users - expecting 2 new User object', async () => {
        const userTest = await response.post(url)
            .send(user1);
        const userTest2 = await response.post(url)
            .send(user2);
            const id1 = userTest.body.id
            const id2 = userTest2.body.id
            idArr.push(id1);
            idArr.push(id2);

        expect(userTest.statusCode).toBe(201);
        expect(userTest2.statusCode).toBe(201);
    })

    test('GET /api/users - expecting 2 user object', async () => {
        const res = await response.get(`${url}`);
        expect(res.statusCode).toBe(200)
        expect(res.body.length).toBe(2);
    })


    test('GET /api/users/id - expecting second user object', async () => {
        const newUser = { id: idArr[1], ...user2 }
        const res = await response.get(`${url}/${idArr[1]}`);
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual(newUser);
    })

    test('Create 2 users - expecting 2 new User object', async () => {
        const userTest = await response.post(url)
            .send(user3);
        const id1 = userTest.body.id
        idArr.push(id1);

        expect(userTest.statusCode).toBe(201);
        expect(userTest.body.id).toBe(id1);
        expect(userTest.body.username).toBe(user3.username);
        expect(userTest.body.age).toBe(user3.age);
        expect(userTest.body.hobbies).toEqual([]);
    })

    test('GET /api/users - expecting 3 user object', async () => {
        const res = await response.get(`${url}`);
        expect(res.statusCode).toBe(200)
        expect(res.body.length).toBe(3);
    })

    test('Update exciting user - expecting updated 2 user object', async () => {
        const updUser = { ...user2 };
        updUser.age = 25;
        const resUser = { ...updUser, id: idArr[1] };
        const res = await response.put(`${url}/${idArr[1]}`).send(updUser);
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual(resUser);
    })

    test('GET /api/users/id - expecting old second user object not Equal to new', async () => {
        const newUser = { id: idArr[1], ...user2 }
        const res = await response.get(`${url}/${idArr[1]}`);
        expect(res.statusCode).toBe(200)
        expect(res.body).not.toEqual(newUser);
    })

    test('GET /api/users - expecting 3 users', async () => {
        const res = await response.get(`${url}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(3);
    })

    test('Delete all user - expecting status code 204', async () => {
        const delArr = idArr.map(id=>response.del(`${url}/${id}`))
        const arr = await Promise.all(delArr);
        arr.forEach(res=>{
            expect(res.statusCode).toBe(204);
            expect(res.body).toEqual("");
        })
    })

    test('GET /api/users - expecting 0 users', async () => {
        const res = await response.get(`${url}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(0);
    })
})

server.close();
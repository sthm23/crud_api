import { server } from "../crudAPI/app";
import request from 'supertest';

describe('Test all requests GET POST PUT DELETE', () => {
    const url = '/api/users'
    const user1 = { username: "User", age: 22, hobbies: ["jump"] };
    const response = request(server);
    const idArr:string[] = []

    test('GET /api/users - expecting an empty array', async () => {
        const result = await response.get(url);
        expect(result.statusCode).toBe(200)
        expect(result.body.length).toBe(0);
    })


    test('Create 10  users - expecting 10 new User object status 201', async () => {
        const userTestArr:request.Test[] = []
        for (let i = 0; i < 10; i++) {
            const userTest = response.post(url).send(user1);
            userTestArr.push(userTest)
        }
        userTestArr.forEach(async(reqElem) => {
            const res = await reqElem;
            const id = res.body.id;
            idArr.push(id)
            expect(res.statusCode).toBe(201);
        })
    })

    test('GET /api/users - expecting 10 user object', async () => {
        const res = await response.get(`${url}`);
        expect(res.statusCode).toBe(200)
        expect(res.body.length).toBe(10);
    })

    test('GET /api/users/id - expecting 5th user object', async () => {
        const newUser = { id: idArr[4], ...user1 }
        const res = await response.get(`${url}/${idArr[4]}`);
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual(newUser);
    })

    test('Update 2th user - expecting updated 2th user object', async () => {
        const updUser = { ...user1 };
        updUser.age = 25;
        const resUser = { ...updUser, id: idArr[1] };
        const res = await response.put(`${url}/${idArr[1]}`).send(updUser);
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual(resUser);
    })


    test('GET /api/users/id - expecting old second user object not Equal to new', async () => {
        const newUser = { id: idArr[1], ...user1 }
        const res = await response.get(`${url}/${idArr[1]}`);
        expect(res.statusCode).toBe(200)
        expect(res.body).not.toEqual(newUser);
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
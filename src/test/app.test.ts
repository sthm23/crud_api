import {server} from "../crudAPI/app";
import request from 'supertest';
import { textMessage } from "../crudAPI/interfaces/interfaces";

describe('Test wrong api endpoint', ()=>{
    const url = '/api/user'
    const text = {Message: textMessage.wrongPath}
    test(`GET ${url} - expecting status code 404`, async () => {
        const res = await request(server).get(url)
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual(text)
    });
    test('POST /api/user - expecting status code 404', async () => {
        const res = await request(server).post(url)
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual(text)
    });
});

describe('Test all requests GET POST PUT DELETE', () => {
    const url = '/api/users'
    const user = {username: "User", age: 22, hobbies: ["jump"]};
    const wrongUser = {username: "User", age: 22};
    const response = request(server);
    let id = ''

    test('GET /api/users - expecting an empty array', async () => {
        const result = await response.get(url);
        expect(result.statusCode).toBe(200)
        expect(result.body).toEqual([]);
    })

    test('POST /api/users send wrong object - expecting status code 404', async () => {
        const text = {message: textMessage.notAllProp};
        const res = await response.post(url).send(wrongUser);
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual(text);
    })

    test('POST api/users - expecting new User object', async () => {
        const userTest = await response.post(url)
        .send(user);
        id = userTest.body.id;

        expect(userTest.statusCode).toBe(201);
        expect(userTest.body.id).toBe(id);
        expect(userTest.body.username).toBe(user.username);
        expect(userTest.body.age).toBe(user.age);
        expect(userTest.body.hobbies).toEqual(["jump"]);
    })

    test('GET /api/users/id - expecting one user object', async () => {
        const newUser = {id:id, ...user}
        const res = await response.get(`${url}/${id}`);
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual(newUser);
    })

    test('PUT /api/users/id - expecting updated user object' , async () => {
        const updUser = {...user};
        updUser.age = 25;
        const resUser = {...updUser, id:id};
        const res = await response.put(`${url}/${id}`).send(updUser);
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual(resUser);
    })

    test('DELETE /api/users/id - expecting status code 204' , async () => {
        const res = await response.del(`${url}/${id}`);
        expect(res.statusCode).toBe(204);
        expect(res.body).toEqual("");
    })

    test('GET /api/users/id - expecting status code 404' , async () => {
        const text = {message: textMessage.userNotFound};
        const res = await response.get(`${url}/${id}`);
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual(text);
    })

})

server.close();
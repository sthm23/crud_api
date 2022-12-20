import {createServer} from 'http'
import {config} from 'dotenv';
import {version, validate, v4} from 'uuid';
import { getAllUsers } from './controllers/getAllUsers.js';
import { createUser } from './controllers/createUser.js';
export interface IUsers {
    id?: string
    username: string
    age: number
    hobbies: string[] | []
}
const usersArr:IUsers[] = [];
const PORT = config().parsed?.PORT || 5005;

const server = createServer((req, res)=>{
    const method = req.method;
    const url = req.url;
    const id = req.url?.split('/')[3]!;

    if(method === 'GET' && (url === '/api/users' || url === '/api/users/')){
        getAllUsers(req, res, usersArr);

    } else if(method === 'GET' && url === '/api/users/'+id){
        console.log('get one');

    } else if(method === 'POST' && (url === '/api/users' || url === '/api/users/')){
        createUser(req, res, usersArr);

    } else if(method === 'PUT' && url === '/api/users/'+id){
        console.log('put one');
    } else if(method === 'DELETE' && url === '/api/users/'+id){
        console.log('delete one');
    } else {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({Message: "You write bad path request"}));
    }
})

server.listen(PORT, ()=>{
    console.log('server running in port '+PORT);
})
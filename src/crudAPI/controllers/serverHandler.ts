import { IncomingMessage, ServerResponse } from "node:http";
import { getOneUser } from './getUserByID';
import { deleteUser } from './deleteUser';
import { updateUser } from './updateUser';
import { getAllUsers } from './getAllUsers';
import { createUser } from './createUser';
import { HEADER_CONTENT_TYPE, IUsers, statusCode } from "../interfaces/interfaces";

// const usersArr:IUsers[] = [
//     {
//         "id": "e4df5e6d-3bd0-4941-86b3-9d66d50729ae",
//         "username": "sanjar",
//         "age": 28,
//         "hobbies": [
//             "sakrash"
//         ]
//     },
//     {
//         "id": "a7717307-7e33-400c-95d5-4fb77df97103",
//         "username": "sanjar2",
//         "age": 23,
//         "hobbies": [
//             "sakrash"
//         ]
//     },
//     {
//         "id": "61718185-58aa-495c-b7ae-e9e71cb7fde8",
//         "username": "sanjar22",
//         "age": 24,
//         "hobbies": [
//             "sakrash"
//         ]
//     }
// ];
const usersArr:IUsers[] = [];
export function serverHandler (req:IncomingMessage, res:ServerResponse){
    const method = req.method;
    const url = req.url;
    const id = req.url?.split('/')[3]!;

    if(method === 'GET' && (url === '/api/users' || url === '/api/users/')){
        getAllUsers(req, res, usersArr);

    } else if(method === 'GET' && url === '/api/users/'+id){
        getOneUser(req, res, usersArr);

    } else if(method === 'POST' && (url === '/api/users' || url === '/api/users/')){
        createUser(req, res, usersArr);

    } else if(method === 'PUT' && url === '/api/users/'+id){
        updateUser(req, res, usersArr)
    } else if(method === 'DELETE' && url === '/api/users/'+id){
        deleteUser(req, res, usersArr);
    } else {
        res.writeHead(statusCode.wrongData, HEADER_CONTENT_TYPE);
        res.end(JSON.stringify({Message: "You wrote bad path request"}));
    }
}

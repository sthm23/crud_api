import { IncomingMessage, ServerResponse } from "node:http";
import { getOneUser } from './getUserByID';
import { deleteUser } from './deleteUser';
import { updateUser } from './updateUser';
import { getAllUsers } from './getAllUsers';
import { createUser } from './createUser';
import { HEADER_CONTENT_TYPE, statusCode, textMessage } from "../interfaces/interfaces";
import {usersArr} from '../db/data';

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
        res.end(JSON.stringify({Message: textMessage.wrongPath}));
    }
}

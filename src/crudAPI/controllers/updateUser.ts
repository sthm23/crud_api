import { IncomingMessage, ServerResponse } from 'http';
import {HEADER_CONTENT_TYPE, IUsers, statusCode, textMessage} from '../interfaces/interfaces';
import {validate} from 'uuid'
import { checkUser } from './checkUserValidate';

export function updateUser(req:IncomingMessage, res:ServerResponse, users:IUsers[]):void {
    const id = req.url?.split('/')[3]!;
    const userIndex = users.findIndex(item=>item.id === id);
    const check = validate(id);
    let body = ''
    req.on('data', (chunk)=>{
        body += chunk.toString()
    })
    req.on('error', (err)=>{
        res.writeHead(statusCode.serverError, HEADER_CONTENT_TYPE);
        res.end(JSON.stringify(err));
    })
    req.on('end', ()=>{
        const user = JSON.parse(body);
        const check2 = checkUser(user);
        user.id = id;

        if(!check2) {
            res.writeHead(statusCode.notFoundID, HEADER_CONTENT_TYPE);
            res.end(JSON.stringify({message: textMessage.wrongProp}));
            return
        }

        if(userIndex !== -1 && check === true) {
            users.splice(userIndex, 1, user);
            res.writeHead(statusCode.success, HEADER_CONTENT_TYPE);
            res.end(JSON.stringify(user));
            return
        }else if(userIndex !== -1 && check === false) {
            res.writeHead(statusCode.notFoundID, HEADER_CONTENT_TYPE);
            res.end(JSON.stringify({message: textMessage.wrongIdFormat}));
            return
        } else {
            res.writeHead(statusCode.wrongData, HEADER_CONTENT_TYPE);
            res.end(JSON.stringify({message: textMessage.userNotFound}));
            return
        }
    })
}
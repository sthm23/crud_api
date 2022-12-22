import { IncomingMessage, ServerResponse } from 'http';
import {HEADER_CONTENT_TYPE, IUsers, statusCode, textMessage} from '../interfaces/interfaces';
import {validate} from 'uuid'

export function getOneUser(req:IncomingMessage, res:ServerResponse, users:IUsers[]):void {
    const id = req.url?.split('/')[3]!;
    const user = users.find(item=>item.id === id);
    const check = validate(id);

    if(user !== undefined && check === true) {
        res.writeHead(statusCode.success, HEADER_CONTENT_TYPE);
        res.end(JSON.stringify(user));
    }else if(user !== undefined && check === false) {
        res.writeHead(statusCode.notFoundID, HEADER_CONTENT_TYPE);
        res.end(JSON.stringify({message: textMessage.wrongIdFormat}));
    } else {
        res.writeHead(statusCode.wrongData, HEADER_CONTENT_TYPE);
        res.end(JSON.stringify({message: textMessage.userNotFound}));
    }
}
import { IncomingMessage, ServerResponse } from 'http';
import {HEADER_CONTENT_TYPE, IUsers, statusCode, textMessage} from '../interfaces/interfaces';
import {validate} from 'uuid'

export function deleteUser(req:IncomingMessage, res:ServerResponse, users:IUsers[]):void {
    const id = req.url?.split('/')[3]!;
    const userIndex = users.findIndex(item=>item.id === id);
    const check = validate(id);

    if(userIndex !== -1 && check === true) {
        users.splice(userIndex, 1);
        res.writeHead(statusCode.deleteUser, HEADER_CONTENT_TYPE);
        res.end(JSON.stringify({message: textMessage.userDeleted}));
    }else if(userIndex !== -1 && check === false) {
        res.writeHead(statusCode.notFoundID, HEADER_CONTENT_TYPE);
        res.end(JSON.stringify({message: textMessage.wrongIdFormat}));
    } else {
        res.writeHead(statusCode.wrongData, HEADER_CONTENT_TYPE);
        res.end(JSON.stringify({message: textMessage.userNotFound}));
    }
}
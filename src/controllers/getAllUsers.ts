import { IncomingMessage, ServerResponse } from "http";
import {HEADER_CONTENT_TYPE, IUsers, statusCode} from '../interfaces/interfaces.js';


export function getAllUsers(req:IncomingMessage, res:ServerResponse, users:IUsers[]):IUsers[] {
    res.writeHead(statusCode.success, HEADER_CONTENT_TYPE);
    res.end(JSON.stringify(users));
    return users;
}
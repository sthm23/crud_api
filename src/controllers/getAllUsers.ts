import { IncomingMessage, ServerResponse } from "http";
import { IUsers } from "../server.js";


export function getAllUsers(req:IncomingMessage, res:ServerResponse, users:IUsers[]):IUsers[] {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
    return users;
}
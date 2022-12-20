import { IncomingMessage, ServerResponse } from "http";
import {HEADER_CONTENT_TYPE, IUsers, statusCode} from '../interfaces/interfaces.js';
import {version, validate, v4} from 'uuid';
import { checkUser } from "./checkUserValidate.js";


export function createUser(req:IncomingMessage, res:ServerResponse, users:IUsers[]):void {
    let body=''

    req.on('data', (chunk)=>{
        body+=chunk.toString()
    });

    req.on('end', ()=>{
        const result:IUsers = JSON.parse(body);
        const check = checkUser(result);
        const newUser:IUsers = {id: v4(), ...result}

        if(check === true) {
            users.push(newUser);
            res.writeHead(statusCode.createUser, HEADER_CONTENT_TYPE);
            res.end(JSON.stringify(newUser));
        } else {
            res.writeHead(statusCode.wrongData, HEADER_CONTENT_TYPE);
            res.end(JSON.stringify({message: "all properties did not written"}));
        }
    })

    req.on('error', ()=>{
        res.writeHead(statusCode.serverError, HEADER_CONTENT_TYPE);
        res.end(JSON.stringify({message: "Something was happened in server"}));
    });
}
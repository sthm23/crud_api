import {config} from 'dotenv';
import { createServer } from "http";
import { serverHandler } from "./controllers/serverHandler";


export const PORT = config().parsed?.PORT || 4000;
export const server = createServer(serverHandler)

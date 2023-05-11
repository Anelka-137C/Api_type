require('dotenv').config();
import {Server as ServerInstance} from './models/server';


const server = new ServerInstance();

server.listen();


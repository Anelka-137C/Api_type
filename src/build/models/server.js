"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const cors = require('cors');
const express = require('express');
require('dotenv').config();
const { dbConnection } = require('../database/config');
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        //Conectar a base de datos
        this.conectarDb();
        //midlewares
        this.middlewares();
        //Rutas de mi aplicacionn
        this.routes();
    }
    conectarDb() {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection();
        });
    }
    middlewares() {
        // CORS 
        this.app.use(cors());
        //Parseo y lectura del body
        this.app.use(express.json());
    }
    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto`, this.port);
        });
    }
}
exports.Server = Server;

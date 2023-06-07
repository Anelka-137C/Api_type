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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('../database/config');
const express_1 = __importDefault(require("express"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT;
        this.paths = {
            usuariosPath: '/api/usuarios',
            authPath: '/api/auth',
            categoriasPath: '/api/categoria'
        };
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
        this.app.use(express_1.default.json());
        // Directorio publico 
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.paths.authPath, require('../routes/auth'));
        this.app.use(this.paths.usuariosPath, require('../routes/usuarios'));
        this.app.use(this.paths.categoriasPath, require('../routes/categorias'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto`, this.port);
        });
    }
}
exports.Server = Server;

const cors = require('cors');
const express = require('express');
require('dotenv').config();
const {dbConnection} = require('../database/config');


export class Server {
    app: any;
    port: string | undefined;
    usuariosPath: string;

    constructor (){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios'
        //Conectar a base de datos
        this.conectarDb();
        //midlewares
        this.middlewares();
        //Rutas de mi aplicacionn
        this.routes();
    }

    async conectarDb():Promise<any>{
        await dbConnection();
    }

    middlewares ():void {

        // CORS 
        this.app.use(cors());

        //Parseo y lectura del body
        this.app.use(express.json());

    }
    routes():void{
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen():void{
        this.app.listen(this.port,()=>{
            console.log(`Servidor corriendo en el puerto`,this.port);
        });
    }
}


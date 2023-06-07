const cors = require('cors');
require('dotenv').config();
const {dbConnection} = require('../database/config');
import express, { Express} from 'express';


export class Server {
    app: Express
    port: string | undefined;
    paths: { usuariosPath: string; authPath: string; categoriasPath:string };


    constructor (){
        this.app = express();
        this.port = process.env.PORT;


        this.paths={
            usuariosPath: '/api/usuarios',
            authPath : '/api/auth',
            categoriasPath : '/api/categoria'

        }
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

        // Directorio publico 
        this.app.use(express.static('public')); 

    }
    routes():void{
        this.app.use(this.paths.authPath, require('../routes/auth'));
        this.app.use(this.paths.usuariosPath, require('../routes/usuarios'));
        this.app.use(this.paths.categoriasPath, require('../routes/categorias'));
    }

    listen():void{
        this.app.listen(this.port,()=>{
            console.log(`Servidor corriendo en el puerto`,this.port);
        });
    }
}


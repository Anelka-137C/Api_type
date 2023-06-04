import { Response,NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {tokenCafe,request} from '../helpers/types';
import Usuario from '../models/uasuario';



export const validarJWT = async (req:request,res:Response,next:NextFunction)=>{

    const token:string | undefined = req.header('x-token');

    if(!token){
       res.status(401).json({
            msg:'No hay token en la petición'
        });

        return 
    }

    try {
        const payload =<tokenCafe>jwt.verify(token, <string>process.env.SECRETORPRIVATEKEY);
        // req.uid = uid;
        const uid:string = payload.uid;
        const usuario= await Usuario.findById(uid);

        if(!usuario){
            res.status(401).json({
                msg: 'Token no valido - Usuario no existe en base de datos'
            });  
            return;
        }

        //Verificar si el uid tiene estado en true
        if(!usuario?.estado){
            res.status(401).json({
                msg: 'Token no valido - Usuario con estado false'
            });
            return;
        }
        req.usuario = usuario;


        next();
    } catch (error) {
        console.log(error);
         res.status(401).json({
            msg:'Token no valido'
        });
        return
    }

    console.log(token)

    next();

}

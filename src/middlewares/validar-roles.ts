import { Response,NextFunction } from 'express';
import {request} from '../helpers/types';



export const esAdminRole = (req:request,res:Response,next:NextFunction)=>{

    if(!req.usuario){
        res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
        return;
    }

    const {rol, nombre} = req.usuario;

    if(rol!== 'ADMIN_ROLE'){
        res.status(401).json({
            msg: `${nombre} no es rol administrador`
        });
    }

    next();
}


export const tieneRole = (...roles:string[])=>{

    return (req:request,res:Response,next:NextFunction)=>{

        if(!req.usuario){
            res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
            return;
        }

        if(!roles.includes(<string>req.usuario.rol)){
            res.status(401).json({
                msg:`El servicio require uno de estos roles ${roles}`
            });
        }

        next();
    }

}
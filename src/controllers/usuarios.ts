import { Request, Response } from 'express';
import  Usuario from '../models/uasuario';
import bcryptjs from 'bcryptjs';
import {validationResult}from 'express-validator'



export const usuariosGet = (req: Request, res: Response) => {

    const query = req.query;
    res.json({
        msg: 'Metodo get de mi api controlador',
        query
    });  
}

export const usuariosPut = (req: Request, res: Response) => {

    const id:string = req.params.id;
    res.json({
        msg: 'Metodo put de mi api controlador',id
    });
}

export const usuariosPost = async (req: Request, res: Response) => {

    const errors = validationResult(req);
    if(errors){
        res.status(400).json(errors);
        return;
    }


    const {nombre, correo,password,rol}:bodyPostRequest = req.body;
    
    const usuario = new Usuario({nombre, correo,password,rol});

    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        res.status(400).json({
            msg:'Este correo ya está registrado'
        });

        return;
    }
    //Encriptar la contraseña
    const salt  = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(<string>password,salt);

    //Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });  
}

export const usuariosDelete = (_req: Request, res: Response) => {
    res.json({
        msg: 'Metodo delete de mi api controlador'
    });
}



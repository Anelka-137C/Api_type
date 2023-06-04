import { Request, Response } from 'express';
import  Usuario from '../models/uasuario';
import bcryptjs from 'bcryptjs';
import { request } from '../helpers/types';

export const usuariosGet = async (req: Request, res: Response) => {

    const {limite=5,desde = 0} = req.query;

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({estado:true}),
        Usuario.find()
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });  
}

export const usuariosPut = async (req: Request, res: Response) => {

    const id:string = req.params.id;
    const {_id,...newUser}:bodyRequest = req.body;
    const {password}:bodyRequest = req.body;

    //TODO: Validar contra base de datos

    if(password){
        const salt  = bcryptjs.genSaltSync(10);
        newUser.password = bcryptjs.hashSync(<string>password,salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id,newUser);

    res.json({
        msg: 'Metodo put de mi api controlador',id,usuario
    });
}

export const usuariosPost = async (req: Request, res: Response) => {

    const {nombre, correo,password,rol}:bodyRequest = req.body;
    
    const usuario = new Usuario({nombre, correo,password,rol});
    
    //Encriptar la contraseña
    const salt  = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(<string>password,salt);

    //Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });  
}

export const usuariosDelete = async (req: request, res: Response) => {
    const {id} = req.params;


    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});
    const usuarioAutenticado = req.usuario;


    res.json({
        usuario,
        usuarioAutenticado
    });
}



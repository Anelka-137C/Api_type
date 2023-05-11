import { Request, Response } from 'express';
import  Usuario from '../models/uasuario';

const usuariosGet = (req: Request, res: Response) => {

    const query = req.query;
    res.json({
        msg: 'Metodo get de mi api controlador',
        query
    });  
}

const usuariosPut = (req: Request, res: Response) => {

    const id:string = req.params.id;
    res.json({
        msg: 'Metodo put de mi api controlador',id
    });
}

const usuariosPost = (req: Request, res: Response) => {

    const {nombre,edad}:bodyPostRequest = req.body;
    const usuario = new Usuario();

    res.json({
        msg: 'Metodo post de mi api controlador',
        nombre,edad
    });  
}

const usuariosDelete = (_req: Request, res: Response) => {
    res.json({
        msg: 'Metodo delete de mi api controlador'
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete

}
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uasuario_1 = __importDefault(require("../models/uasuario"));
const usuariosGet = (req, res) => {
    const query = req.query;
    res.json({
        msg: 'Metodo get de mi api controlador',
        query
    });
};
const usuariosPut = (req, res) => {
    const id = req.params.id;
    res.json({
        msg: 'Metodo put de mi api controlador', id
    });
};
const usuariosPost = (req, res) => {
    const { nombre, edad } = req.body;
    const usuario = new uasuario_1.default();
    res.json({
        msg: 'Metodo post de mi api controlador',
        nombre, edad
    });
};
const usuariosDelete = (_req, res) => {
    res.json({
        msg: 'Metodo delete de mi api controlador'
    });
};
module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
};

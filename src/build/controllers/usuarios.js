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
exports.usuariosDelete = exports.usuariosPost = exports.usuariosPut = exports.usuariosGet = void 0;
const uasuario_1 = __importDefault(require("../models/uasuario"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuariosGet = (req, res) => {
    const query = req.query;
    res.json({
        msg: 'Metodo get de mi api controlador',
        query
    });
};
exports.usuariosGet = usuariosGet;
const usuariosPut = (req, res) => {
    const id = req.params.id;
    res.json({
        msg: 'Metodo put de mi api controlador', id
    });
};
exports.usuariosPut = usuariosPut;
const usuariosPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, correo, password, rol } = req.body;
    const usuario = new uasuario_1.default({ nombre, correo, password, rol });
    //Encriptar la contraseña
    const salt = bcryptjs_1.default.genSaltSync(10);
    usuario.password = bcryptjs_1.default.hashSync(password, salt);
    //Guardar en BD
    yield usuario.save();
    res.json({
        usuario
    });
});
exports.usuariosPost = usuariosPost;
const usuariosDelete = (_req, res) => {
    res.json({
        msg: 'Metodo delete de mi api controlador'
    });
};
exports.usuariosDelete = usuariosDelete;

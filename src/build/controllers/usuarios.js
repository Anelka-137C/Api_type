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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuariosDelete = exports.usuariosPost = exports.usuariosPut = exports.usuariosGet = void 0;
const uasuario_1 = __importDefault(require("../models/uasuario"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuariosGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 5, desde = 0 } = req.query;
    const [total, usuarios] = yield Promise.all([
        uasuario_1.default.countDocuments({ estado: true }),
        uasuario_1.default.find()
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
        total,
        usuarios
    });
});
exports.usuariosGet = usuariosGet;
const usuariosPut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const _a = req.body, { _id } = _a, newUser = __rest(_a, ["_id"]);
    const { password } = req.body;
    //TODO: Validar contra base de datos
    if (password) {
        const salt = bcryptjs_1.default.genSaltSync(10);
        newUser.password = bcryptjs_1.default.hashSync(password, salt);
    }
    const usuario = yield uasuario_1.default.findByIdAndUpdate(id, newUser);
    res.json({
        msg: 'Metodo put de mi api controlador', id, usuario
    });
});
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
const usuariosDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield uasuario_1.default.findByIdAndUpdate(id, { estado: false });
    const usuarioAutenticado = req.usuario;
    res.json({
        usuario,
        usuarioAutenticado
    });
});
exports.usuariosDelete = usuariosDelete;

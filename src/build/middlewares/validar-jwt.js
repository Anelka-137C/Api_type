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
exports.validarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uasuario_1 = __importDefault(require("../models/uasuario"));
const validarJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('x-token');
    if (!token) {
        res.status(401).json({
            msg: 'No hay token en la petición'
        });
        return;
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.SECRETORPRIVATEKEY);
        // req.uid = uid;
        const uid = payload.uid;
        const usuario = yield uasuario_1.default.findById(uid);
        if (!usuario) {
            res.status(401).json({
                msg: 'Token no valido - Usuario no existe en base de datos'
            });
            return;
        }
        //Verificar si el uid tiene estado en true
        if (!(usuario === null || usuario === void 0 ? void 0 : usuario.estado)) {
            res.status(401).json({
                msg: 'Token no valido - Usuario con estado false'
            });
            return;
        }
        req.usuario = usuario;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        });
        return;
    }
    console.log(token);
    next();
});
exports.validarJWT = validarJWT;

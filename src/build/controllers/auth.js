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
exports.login = void 0;
const uasuario_1 = __importDefault(require("../models/uasuario"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, password } = req.body;
    console.log(correo);
    try {
        //verificar si el Email existe
        const usuario = yield uasuario_1.default.findOne({ correo });
        if (!usuario) {
            res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
            return;
        }
        // Si el usuario esta activo 
        if (!(usuario === null || usuario === void 0 ? void 0 : usuario.estado)) {
            res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado:false'
            });
            return;
        }
        //Verificar la contraseña 
        const validPassword = bcryptjs_1.default.compareSync(password, usuario === null || usuario === void 0 ? void 0 : usuario.password);
        if (!validPassword) {
            res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
            return;
        }
        // Gnerar JWT
        res.json({
            msg: 'Login ok'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
        return;
    }
});
exports.login = login;

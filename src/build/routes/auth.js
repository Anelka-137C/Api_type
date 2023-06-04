"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const express_validator_1 = require("express-validator");
const validar_campos_1 = require("../middlewares/validar-campos");
const router = (0, express_1.Router)();
router.post('/login', [
    (0, express_validator_1.check)('correo', 'El correo es obligatorio').isEmail(),
    (0, express_validator_1.check)('password', 'La contraseña es obligatoria').not().isEmail(),
    validar_campos_1.validarCampos
], auth_1.login);
router.post('/google', [
    (0, express_validator_1.check)('id_token', 'id_token de google es necesario').not().isEmpty(),
    validar_campos_1.validarCampos
], auth_1.googleSignIn);
module.exports = router;

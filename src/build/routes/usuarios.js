"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require('express');
const express_validator_1 = require("express-validator");
const usuarios_1 = require("../controllers/usuarios");
const router = Router();
router.get('/', usuarios_1.usuariosGet);
router.put('/:id', usuarios_1.usuariosPut);
router.post('/', [
    (0, express_validator_1.check)('correo', 'el correo no es valido').isEmail(),
], usuarios_1.usuariosPost);
router.delete('/', usuarios_1.usuariosDelete);
module.exports = router;

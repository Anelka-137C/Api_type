"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require('express');
const express_validator_1 = require("express-validator");
const usuarios_1 = require("../controllers/usuarios");
const validar_campos_1 = require("../middlewares/validar-campos");
const db_validators_1 = require("../helpers/db-validators");
const router = Router();
router.get('/', usuarios_1.usuariosGet);
router.put('/:id', [
    (0, express_validator_1.check)('id', 'No es un id valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existeUsuarioPorId),
    (0, express_validator_1.check)('rol').custom(db_validators_1.esRoleValido),
    validar_campos_1.validarCampos
], usuarios_1.usuariosPut);
router.post('/', [
    (0, express_validator_1.check)('nombre', 'el nombre es valido').not().isEmpty(),
    (0, express_validator_1.check)('password', 'el password debe de ser mas de 6 letras').isLength({ min: 6 }),
    (0, express_validator_1.check)('correo', 'el correo no es valido').isEmail(),
    (0, express_validator_1.check)('correo').custom(db_validators_1.emailExiste),
    (0, express_validator_1.check)('rol').custom(db_validators_1.esRoleValido),
    validar_campos_1.validarCampos
], usuarios_1.usuariosPost);
router.delete('/:id', [
    (0, express_validator_1.check)('id', 'No es un id valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existeUsuarioPorId),
    validar_campos_1.validarCampos
], usuarios_1.usuariosDelete);
module.exports = router;

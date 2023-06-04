import { Router } from 'express';
import {login,googleSignIn} from '../controllers/auth';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos';


const router:Router = Router();

router.post('/login',[
    check('correo','El correo es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmail(),
    validarCampos
], login);

router.post('/google',[
    check('id_token','id_token de google es necesario').not().isEmpty(),
    validarCampos
], googleSignIn);

module.exports = router;
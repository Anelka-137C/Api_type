import { Router } from 'express';
import {login} from '../controllers/auth';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos';


const router:Router = Router();

router.post('/login',[
    check('correo','El correo es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmail(),
    validarCampos
], login);

module.exports = router;
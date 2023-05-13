const {Router} = require('express');
import {check}from 'express-validator'
import   {usuariosGet,usuariosPut, usuariosPost,usuariosDelete} from '../controllers/usuarios';
import {validarCampos} from '../middlewares/validar-campos';
import {esRoleValido,emailExiste} from '../helpers/db-validators';


const router = Router();

  router.get('/', usuariosGet );

  router.put('/:id',  usuariosPut);

  router.post('/',[
    check('nombre', 'el nombre es valido').not().isEmpty(),
    check('password', 'el password debe de ser mas de 6 letras').isLength({min:6}),
    check('correo', 'el correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    check('rol').custom(esRoleValido),
    validarCampos
  ], usuariosPost );

  router.delete('/', usuariosDelete );


module.exports = router;
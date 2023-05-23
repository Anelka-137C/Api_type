const {Router} = require('express');
import {check}from 'express-validator'
import   {usuariosGet,usuariosPut, usuariosPost,usuariosDelete} from '../controllers/usuarios';
import {esRoleValido,emailExiste,existeUsuarioPorId} from '../helpers/db-validators';
import {validarCampos,validarJWT,esAdminRole,tieneRole} from '../middlewares';


const router = Router();

  router.get('/', usuariosGet );

  router.put('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
  ],  usuariosPut);

  router.post('/',[
    check('nombre', 'el nombre es valido').not().isEmpty(),
    check('password', 'el password debe de ser mas de 6 letras').isLength({min:6}),
    check('correo', 'el correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    check('rol').custom(esRoleValido),
    validarCampos,
    validarJWT
  ], usuariosPost );

  router.delete('/:id',[
    validarJWT,
    esAdminRole,
    tieneRole('ADMIN_ROLE', 'NOSE_ROLE'),
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos,
    
    ], usuariosDelete );


module.exports = router;
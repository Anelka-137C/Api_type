const {Router} = require('express');
import {check}from 'express-validator'
import   {usuariosGet,usuariosPut, usuariosPost,usuariosDelete} from '../controllers/usuarios';

const router = Router();

  router.get('/', usuariosGet );

  router.put('/:id',  usuariosPut);

  router.post('/',[
    check('correo', 'el correo no es valido').isEmail(),
  ], usuariosPost );

  router.delete('/', usuariosDelete );


module.exports = router;
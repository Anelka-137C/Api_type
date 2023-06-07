import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos';


const router:Router = Router();


//Obtener todas las categorias
router.get('/',(req,res)=>{
    res.json('get')
});


// Categoria por id
router.get('/:id',(req,res)=>{
    res.json('get-id')
});

// Crear categoria- privado- cualquier rol
router.post('/',(req,res)=>{
    res.json('get')
});

router.put('/',(req,res)=>{
    res.json('get')
});

module.exports = router;
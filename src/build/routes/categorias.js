"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
//Obtener todas las categorias
router.get('/', (req, res) => {
    res.json('get');
});
// Categoria por id
router.get('/:id', (req, res) => {
    res.json('get-id');
});
// Crear categoria- privado- cualquier rol
router.post('/', (req, res) => {
    res.json('get');
});
router.put('/', (req, res) => {
    res.json('get');
});
module.exports = router;

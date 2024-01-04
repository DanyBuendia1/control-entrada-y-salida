const {Router} = require('express');

const {readproducs, searchproduct, registerProducts, deleteProduct, updateproducts, buscaventa} = require('../controllers/productos.controller');

const seeproducts = Router();

seeproducts.get('/', readproducs);

seeproducts.get('/:descripcion', searchproduct);

seeproducts.post('/',registerProducts);

seeproducts.delete('/:id',deleteProduct);

seeproducts.put('/:id', updateproducts);

seeproducts.get('/id:',buscaventa)

module.exports = seeproducts;

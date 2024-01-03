const {Router} = require('express');

const {readproducs, searchproduct, registerProducts, deleteProduct, updateproducts} = require('../controllers/productos.controller');

const seeproducts = Router();

seeproducts.get('/', readproducs);

seeproducts.get('/:descripcion', searchproduct);

seeproducts.post('/',registerProducts);

seeproducts.delete('/:id',deleteProduct);

seeproducts.put('/:id', updateproducts);

module.exports = seeproducts;

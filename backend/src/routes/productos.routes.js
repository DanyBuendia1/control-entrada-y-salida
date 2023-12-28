const {Router} = require('express');

const {readproducs, searchproduct, registerProducts} = require('../controllers/productos.controller');

const seeproducts = Router();

seeproducts.get('/', readproducs);

seeproducts.get('/:nombre', searchproduct);

seeproducts.post('/',registerProducts);

module.exports = seeproducts;

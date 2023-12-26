const {Router} = require('express');

const {createemployee,reademployee,updateempoyee,deleteemployee} = require('../controllers/empleados.controllers')

const employees_router = Router();

employees_router.get('/:id',reademployee);

employees_router.post('/',createemployee);

employees_router.put('/:id',updateempoyee);

employees_router.delete('/:id',deleteemployee);


module.exports = employees_router;
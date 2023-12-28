const {Router} = require('express');

const {readlogin} = require('../controllers/login.controller');

const login_test = Router();

login_test.get('/:nombre/:contrasena',readlogin);

module.exports =login_test;
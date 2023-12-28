const express = require('express');
const cors = require('cors');

const app = express();

const empleadoroutes = require('../routes/empleados.routes');
const login = require('../routes/login.routes');
const seeproducts = require('../routes/productos.routes');
// ==================== MIDDLEWARES =================
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use('/employees', empleadoroutes);
app.use('/login', login);
app.use('/products', seeproducts);

// ==================== MIDDLEWARES =================

module.exports = app;
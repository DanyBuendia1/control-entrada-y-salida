const express = require('express');
const cors = require('cors');

const app = express();

const empleadoroutes = require('../routes/empleados.routes');

// ==================== MIDDLEWARES =================
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use('/employees', empleadoroutes);

// ==================== MIDDLEWARES =================

module.exports = app;
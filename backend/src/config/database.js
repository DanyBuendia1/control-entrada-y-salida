const mysql = require('mysql2');

const database = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: 'Dorianth:12',
    database: 'control',
    port:3307
});

module.exports = database;
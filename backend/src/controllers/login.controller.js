const database = require('../config/database');
const mysql2 = require('mysql2');

const readlogin = (req,res)=>{
    const {nombre, contrasena} = req.params;

    const select = `select * from empleados where nombre =? and aes_decrypt(contraseña,'AES') = ?`//and aes_decrypt(contraseña,'AES') = ?
    const query = mysql2.format(select, [nombre,contrasena]);

    database.query(query, (err, result)=>{
        if(err) throw err;
        if(result[0] != undefined)
        {
            res.json(result[0]);
        }
        else
        {
            res.json({message: 'Los datos no son correctos'});
        }
    });
};

module.exports = {readlogin};

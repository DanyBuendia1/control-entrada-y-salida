const database = require('../config/database');
const mysql2 = require('mysql2');

const readproducs = (req,res)=>{
    const select = 'select * from entrada_productos;';
    const query = mysql2.format(select);

    database.query(query, (err,result)=>{
        if(err) throw err;
        if(result[0] != undefined)
        {
            res.json(result[0]);
        }
        else
        {
            res.json({message: 'Aun no hay productos por mostrar'});
        }
    })
}

const searchproduct = (req,res)=>{
    const {nombre} = req.params;
    const select ='select * from entrada_productos where nombre =?;';

    const query = mysql2.format(select, [nombre]);

    database.query(query,(err,result)=>{
        if(err) throw err;
        if(result[0] != undefined)
        {
            res.json(result[0])
        }
        else
        {
            res.json({message: 'Producto no encontrado'});
        }
    });
};

const registerProducts = (req,res)=>{
    const {idempleado, nombre, marca, precio, cantidad, total} = req.body;

    const insert = 'insert into entrada_productos(id_empleado,nombre,marca,precio,cantidad, total) values (?,?,?,?,?,?);';
    const query = mysql2.format(insert, [idempleado,nombre,marca, precio,cantidad, total]);

    database.query(query, (err, result)=>{
        if(err) throw err;
        res.send({message: 'Producto añadido'});
    });
};

module.exports ={readproducs, searchproduct, registerProducts};
const database = require('../config/database');
const mysql2 = require('mysql2');

const createemployee = (req,res)=>{
    const {nombre, apellido, contraseña} = req.body;
    
    const empleado = `insert into empleados(nombre, apellido, contraseña)values(?,?,aes_encrypt(?,'AES'));`;
    
    const query = mysql2.format(empleado, [nombre, apellido, contraseña]);

    database.query(query, (err,result)=>{
        if(err)throw err;
        
        res.send({message: 'Empleado registrado'});
    });
};

const reademployee = (req, res)=>{
    const {id} = req.params;

    const select = 'select id_empleado, nombre, apellido from empleados where nombre = ?;';
    const query = mysql2.format(select, [id]);

    database.query(query, (err, result)=>{
        if(err) throw err;
        if(result[0] != undefined)
        {
            res.json(result[0])
        }
        else
        {
            res.json({message: 'Empleado no encontrado'});
        }
    });
};

const updateempoyee = (req, res)=>{
    const {id}= req.parms;
    const [nombre, apellido,contraseña, clave = 'AES'] = req.body;
    const update= `update empleados set nombre = ?, apellido = ?, contraseña = aes_encrypt(?,?) where id = ?;`;

    const query = mysql2.format(update, [nombre,apellido,contraseña,clave,id]);

    database.query(query, (err,result)=>{
        if(err) throw err;
        console.log(result);
        res.json({message:'Empleado actualizado'});
    });
};

const deleteemployee = (req, res)=>{
    const {id} = req.parms;

    const eliminar = `delete from empleados where id = ?;`;
    const query = mysql2.format(eliminar, [id]);

    database.query(query, (err,result)=>{
        if(err) throw err;
        console.log(result);
        res.json('Empleado eliminado');
    });
};

const valueemployee =(req, res)=>{
    const {nombre, apellido} = req.params;

    const select = 'select nombre, apellido from empleados where nombre = ? and apellido =?;';

    const query = mysql2.format(select, [nombre, apellido]);

    database.query(query, (err, result)=>{
        if(err) throw err;
        if(result[0] != undefined)
        {
            res.json(result[0]);
        }
        else
        {
            res.json({message: 'Los datos no son validos'})
        }
    })
}

module.exports = {
    createemployee,
    reademployee,
    updateempoyee,
    deleteemployee,
    valueemployee
}
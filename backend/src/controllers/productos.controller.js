const database = require('../config/database');
const mysql2 = require('mysql2');

const readproducs = (req,res)=>{
    const select = 'select id_Eproducto,descripcion,cantidad,costo,total from entrada_productos;';
    const query = mysql2.format(select);

    database.query(query, (err,result)=>{
        if(err){
            res.status(500).json({ error: 'Error al obtener los datos de la base de datos'});
            return;
        }
/*
        result.forEach(row =>{
            console.log(row);
        })
*/
        res.json(result);
    })
}

const searchproduct = (req,res)=>{
    const {descripcion} = req.params;
    const select =`select id_Eproducto,descripcion,cantidad,costo,total from entrada_productos where descripcion like ?`;

    const query = mysql2.format(select, [`${descripcion}%`]);

    database.query(query,(err,result)=>{
        if(err)
        {
            res.status(500).json({error:'Error al obtener lod datos'})
        }
        res.json(result);
    });
};

const registerProducts = (req,res)=>{
    const {idempleado, descripcion, cantidad,costo,total,fecha} = req.body;

    const insert = 'insert into entrada_productos(id_empleado,descripcion,cantidad,costo,total, fechayhora) values (?,?,?,?,?,?);';
    const query = mysql2.format(insert, [idempleado,descripcion,cantidad,costo, total,fecha]);

    database.query(query, (err, result)=>{
        if(err) throw err;
        res.send({message: 'Producto añadido'});
    });
};

const deleteProduct = (req, res)=>{
    const{id} =req.params;
    
    const eliminar = 'delete from entrada_productos where id_Eproducto = ?;';
    const query = mysql2.format(eliminar,[id]);

    database.query(query, (err,result)=>{
        if(err) throw err;
        res.json('Producto eliminado');
    })
}

const updateproducts = (req,res)=>{
    const{id}= req.params;
    const {id_Eproducto, descripcion, cantidad,costo,total,fecha} = req.body;

    const update = 'update entrada_productos set id_empleado =?, descripcion =?, cantidad=?, costo=?, total=?,fechayhora =? where id_Eproducto =?;';

    const query = mysql2.format(update, [id_Eproducto,descripcion,cantidad,costo,total,fecha, id])

    database.query(query,(err, result)=>{
        if(err)throw err;
        res.json({message:'los datos fueron actualizados'});
    })
}

module.exports ={readproducs, searchproduct, registerProducts,deleteProduct, updateproducts};
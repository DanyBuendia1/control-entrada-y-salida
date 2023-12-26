const app = require('./app');
const database = require('./database');

const main = ()=>{
database.connect((err)=>{
    if(err) throw err;
    console.log('La base de datos ha sido conectada')
    })

    app.listen(5000, ()=>{
        console.log('El servidor esta encendido');
    })
}
main();
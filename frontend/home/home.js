// ============= CERRAR SESION ================
document.getElementById('logout').addEventListener('click', ()=>{
    let confirmar = confirm('¿Te gustaria cerrar sesion?')
    if(confirmar)
    {
        sessionStorage.clear();
        window.location='../login/login.html'    
    }
})

// ============= MOSTRAR PRODUCTOS ================

let informacion = document.getElementById('informacion');
let message =''

fetch (`http://192.168.1.69:5000/products/`)
.then((response)=>response.json())
.then ((data)=>{
    informacion.innerHTML+=`
    <tr>
    <th scope="row">${data.id_Eproducto}</th>
    <td>${data.nombre}</td>
    <td>${data.marca}</td>
    <td>${data.precio}</td>
    <td>${data.cantidad}</td>
    <td>$${data.total}</td>
  </tr>` 
})
.catch((error)=>{
    console.error('Error al obtener los datos', error)
})

async function mostrardatos(){
    let informacion = document.getElementById('informacion');

 await fetch (`http://192.168.1.69:5000/products/`)
.then((response)=>response.json())
.then ((data)=>{
    informacion.innerHTML+=`
    <tr>
    <th scope="row">${data.id_Eproducto}</th>
    <td>${data.nombre}</td>
    <td>${data.marca}</td>
    <td>${data.precio}</td>
    <td>${data.cantidad}</td>
    <td>$${data.total}</td>
  </tr>` 
})
.catch((error)=>{
    console.error('Error al obtener los datos', error)
})
}
// ============ busqueda de producto ============
document.getElementById('searchProduc').addEventListener('click', async ()=>{
    const nombre = document.getElementById('nombreProduct').value;
    
    if(nombre =='')
    {
        alert('El espacio aún esta vacio')
    }
    else
    {

        let message ='';

        await fetch(`http://192.168.1.69:5000/products/${nombre}`)
        .then((response)=>response.json())
        .then((data)=>{
            if(data.message)
            {
                message = data.message;
                alert(`${message}`)
            }
            else
            {
                informacion.innerHTML=`
                <tr>
                <th scope="row">${data.id_Eproducto}</th>
                <td>${data.nombre}</td>
                <td>${data.marca}</td>
                <td>${data.precio}</td>
                <td>${data.cantidad}</td>
                <td>${data.total}</td>
              </tr>` 
            }
        })
    }
})

// =============== VENTANA DE REGISTRO =================
let registro = document.querySelector('.Registro');

document.getElementById('btnregistrar').addEventListener('click', ()=>registro.showModal());

document.querySelector('.cerrar').addEventListener('click',()=>registro.close());

document.querySelector('.btnregistrar').addEventListener('click', async ()=>{
    
    const nombre = document.getElementById('nombreproducto').value;
    const marca = document.getElementById('nombremarca').value;
    const precio = document.getElementById('precio').value;
    const cantidad = document.getElementById('cantidad').value;
    let total = document.getElementById('total');

    let preciototal = precio*cantidad;
    total.innerHTML= '$'+precio*cantidad; 

    let datosemployee = JSON.parse(sessionStorage.getItem('Employee'))
    console.log(datosemployee.id_employee);
    
    await fetch('http://localhost:5000/products/',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify({idempleado: datosemployee.id_employee, nombre: nombre,marca:marca, precio:precio,cantidad:cantidad, total:preciototal})
    })
    .then((response)=>response.json())
    .then((data)=>{
        alert(`${data.message}`)
    })

    mostrardatos();
})
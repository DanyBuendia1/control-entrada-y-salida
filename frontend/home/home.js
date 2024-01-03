// ============= CERRAR SESION ================
document.getElementById('logout').addEventListener('click', ()=>{
    let confirmar = confirm('¿Te gustaria cerrar sesion?')
    if(confirmar)
    {
        sessionStorage.clear();
        window.location='../login/login.html'    
    }
})


let datosemployee = JSON.parse(sessionStorage.getItem('Employee'))

// Obtén la fecha y hora actual
var fechaActual = new Date();

// Obtiene los componentes de la fecha
var año = fechaActual.getFullYear();
var mes = ('0' + (fechaActual.getMonth() + 1)).slice(-2); // Suma 1 al mes ya que los meses se indexan desde 0
var dia = ('0' + fechaActual.getDate()).slice(-2);

// Obtiene los componentes de la hora
var horas = ('0' + fechaActual.getHours()).slice(-2);
var minutos = ('0' + fechaActual.getMinutes()).slice(-2);
var segundos = ('0' + fechaActual.getSeconds()).slice(-2);

// Formatea la fecha y hora como una cadena
var fechaHoraString = `${año}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;

console.log(fechaHoraString);
// ============= MOSTRAR PRODUCTOS ================

let informacion = document.getElementById('informacion');
let message =''

fetch (`http://192.168.1.69:5000/products/`)
.then((response)=>response.json())
.then ((data)=>{

    document.getElementById('informacion').innerHTML=''
    data.forEach(item =>{
        informacion.innerHTML+=`
        <tr>
        <th scope="row">${item.id_Eproducto}</th>
        <td>${item.descripcion}</td>
        <td>${item.cantidad}</td>
        <td>${item.costo}</td>
        <td>${item.total}</td>
        <td class ='col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-3'>
            <button type="button" class="btn btn-outline-primary" onclick ='vender(${JSON.stringify(item)})'>Vender</button>   
            <button type="button" class="btn btn-outline-warning" onclick='showupdate(${JSON.stringify(item)})'>Actualizar</button>   
            <button type="button" class="btn btn-outline-danger" onclick='eliminar(${JSON.stringify(item)})'>Eliminar</button>
        </td>
      </tr>`     
    })

})
.catch((error)=>{
    console.error('Error al obtener los datos', error)
})

async function mostrardatos(){
    let informacion = document.getElementById('informacion');

 await fetch (`http://192.168.1.69:5000/products/`)
.then((response)=>response.json())
.then ((data)=>{

    document.getElementById('informacion').innerHTML=''
    data.forEach(item =>{
        informacion.innerHTML+=`
        <tr>
        <th scope="row">${item.id_Eproducto}</th>
        <td>${item.descripcion}</td>
        <td>${item.cantidad}</td>
        <td>${item.costo}</td>
        <td>${item.total}</td>
        <td class='col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-3'>
        <button type="button" class="btn btn-outline-primary" onclick ='vender(${JSON.stringify(item)})'>Vender</button>   
        <button type="button" class="btn btn-outline-warning" onclick='showupdate(${JSON.stringify(item)})'>Actualizar</button>   
        <button type="button" class="btn btn-outline-danger" onclick='eliminar(${JSON.stringify(item)})'>Eliminar</button></td>
      </tr>`       
    })
})
.catch((error)=>{
    console.error('Error al obtener los datos', error)
})
}
// ============ busqueda de producto ============


async function buscar(){
    let descripcion = document.getElementById('nombreProduct').value;

    document.getElementById('informacion').innerHTML=''
    let message ='';
    await fetch(`http://192.168.1.69:5000/products/${descripcion}/`)
    .then((response)=>response.json())
    .then((data)=>{
        if(data.message)
        {
            message = data.message;
            alert(`${message}`)
        }
        else
        {
            document.getElementById('informacion').innerHTML=''
            data.forEach(item=>{
                informacion.innerHTML+=`
                <tr>
                <th scope="row">${item.id_Eproducto}</th>
                <td>${item.descripcion}</td>
                <td>${item.cantidad}</td>
                <td>${item.costo}</td>
                <td>${item.total}</td>
                <td class='col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-3'>
                <button type="button" class="btn btn-outline-primary" onclick ='vender(${JSON.stringify(item)})'>Vender</button>   
                <button type="button" class="btn btn-outline-warning" onclick='showupdate(${JSON.stringify(item)})'>Actualizar</button>   
                <button type="button" class="btn btn-outline-danger" onclick='eliminar(${JSON.stringify(item)})'>Eliminar</button>
                </td>
              </tr>`  
            })

        }
    })
}


// =============== VENTANA DE REGISTRO =================
let registro = document.querySelector('.Registro');

function totalinsert(){
    let cantidad = document.getElementById('cantidad').value;
    let costo = document.getElementById('costo').value;

    let total = document.getElementById('totalinsert');

    total.innerHTML =cantidad*costo;
}

document.getElementById('btnregistrar').addEventListener('click', ()=>registro.showModal());

document.querySelector('.cerrar').addEventListener('click',()=>registro.close());

document.querySelector('.btnregistrar').addEventListener('click', async ()=>{
    
    const descripcion = document.getElementById('descripcion').value;
    const cantidad = document.getElementById('cantidad').value;
    const costo = document.getElementById('costo').value;

    let total = document.getElementById('totalinsert');


    if(cantidad <0 || costo <0)
    {
        alert('no se pueden añadir numeros negativos')
    }
    else if(descripcion ==''|| cantidad ==''|| costo =='')
    {
        alert('Aun los hay datos vacios')
    }
    else
    {
        let preciototal = costo*cantidad;
        total.innerHTML= '$'+costo*cantidad; 

        await fetch('http://192.168.1.69:5000/products/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({idempleado: datosemployee.id_employee, descripcion: descripcion,cantidad:cantidad, costo:costo, total:preciototal,fecha: fechaHoraString})
        })
        .then((response)=>response.json())
        .then((data)=>{
            alert(`${data.message}`)
        })    
        mostrardatos();            
    }
})

document.querySelector('.mostrar').addEventListener('click', ()=>{
    mostrardatos();
})

// ============ Actualizar datos ================= 
function showupdate(itemString) {
    document.getElementById('idupdate').value=itemString.id_Eproducto;

    
    document.getElementById('nombreupdate').value=itemString.descripcion;
    let cantidad1 = document.getElementById('marcaupdate').value=itemString.cantidad;
    let precio1 = document.getElementById('precioupdate').value=itemString.costo;

    let total = document.getElementById('totalupdate');

    calculo = precio1*cantidad1;

    total.innerHTML=calculo;

    document.querySelector('.verupdate').showModal();
}

function totalupdate(){
    let marcaupdate = document.getElementById('marcaupdate').value;
    let precioupdate = document.getElementById('precioupdate').value;

    let totalupdate = document.getElementById('totalupdate');
    totalupdate.innerHTML = marcaupdate*precioupdate;
}

document.querySelector('.btnupdate').addEventListener('click', async ()=>{
    
    let id = document.getElementById('idupdate').value;
    
    let descripcion =document.getElementById('nombreupdate').value;
    let cantidad = document.getElementById('marcaupdate').value;
    let costo = document.getElementById('precioupdate').value;
    let total = document.getElementById('totalupdate');
    
    let calculo = cantidad*costo
    total.value = '$'+calculo;

    if(descripcion ==''||cantidad ==''|| costo =='')
    {
        alert('aun faltan datos por completar')
    }
    else if(cantidad <0 || costo <0)
    {
        alert('no se aceptan numeros negativos')
    }
    else
    {

        let mensage = '';

        await fetch(`http://192.168.1.69:5000/products/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: id,id_Eproducto:datosemployee.id_employee ,descripcion:descripcion, cantidad:cantidad,costo:costo,total:calculo, fecha:fechaHoraString})
        })
        .then((response)=>response.json())
        .then((data)=>{
        mensage = data.message;    
        })
        alert(`${mensage}`);
        mostrardatos();
    
    }
})
//====================== CERRAR UPDATE ======================
    document.querySelector('.cerrarupdate').addEventListener('click', ()=>{
        document.querySelector('.verupdate').close();
    })
//======================= ELIMINAR PRODUCTO ======================
async function eliminar(item){
    let id = item.id_Eproducto;
    let message = '';
    
    let confirmar = confirm('¿Deseas eliminar este producto?');
    if(confirmar)
    {
        await fetch(`http://192.168.1.69:5000/products/${id}`,{
            method:'DELETE',
        })
        .then((response)=>response.json())
        .then((data)=>{
            
        if(data.message)
        {
            message = data
        }    
        else
        {
            message = 'Producto eliminado';
        }
        })
        alert(`${message}`);
        buscar();
    }
}
//======================= ELIMINAR PRODUCTO =====================
let verventa = document.querySelector('.mostrarventas');

document.querySelector('.cerrarventa').addEventListener('click', ()=>verventa.close());
function vender(item){
    let idventa = document.getElementById('idventa');
    let cantidadventa = document.getElementById('cantidadventa');
    let costoventa = document.getElementById('costoventa');
    let totalventa = document.getElementById('totalventa');
    let descripcionventa = document.getElementById('descripcionventa');
    


    verventa.showModal();

    descripcionventa.innerHTML = item.descripcion;
    idventa.innerHTML = item.id_Eproducto;
    cantidadventa.innerHTML = item.cantidad;
    costoventa.innerHTML = item.costo;

// ============= Calculo la cantidad del producto del cliente para sacar el total ===============
document.getElementById('cantidadcliente').addEventListener('input', ()=>{
    let cantidadcliente = document.getElementById('cantidadcliente').value;
    if(cantidadcliente > item.cantidad)
    {
        totalventa=0
        alert('no hay productos por vender')
    }
    totalventa.innerHTML = '$' +cantidadcliente*item.costo
    
  })
}

let contador=0;

let ver = document.getElementById('ver').addEventListener('click', ()=>{
    let contraseña = document.getElementById('contraseña');

    if(contraseña.type == 'password')
    {
        contraseña.type = 'text';
    }
    else
    {
        contraseña.type = 'password'
    }
})

// ========= FUNCION DE ENTRAR ================
document.getElementById('entrar').addEventListener('click',async (e)=>{
    e.preventDefault();

    let nombre = document.getElementById('nombre').value;
    let contrasena = document.getElementById('contraseña').value;

    if(nombre =''||contrasena=='')
    {
        swal('Aún hay campos vacios','','error');
    }
    else
    {
        let message =''

        await fetch(`http://192.168.1.69:5000/login/${document.getElementById('nombre').value}/${contrasena}`).then((response)=>response.json()).then((data)=>{
    
            if(data.message)
            {
                contador++;
                message = data.message;
                swal(`${message}`,`Numero de intentos ${contador} de 3`,'error');

                if(contador == 3)
                {
                    document.getElementById('nombre').disabled = true;
                    document.getElementById('contraseña').disabled = true;
                    document.getElementById('entrar').disabled = true;
                }
            }
            else
            {
                message =`${data.nombre} ${data.apellido}`
                let datos ={
                    id_employee: data.id_empleado,
                    nombre: data.nombre,
                    apellido: data.apellido,
                }

                sessionStorage.setItem('Employee',JSON.stringify(datos));

                alert(`Bienvenido ${message}`);
                
                window.location ='../home/home.html'

            }
        });

    }
})

let dialog = document.querySelector('.dialog');

document.getElementById('verregistro').addEventListener('click', ()=>{
    dialog.setAttribute('style','transition:10s; ')
    dialog.showModal()
});

document.getElementById('cerrar').addEventListener('click', ()=>dialog.close());

document.getElementById('registrar').addEventListener('click', async (e)=>{
    const nombre = document.getElementById('nombre2').value;
    const apellido = document.getElementById('apellido2').value;
    const contraseña2 = document.getElementById('contraseña2').value;
    const vcontraseña2 = document.getElementById('vcontraseña2').value;


    if(nombre ==''||apellido ==''|| contraseña2 ==''|| vcontraseña2=='')
    {
        alert('Aun faltan campos por completar');
    }
    else if(vcontraseña2 != contraseña2)
    {
        alert('Las contraseñas no coinciden');
    }
    else if(contraseña2.length <6)
    {
        alert('la contraseña necesita minimo 6 caracteres')
    }
    else
    {   
        console.log(nombre, apellido)
        await fetch (`http://192.168.1.69:5000/employees/${nombre}/${apellido}`)
        .then((response)=>response.json())
        .then((data)=>{

            let mensage ='';

            if(data.message)
            {
                registrar();
            }
            else
            {
                alert('Los datos no son validos')
            }
        })
    }
});

async function registrar(){

    const nombre = document.getElementById('nombre2').value;
    const apellido = document.getElementById('apellido2').value;
    const contraseña = document.getElementById('contraseña2').value;

    await fetch('http://192.168.1.69:5000/employees/',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                    },
                    body: JSON.stringify({nombre: nombre, apellido: apellido, contraseña: contraseña}),
                })
                .then((response)=>response.json())
                .then((data)=>{
                    message = data.message;
                });
                dialog.close()
                swal(`${message}, ahora puedes iniciar sesion`,'','success');
}

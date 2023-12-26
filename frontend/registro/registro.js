document.getElementById('registrar').addEventListener("click", ()=>{
    const nombre = document.getElementById('nombre');
    const apellido = document.getElementById('apellido');
    const contraseña = document.getElementById('contraseña').value; 
    const vcontraseña = document.getElementById('vcontraseña').value;
    if(nombre ==''||apellido ==''|| contraseña==''|| vcontraseña =='')
    {
        alert('aun faltan campos por completar')
    }
    else if(contraseña != vcontraseña)
    {
        alert('las contraseñas no coinciden');
    }
    else if(contraseña.length <6)
    {
        alert('La contraseña debe de tener al menos 6 caracteres');
    }
    else
    {
        registrar();
    }   
});

function registrar(){
    async(e)=>{
        alert('si entra')
     e.preventDefault();
    
     const nombre = document.getElementById('nombre').e.target.value;
     const apellido = document.getElementById('apellido').e.target.value;
     const contraseña = document.getElementById('contraseña').e.target.value;
    
     let message ='';
    
     await fetch(`http://localhost:5000/employees/`,{
         method: 'POST',
         headers: {
             'Content-Type':'application/json',
         },
         body: JSON.stringify([{nombre: nombre, apellido: apellido, contraseña: contraseña}])
     })
     .then((response)=>response.json())
     .then((data)=>{
     message = data.message;    
     })
     alert(`${message}`);
    }
}
document.getElementById('buscar').addEventListener("click", async(e)=>{
    e.preventDefault();
    let message =''

    let busqueda = document.getElementById('busqueda').value;    
    if(busqueda =='')
    {
        alert('¡¡¡Aun falta añadir el dato!!!')
    }
    else
    {
        await fetch(`http://localhost:5000/employees/${busqueda}`).then((response)=>response.json()).then((data)=>{
            if(data.message)
            {
                message = data.message;
            }
            else
            {
                message = `nombre: ${data.nombre} | apellido: ${data.apellido} | contraseña: ${data.contrasena}`;
            }
        });
        document.getElementById('infobuscar').innerHTML= message;
    }
});
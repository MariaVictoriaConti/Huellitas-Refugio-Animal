const port = 3000;  // Ya está en tu código, asegúrate de definirlo antes de usarlo

///////////////////////////////////////////////////////////////////////////////////
// Mostrar todas las huellitas
document.getElementById("allHuellitas").addEventListener("click", function() {
    fetch(`http://localhost:3000/animals`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let html = "";
            data.forEach(animal => {
                html += `<div class="col-md-4 cardTodas">
                            <div class="card">
                                <img src="img/8630408.jpg"
                                    class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${animal.nombre}</h5>
                                    <p class="card-text">${animal.edad}</p>
                                    <a href="#" class="btn btn-primary">Quiero adoptar</a>
                                </div>
                            </div>
                        </div>`;
            });
            document.getElementById("allHuellitas").innerHTML = html;
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

///////////////////////////////////////////////////////////////////////////////////ME QUEDE ACA!!
// Mostrar el formulario al hacer clic en "Buscar Huellita por ID"
document.getElementById("buscarHuellita").addEventListener("click", function() {
    document.getElementById("buscarHuellitaForm").style.display = "block";
}); 



///////////////////////////////////////////////////////////////////////////////////
// Mostrar el formulario al hacer clic en "Añadir Huellita"
document.getElementById("addHuellitaBtn").addEventListener("click", function() {
    document.getElementById("addHuellitaForm").style.display = "block";
});

// Ocultar el formulario si se hace clic en "Cancelar"
document.getElementById("cancelBtn").addEventListener("click", function() {
    document.getElementById("addHuellitaForm").style.display = "none";
});

// Manejar la acción de envío del formulario
document.getElementById("huellitaForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Evitar que el formulario se envíe de forma tradicional

    // Obtener los datos del formulario
    const nombre = document.getElementById("nombre").value;
    const edad = document.getElementById("edad").value;
    const disponible = document.getElementById("disponible").value;


    // Crear un objeto para enviar
    let huellitaData = {
        nombre: nombre,
        edad: edad,
        disponible: disponible
    };
    let huellitaDataJson = JSON.stringify(huellitaData);

/////////////////////////////////////////////////////////////////////


//Realizar la solicitud GET usando fetch
fetch('http://localhost:3000/', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
})
.then(response => response.json())
.then(data => {
    console.log(data);
})
.catch(error => {
    console.error('Error:', error);
});

    // Realizar la solicitud POST usando fetch
    fetch('http://localhost:3000/animals', {
        method: 'POST',
        
         headers: {
             'Content-Type': 'application/json',
         },
         body: huellitaDataJson, 
    }
)

     .then(response => response.json())
      .then(data => {
         alert('Huellita añadida exitosamente');
         console.log(data);
         document.getElementById("addHuellitaForm").style.display = "none"; // Ocultar el formulario
      })
     .catch(error => {
          console.error('Error:', error);
          alert('Ocurrió un error al añadir la huellita');
      });
 });




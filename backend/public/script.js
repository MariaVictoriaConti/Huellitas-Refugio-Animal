const port = 3000;  

/////////////////////////////////////////////////////////////////////////////////// GET ALL HUELLITAS
// Mostrar todas las huellitas
document.getElementById("allHuellitas").addEventListener("click", function () {
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

///////////////////////////////////////////////////////////////////////////////////GET Huellita por ID
// Mostrar el formulario al hacer clic en "BUSCAR Huellita por ID"
document.getElementById("buscarHuellita").addEventListener("click", function () {
    document.getElementById("buscarHuellitaForm").style.display = "block";
});
// Ocultar el formulario si se hace clic en "Cancelar"
document.getElementById("cancelBtn").addEventListener("click", function () {
    document.getElementById("buscarHuellitaForm").style.display = "none";
});

// Manejar la acción de envío del formulario
document.getElementById("huellitaForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Evitar que el formulario se envíe de forma tradicional
    const id = document.getElementById("id").value;
    fetch(`http://localhost:3000/animals/${id}`, {
        method: 'GET',

        headers: {
            'Content-Type': 'application/json',
        },
    })

        .then(response => response.json())
        .then(data => {
            if(data){alert('Huellita encontrada con exito')
            console.log(data);
            let html =  `<div class="col-md-4 cardPorId">
                        <div class="card">
                            <img src="img/8630408.jpg"
                                class="card-img-top" alt="...">
                            <div class="card-body">
                            <h5 class="card-title">${data.nombre}</h5>
                            <p class="card-text">${data.edad}</p>
                            <a href="#" class="btn btn-primary">Quiero adoptar</a>
                        </div>
                    </div>
                </div>`;

        document.getElementById("buscarHuellitaForm").innerHTML = html;

        }else{
            alert('Huellita no encontrada')
        }
})
    .catch(error => {
        console.error('Error:', error);
    });
});


/////////////////////////////////////////////////////////////////////////////////// POST ADD HUELLITA
// Mostrar el formulario al hacer clic en "Añadir Huellita"
document.getElementById("addHuellitaBtn").addEventListener("click", function () {
    document.getElementById("addHuellitaForm").style.display = "block";
});

// Ocultar el formulario si se hace clic en "Cancelar"
document.getElementById("cancelBtn").addEventListener("click", function () {
    document.getElementById("addHuellitaForm").style.display = "none";

});

// Manejar la acción de envío del formulario
document.getElementById("addHuellitaForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Evitar que el formulario se envíe de forma tradicional

    // Obtener los datos del formulario para crear un objeto para enviar en POST
    const nombre = document.getElementById("nombre").value;
    const edad = document.getElementById("edad").value;
    const disponible = document.getElementById("disponible").value;


    // Crear un objeto para enviar para POST
    let huellitaData = {
        nombre: nombre,
        edad: edad,
        disponible: disponible
    };
    let huellitaDataJson = JSON.stringify(huellitaData);


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


///////////////////////////////////////////////////////////////////////////////////

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



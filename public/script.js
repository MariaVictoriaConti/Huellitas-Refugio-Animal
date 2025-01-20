const port = 3000;  // Ya está en tu código, asegúrate de definirlo antes de usarlo


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
    const huellitaData = {
        nombre: nombre,
        edad: edad,
        disponible: disponible
    };

    // Realizar la solicitud POST usando fetch
    fetch(`http://localhost:3000/animals/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(huellitaData)
    })
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




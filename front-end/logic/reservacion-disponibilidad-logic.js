var urlParams = new URLSearchParams(window.location.search);
    
window.onload = function() {
const form = document.querySelector("form");
const pisoInput = document.getElementById("piso");
const habitacionInput = document.getElementById("habitacion");
const fechaInicioInput = document.querySelector("#fechaInicio");
const fechaFinInput = document.querySelector("#fechaFin");

// Obtener la lista de pisos desde el servidor
fetch("/pisos")
.then(response => response.json())
.then(data => {
    // Generar las opciones de pisos
    data.data.forEach(piso => {
    const option = document.createElement("option");
    option.value = piso;
    option.textContent = piso;
    pisoInput.appendChild(option);
    });
})
.catch(error => console.log(error));

// Actualizar las opciones de habitaciones según el piso seleccionado
pisoInput.addEventListener("change", () => {
const selectedPiso = pisoInput.value;
fetch(`/habitaciones/${selectedPiso}`)
    .then(response => response.json())
    .then(data => {
    // Limpiar las opciones existentes
    habitacionInput.innerHTML = "";
    // Generar las nuevas opciones
    data.data.forEach(habitacion => {
        const option = document.createElement("option");
        option.value = habitacion.numero;
        option.textContent = habitacion.numero;
        habitacionInput.appendChild(option);
    });
    habitacionInput.disabled = false; // Habilitar la selección de habitaciones
    })
    .catch(error => console.log(error));
});

//Manejar el envío del formulario
form.addEventListener("submit", event => {
event.preventDefault();
// Hacer una petición a /disponibilidad con los datos del formulario
fetch("/disponibilidad", {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        habitacion: habitacionInput.value,
        fecha_inicio: fechaInicioInput.value,
        fecha_fin: fechaFinInput.value
    })
})
.then(response => response.json())
.then(result => {
    if (result.error) {
        alert(result.message);
    } else {
        // Mostrar mensaje de disponibilidad y solicitar el titular
        const reservationConfirmed = confirm("¡La habitación está disponible durante el intervalo dado!\n¿Deseas reservar?");
        if (reservationConfirmed) {
        const titular = prompt("Ingresa el nombre del titular:");
        if (titular) {
            // Crear la reservación y agregarla a la base de datos
            const reservacionData = {
            piso: pisoInput.value,
            habitacion: habitacionInput.value,
            titular: titular,
            fecha_inicio: fechaInicioInput.value,
            fecha_fin: fechaFinInput.value
            };
            fetch("/reservaciones", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reservacionData)
            })
            .then(response => response.json())
            .then(result => {
            alert("¡La reservación se ha creado exitosamente!");
            window.location.href = "reservaciones.html";
            })
            .catch(error => console.log(error));
        } else {
            alert("Se requiere ingresar el nombre del titular para realizar la reservación.");
        }
        }
    }
})
.catch(error => console.log(error));
});
};
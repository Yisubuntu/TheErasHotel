var urlParams = new URLSearchParams(window.location.search);
var id = urlParams.get("id");

window.onload = function() {
    // Obtener los elementos del formulario
    const form = document.querySelector("form");
    const pisoInput = document.querySelector("#piso");
    const habitacionInput = document.querySelector("#habitacion");
    const titularInput = document.querySelector("#titular");
    const fechaInicioInput = document.querySelector("#fechaInicio");
    const fechaFinInput = document.querySelector("#fechaFin");

    // Hacer una petición GET al endpoint /reservaciones/id para obtener los datos de la reservación
    fetch(`/reservaciones/${id}`)
        .then(response => response.json())
        .then(reservacion => {
            // Llenar los valores originales en los campos del formulario
            pisoInput.value = reservacion.piso;
            habitacionInput.value = reservacion.habitacion;
            titularInput.value = reservacion.titular;
            fechaInicioInput.value = reservacion.fecha_inicio;
            fechaFinInput.value = reservacion.fecha_fin;
        })
        .catch(error => console.log(error));

    // Manejar el envío del formulario
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
                // Hacer una petición PUT al endpoint /reservaciones/id con los datos del formulario
                fetch(`/reservaciones/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        fecha_inicio: fechaInicioInput.value,
                        fecha_fin: fechaFinInput.value
                    })
                })
                .then(response => {
                    if (response.ok) {
                        alert("Reservación actualizada exitosamente");
                        window.location.replace("reservaciones.html");
                    } else {
                        alert("Error al actualizar la reservación");
                    }
                })
                .catch(error => console.log(error));
            }
        })
        .catch(error => console.log(error));
    });
};
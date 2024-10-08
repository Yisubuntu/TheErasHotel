const reservacionesTable = document.querySelector("#reservaciones");
    
function eliminarReservacion(id) {
const confirmar = confirm("¿Está seguro que desea eliminar la reservación?");
if (confirmar) {
  fetch(`/reservaciones/${id}`, { method: "DELETE" })
    .then(response => {
      console.log(response);
      if (response.ok) {
        location.reload();
      } else {
        throw new Error(response.statusText);
      }
    })
    .catch(error => {
      console.log(error);
      alert("Ocurrió un error al eliminar la reservación");
    });
}
}

fetch("/reservaciones")
.then(response => {
  console.log(response);
  return response.json();
})
.then(data => {
  console.log(data);
  const rows = data.data.map((reservacion) => {
    const fechaInicio = moment(reservacion.fecha_inicio).format("DD-MM-YYYY");
    const fechaFin = moment(reservacion.fecha_fin).format("DD-MM-YYYY");
    return `<tr>
              <td>${reservacion.id}</td>
              <td>${reservacion.piso}</td>
              <td>${reservacion.habitacion}</td>
              <td>${reservacion.titular}</td>
              <td>${fechaInicio}</td>
              <td>${fechaFin}</td>
              <td><a href="reservacion-update.html?id=${reservacion.id}"> <span class="register-link">Editar</span> </a></td>
              <td><a href="#" onclick="eliminarReservacion(${reservacion.id})"> <span class="register-link">Eliminar</span> </a></td>
            </tr>`;
  });
  reservacionesTable.innerHTML = rows.join("");
})
.catch(error => {
  console.log(error);
});
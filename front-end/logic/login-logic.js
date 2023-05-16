window.onload = function() {
    // Obtener los elementos del formulario
    const form = document.querySelector("form");
    const emailInput = document.querySelector("#email");
    const passwordInput = document.querySelector("#password");

    // Manejar el envío del formulario
    form.addEventListener("submit", event => {
        event.preventDefault();

        const data = {
            email: emailInput.value,
            password: passwordInput.value
        };

        fetch("/login", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.error) {
                alert(result.message);
            } else {
                window.location.href = 'reservaciones.html';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
}
window.onload = function() {
    // Obtener los elementos del formulario
    const form = document.querySelector("#registration-form");
    const nameInput = document.querySelector("#name");
    const emailInput = document.querySelector("#email");
    const passwordInput = document.querySelector("#password");
    const confirm_passwordInput = document.querySelector("#confirm_password");

    // Manejar el envío del formulario
    form.addEventListener("submit", event => {
        event.preventDefault();

        const data = {
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
            confirm_password: confirm_passwordInput.value
        };

        fetch("/register", {
            method: 'POST',
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
                alert('Usuario creado exitosamente, ahora puedes iniciar sesión.');
                window.location.href = 'login.html';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
}
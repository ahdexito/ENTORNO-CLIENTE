document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formularioRegistro");

    formulario.addEventListener("submit", (evento) => {
        let errores = 0;

        // MARCAR ERRORES
        const marcarError = (elemento, mensaje) => {
            elemento.nextElementSibling.textContent = mensaje;
            errores++;
            elemento.focus();
        };

        // LIMPIAR ERRORES
        const limpiarError = (elemento) => {
            elemento.nextElementSibling.textContent = "";
        }

        // EJERCICIO 1
        const dni = document.getElementById("dni");
        // ^ (inicio), \d{8} (8 números), - (guion), [A-Z] (letra), $ (fin)
        const regExDNI = /^\d{8}-[A-Z]$/i; 
        if (!regExDNI.test(dni.value)) marcarError(dni, "El DNI debe tener 8 dígitos seguidos de una letra.");
        else limpiarError(dni);

        // EJERCICIO 2
        const tlf = document.getElementById("telefono");
        // ^[679] (empieza por 6, 7 o 9), \d{8}$ (8 dígitos más)
        const regExTlf = /^\d{3}\s\d{2}\s\d{2}\s\d{2}$/;
        if (!regExTlf.test(tlf.value)) marcarError(tlf, "El teléfono debe contener 9 cifras, con el siguiente formato: 123 45 67 89.");
        else limpiarError(tlf);

        // EJERCICIO 3
        const email = document.getElementById("email");
        // Valida estructura: texto @ texto . extensión
        const regExEmail = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,6}$/;
        if (!regExEmail.test(email.value)) marcarError(email, "El correo electrónico no tiene un formato válido.");
        else limpiarError(email);

        // PREVENIR ENVÍO SI HAY ERRORES
        if (errores > 0) {
            evento.preventDefault();
        } else {
            alert("¡Formulario enviado correctamente!");
        }
    });
});
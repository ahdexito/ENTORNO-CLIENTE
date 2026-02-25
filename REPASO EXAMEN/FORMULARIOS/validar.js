document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("newEvent");
    const contenedorErrores = document.getElementById("errores");

    formulario.addEventListener("submit", (evento) => {
        // 1. Limpiar estados previos
        contenedorErrores.innerHTML = "";
        let errores = [];
        
        // Quitamos la clase de error de TODOS los inputs, selectores y contenedores de radio
        const todosLosInputs = document.querySelectorAll(".form-control, .form-check-input");
        todosLosInputs.forEach(input => input.classList.remove("is-invalid"));

        // --- FUNCIONES DE APOYO ---
        const marcarError = (elemento, mensaje) => {
            errores.push(mensaje);
            elemento.classList.add("is-invalid");
            // Foco en el primer error
            if (errores.length === 1) {
                elemento.focus();
            }
        };

        // --- VALIDACIONES ---

        // 1. NOMBRE y APELLIDOS
        const nombre = document.getElementById("name");
        const apellidos = document.getElementById("surname");
        if (nombre.value.trim() === "") marcarError(nombre, "El NOMBRE es obligatorio.");
        if (apellidos.value.trim() === "") marcarError(apellidos, "Los APELLIDOS son obligatorios.");

        // 2. EDAD (0-105)
        const edad = document.getElementById("age");
        const edadVal = parseInt(edad.value);
        if (isNaN(edadVal) || edadVal < 0 || edadVal > 105) {
            marcarError(edad, "La EDAD debe ser un número entre 0 y 105.");
        }

        // 3. NIF (Expresión Regular)
        const nif = document.getElementById("nif");
        // ^ (inicio), \d{8} (8 números), - (guion), [A-Z] (letra), $ (fin)
        const regExNif = /^\d{8}-[A-Z]$/i; 
        if (!regExNif.test(nif.value)) marcarError(nif, "NIF incorrecto (Ej: 12345678-Z).");

        // 4. E-MAIL (Expresión Regular)
        const email = document.getElementById("email");
        // Valida estructura: texto @ texto . extensión
        const regExEmail = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,6}$/;
        if (!regExEmail.test(email.value)) marcarError(email, "E-MAIL no válido.");

        // 5. PROVINCIA (Cambio: ahora marcará el borde rojo en el selector)
        const provincia = document.getElementById("province");
        if (provincia.value === "") {
            marcarError(provincia, "Debe seleccionar una PROVINCIA.");
        }

        // 6. SEXO / GÉNERO (Cambio: ahora marca los radio buttons)
        const sexos = document.getElementsByName("sex");
        let seleccionado = false;
        sexos.forEach(r => { if (r.checked) seleccionado = true; });

        if (!seleccionado) {
            errores.push("Debe seleccionar un SEXO.");
            // Marcamos ambos radios con el borde rojo de error
            sexos.forEach(r => r.classList.add("is-invalid"));
            if (errores.length === 1) sexos[0].focus();
        }

        // 7. FECHA (Expresión Regular)
        const fecha = document.getElementById("date");
        // ^\d{2} (día), [/-] (separador), \d{2} (mes), [/-] (separador), \d{4}$ (año)
        const regExFecha = /^\d{2}[/-]\d{2}[/-]\d{4}$/;
        if (!regExFecha.test(fecha.value)) marcarError(fecha, "FECHA inválida (dd/mm/aaaa).");

        // 8. TELÉFONO (Expresión Regular)
        const tlf = document.getElementById("phone");
        // ^[679] (empieza por 6, 7 o 9), \d{8}$ (8 dígitos más)
        const regExTlf = /^[679]\d{8}$/;
        if (!regExTlf.test(tlf.value)) marcarError(tlf, "TELÉFONO inválido (9 dígitos, empieza por 6, 7 o 9).");

        // 9. HORA (Expresión Regular)
        const hora = document.getElementById("time");
        // ^([01]\d|2[0-3]) (00-23), : (separador), [0-5]\d$ (00-59)
        const regExHora = /^([01]\d|2[0-3]):[0-5]\d$/;
        if (!regExHora.test(hora.value)) marcarError(hora, "HORA inválida (hh:mm).");

        // 10. Bloqueo de envío
        if (errores.length > 0) {
            evento.preventDefault();
            const lista = document.createElement("ul");
            errores.forEach(texto => {
                const li = document.createElement("li");
                li.textContent = texto;
                lista.appendChild(li);
            });
            contenedorErrores.appendChild(lista);
        } else {
            alert("¡Formulario enviado correctamente!");
        }
    });
});
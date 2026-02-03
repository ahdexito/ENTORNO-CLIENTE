const formulario = document.getElementById("formulario");
const divErrores = document.getElementById("errores");

const nombre = document.getElementById("nombre");
const apellidos = document.getElementById("apellidos");
const edad = document.getElementById("edad");
const nif = document.getElementById("nif");

formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    divErrores.textContent = "";
    let esValido = true;

    // Obtener mensaje según error de validación
    function getErrorMsg(campo, etiqueta) {

        // VALIDAR CAMPO NO VACÍO
        if (campo.validity.valueMissing) {

            // (EJERCICIO 5)
            if (etiqueta === "PROVINCIA") {
                return `Debe seleccionar una provincia de la lista.`
            }

            // (EJERCICIO 1)
            return `El campo ${etiqueta} es obligatorio.`;
        }

        // VALIDAR PATRONES Y FORMATOS
        if (campo.validity.patternMismatch || campo.validity.typeMismatch) {

            // VALIDAR EMAIL (EJERCICIO 4)
            if (etiqueta === "EMAIL") {
                return `El formato del EMAIL no es correcto.`
            }

            // VALIDAR NIF (EJERCICIO 3)
            if (etiqueta === "NIF") {
                return `El NIF debe tener 8 números y una letra`;
            }

            // VALIDAR PATRÓN NO NUMÉRICO (EJERCICIO 1)
            return `El campo ${etiqueta} solo debe contener letras.`;
        }

        // VALIDAR RANGO DE EDAD (EJERCICIO 2)
        if (campo.validity.rangeUnderflow || campo.validity.rangeOverflow) {
            return divErrores.textContent = `El campo ${etiqueta} debe estar entre 0 y 105.`;
        }

        // VALIDAR CUALQUIER OTRO ERROR
        if (!campo.validity.valid) {
            return campo.validationMessage;
        }

        // Sin errores
        return "";
    }

    // Validar campos de abajo hacia arriba para se haga foco al primero
    const campos = [
        {elem: provincia, nombre: "PROVINCIA"},
        {elem: email, nombre: "EMAIL"},
        {elem: nif, nombre: "NIF"},
        {elem: edad, nombre: "EDAD"},
        {elem: apellidos, nombre: "APELLIDOS"},
        {elem: nombre, nombre: "NOMBRE"}
    ];

    campos.forEach(campo => {
        const mensaje = getErrorMsg(campo.elem, campo.nombre);
        if (mensaje != "") {
            divErrores.textContent = mensaje;
            campo.elem.focus();
            esValido = false;
        }
    });

    if (esValido) {
        alert("Formulario enviado.");
        formulario.submit();
    }
});
const formulario = document.getElementById("formulario");
const divErrores = document.getElementById("errores");

const nombre = document.getElementById("nombre");
const apellidos = document.getElementById("apellidos");
const edad = document.getElementById("edad");
const nif = document.getElementById("nif");
const email = document.getElementById("email");
const provincia = document.getElementById("provincia");
const genero = document.getElementById("genero_h");
const fecha = document.getElementById("fecha");

formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    divErrores.textContent = "";
    let esValido = true;

    // Obtener mensaje según error de validación
    function getErrorMsg(campo, etiqueta) {

        // VALIDAR CAMPO NO VACÍO
        if (campo.validity.valueMissing) {

            // (EJERCICIO 6)
            if (etiqueta === "GENERO") { return `Debe seleccionar una opción de GÉNERO`; }

            // (EJERCICIO 5)
            if (etiqueta === "PROVINCIA") { return `Debe seleccionar una PROVINCIA de la lista.`; }

            // (EJERCICIO 1)
            return `El campo ${etiqueta} es obligatorio.`;
        }

        // VALIDAR PATRONES Y FORMATOS
        if (!campo.validity.valid) {

            // (EJERCICIO 7)
            if (etiqueta === "FECHA") {
                return "El formato de fecha debe ser dd/mm/aaaa o dd-mm-aaaa."; 
            }

            // VALIDAR NIF (EJERCICIO 3)
            if (etiqueta === "NIF") {
                return `El NIF debe tener 8 números y una letra`;
            }

            // VALIDAR EMAIL (EJERCICIO 4)
            if (etiqueta === "EMAIL") {
                return `El formato del EMAIL no es correcto.`
            }

            // VALIDAR PATRÓN NO NUMÉRICO (EJERCICIO 1)
            if ((etiqueta === "NOMBRE" || etiqueta === "APELLIDOS") && campo.validity.patternMismatch) {
                return `El campo ${etiqueta} solo debe contener letras.`;
            }
        }

        // VALIDAR RANGO DE EDAD (EJERCICIO 2)
        if (campo.validity.rangeUnderflow || campo.validity.rangeOverflow) {
            return `El campo ${etiqueta} debe estar entre 0 y 105.`;
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
        {elem: fecha, nombre: "FECHA"},
        {elem: genero, nombre: "GENERO"},
        {elem: provincia, nombre: "PROVINCIA"},
        {elem: email, nombre: "EMAIL"},
        {elem: nif, nombre: "NIF"},
        {elem: edad, nombre: "EDAD"},
        {elem: apellidos, nombre: "APELLIDOS"},
        
    ];

    for (const campo of campos) {
        const mensaje = getErrorMsg(campo.elem, campo.nombre);

        if (mensaje != "") {
            divErrores.textContent = mensaje;
            campo.elem.focus();
            esValido = false;
            break;
        }
    }

    if (esValido) {
        alert("Formulario enviado.");
        formulario.submit();
    }
});
// --- SELECCIÓN DE ELEMENTOS ---
// Seleccionamos el contenedor (div), el párrafo y el título h2
const divNaranja = document.getElementById("myDiv");
const parrafoBlanco = document.getElementById("myP");
const tituloDiv = divNaranja.querySelector("h2");

// Seleccionamos los botones que controlarán el comportamiento de los eventos
const btnBub = document.getElementById("botBub");
const btnCapt = document.getElementById("botCapt");
const btnStop = document.getElementById("botStop");

// --- FUNCIONES DE MANEJO (HANDLERS) ---
// Función que se ejecuta al hacer clic en el DIV
function mensajeDiv() {
    alert("Has hecho clic en el naranja.");
}

// Función que se ejecuta al hacer clic en el PÁRRAFO
function mensajeParrafo() {
    alert("Has hecho clic en el blanco.");
}

// --- LIMPIEZA DE EVENTOS ---
// Función crucial para evitar que los eventos se acumulen o se mezclen
// Se eliminan los listeners tanto en fase de burbujeo (false) como se captura (true)
function eliminarEventos() {
    divNaranja.removeEventListener("click", mensajeDiv, false);
    divNaranja.removeEventListener("click", mensajeDiv, true);
    parrafoBlanco.removeEventListener("click", mensajeParrafo, false);
    parrafoBlanco.removeEventListener("click", mensajeParrafo, true);
}

// --- CONFIGURACIÓN DE MODOS ---

// MODO BUBBLING (burbujeo): El evento se propaga desde el hijo hacia el padre
btnBub.addEventListener("click", () => {
    eliminarEventos();
    tituloDiv.textContent = "BUBBLING:";

    // El tercer parámetro 'false' indica que se use Bubbling (valor por defecto)
    // Si haces clic en el párrafo, primero saltará su alert y luego el del DIV
    divNaranja.addEventListener("click", mensajeDiv, false);
    parrafoBlanco.addEventListener("click", mensajeParrafo, false);
});

// MODO CAPTURING (captura): El evento se propaga desde el padre hacia el hijo
btnCapt.addEventListener("click", () => {
    eliminarEventos();
    tituloDiv.textContent = "CAPTURING:";

    // El tercer parámetro 'true' activa la fase de captura
    // Si haces clic en el párrafo, primero saltará el alert del DIV (padre) y luego el del párrafo 
    divNaranja.addEventListener("click", mensajeDiv, true);
    parrafoBlanco.addEventListener("click", mensajeParrafo, true);
});

// DESACTIVAR EVENTOS
btnStop.addEventListener("click", () => {
    eliminarEventos();
    tituloDiv.textContent = "EVENTO CLIC DESACTIVADO:";
});
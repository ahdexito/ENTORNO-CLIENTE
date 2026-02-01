const divNaranja = document.getElementById("myDiv");
const parrafoBlanco = document.getElementById("myP");
const tituloDiv = divNaranja.querySelector("h2");

const btnBub = document.getElementById("botBub");
const btnCapt = document.getElementById("botCapt");
const btnStop = document.getElementById("botStop");

function mensajeDiv() {
    alert("Has hecho clic en el naranja.");
}

function mensajeParrafo() {
    alert("Has hecho clic en el blanco.");
}

function eliminarEventos() {
    divNaranja.removeEventListener("click", mensajeDiv, false);
    divNaranja.removeEventListener("click", mensajeDiv, true);
    parrafoBlanco.removeEventListener("click", mensajeParrafo, false);
    parrafoBlanco.removeEventListener("click", mensajeParrafo, true);
}

btnBub.addEventListener("click", () => {
    eliminarEventos();
    tituloDiv.textContent = "BUBBLING:";

    divNaranja.addEventListener("click", mensajeDiv, false);
    parrafoBlanco.addEventListener("click", mensajeParrafo, false);
});

btnCapt.addEventListener("click", () => {
    eliminarEventos();
    tituloDiv.textContent = "CAPTURING:";

    divNaranja.addEventListener("click", mensajeDiv, true);
    parrafoBlanco.addEventListener("click", mensajeParrafo, true);
});

btnStop.addEventListener("click", () => {
    eliminarEventos();
    tituloDiv.textContent = "EVENTO CLIC DESACTIVADO:";
});
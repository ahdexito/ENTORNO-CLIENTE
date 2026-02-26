// EJERCICIO 1
const boton = document.getElementById("boton");
const texto = document.getElementById("texto");

boton.addEventListener("click", () => {
    texto.textContent = "¡El texto ha sido cambiado!";
});

// ----------------------------------------------------------

// EJERCICIO 2
const caja = document.getElementById("caja");

caja.onmouseover = function () {
    this.style.background = "lightgreen";
    caja.textContent = "¡El mouse está aquí!";
};

caja.onmouseout = function () {
    this.style.background = "lightblue";
    caja.textContent = "";
};

// ----------------------------------------------------------

// EJERCICIO 3
const contenedor = document.getElementById("contenedor");
const coordenadas = document.getElementById("coordenadas");

contenedor.onmouseover = function () {
    document.addEventListener("mousemove", e => {
        const cX = 0;
        const cY = 0;
    
        cX.value = e.clientX;
        cY.value = e.clientY;
    
        coordenadas.textContent = `Coordenadas: (${e.clientX}, ${e.clientY})`;
    });
}

contenedor.onmouseout = function () {
    document.addEventListener("mousemove", () => {
        coordenadas.textContent = "Coordenadas: (0, 0)";
    });
}

// ----------------------------------------------------------

// EJERCICIO 4
const contador = document.getElementById("contador");
const incrementar = document.getElementById("incrementar");
const decrementar = document.getElementById("decrementar");

incrementar.addEventListener("click", () => {
    let numero = parseInt(contador.textContent);
    contador.textContent = ++numero;
});

decrementar.addEventListener("click", () => {
    let numero = parseInt(contador.textContent);
    contador.textContent = --numero;
});
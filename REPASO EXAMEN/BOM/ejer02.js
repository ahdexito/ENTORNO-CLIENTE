/* COMPARAR EL ANCHO TOTAL DEL MONITOR CON EL 
ANCHO DE LA VENTANA DEL NAVEGADOR. SI LA VENTANA DEL
NAVEGADOR OCUPA MENOS DEL 50% DEL ANCHO DE LA PANTALLA, 
MUESTRA UN AVISO SUGIRIENDO MAXIMIZAR LA VENTANA */

let anchoPantalla = screen.width;
let anchoVentana = window.outerWidth;
let porcentajeOcupado = (anchoVentana / anchoPantalla) * 100;

console.log(`Tu monitor mide ${anchoPantalla}px`);
console.log(`Tu navegador ocupa ${anchoVentana}px (${porcentajeOcupado.toFixed(2)}).`);

if (porcentajeOcupado < 50) {
    alert("Tu ventana es muy pequeña. Maximiza para ver mejor el contenido.");
}

else {
    console.log("El tamaño de la ventana es óptimo.");
}
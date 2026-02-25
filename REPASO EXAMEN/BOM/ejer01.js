/* ABRIR VENTANA EMERGENTE DE 400x400px EN EL CENTRO DE LA PANTALLA
TRAS 5 SEGUNDOS, LA VENTANA SE MUEVE A LA ESQUINA SUPERIOR IZQUIERDA
TRAS OTROS 5, SE CIERRA AUTOMÁTICAMENTE. EN CONSOLA SE MOSTRARÁ EL
ESTADO DE LA VENTANA EN CADA PASO */

// Definir el tamaño de la ventana
const ancho = 400;
const alto = 400;

// Calcular la posición para que quede centrada
const posicionIzquierda = (screen.width / 2) - (ancho / 2);
const posicionSuperior = (screen.height / 2) - (alto / 2);

// Abrir la ventana con las coordenadas calculadas
let miVentana = window.open(
    "", 
    "VetanaTemporal", 
    `width=${ancho},height=${alto},left=${posicionIzquierda},top=${posicionSuperior}`);
console.log("Ventana abierta en el centro.");

setTimeout(() => {
    miVentana.moveTo(0, 0);
    console.log("Ventana movida a (0,0).");

    setTimeout(() => {
        miVentana.close();
        console.log("Ventana cerrada.");
    }, 5000);
}, 5000);
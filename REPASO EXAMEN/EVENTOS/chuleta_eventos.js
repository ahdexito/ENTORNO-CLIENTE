/**
 * LA GRAN CHULETA DE EVENTOS JS
 * Estructura: Patrón + Explicación + Código
 */

// --- 1. PROPIEDADES DEL OBJETO EVENT (e) ---
// El objeto 'e' nace cuando ocurre el evento.
document.addEventListener('click', (e) => {
    console.log("--- Propiedades Clave ---");
    console.log("Target:", e.target);           // ¿Quién recibió el clic físico?
    console.log("CurrentTarget:", e.currentTarget); // ¿Quién tiene el addEventListener? (el document en este caso)
    console.log("Tipo:", e.type);               // "click"
    console.log("Coordenada X:", e.clientX);    // Posición ratón respecto a ventana
});


// --- 2. CONTROL DE FLUJO (PREVENCIÓN Y PROPAGACIÓN) ---
const link = document.querySelector('a');

link.addEventListener('click', (e) => {
    // a) preventDefault: "¡Quieto! No hagas lo que haces por defecto"
    e.preventDefault(); // Evita que el link navegue a otra URL
    
    // b) stopPropagation: "¡Corta el rollo! No le digas a mis padres que me pulsaron"
    e.stopPropagation(); // El evento muere aquí, no sube al body o window
});


// --- 3. FASES Y CONFIGURACIÓN (EL TERCER PARÁMETRO) ---
// addEventListener(evento, funcion, opciones)

const btn = document.querySelector('#btn');

// Modo BURBUJEO (Default: false) - De adentro hacia afuera
btn.addEventListener('click', () => console.log("Burbuja"), false);

// Modo CAPTURA (true) - De afuera hacia adentro
btn.addEventListener('click', () => console.log("Captura"), true);

// Opciones modernas (Objeto)
btn.addEventListener('click', () => console.log("Solo una vez"), {
    once: true,      // Se autodestruye tras ejecutarse
    passive: true    // Mejora el rendimiento, prometes no usar preventDefault()
});


// --- 4. EVENTOS DE FORMULARIO (CLÁSICOS DE EXAMEN) ---
const formulario = document.querySelector('form');
const input = document.querySelector('input[type="text"]');

// SUBMIT: Se pone en el <form>, NO en el <button>
formulario.addEventListener('submit', (e) => {
    e.preventDefault(); // Imprescindible para validar con JS sin recargar página
    console.log("Validando...");
});

// INPUT vs CHANGE
input.addEventListener('input', (e) => {
    console.log("Escribiendo...", e.target.value); // Se dispara en CADA tecla
});

input.addEventListener('change', (e) => {
    console.log("Cambiado"); // Solo cuando el usuario sale del input (blur) o pulsa Enter
});


// --- 5. EVENTOS DE TECLADO ---
window.addEventListener('keydown', (e) => {
    console.log("Tecla pulsada:", e.key); // ej: "Enter", "ArrowUp", "a"
    console.log("Código físico:", e.code); // ej: "KeyA", "Digit1"
});


// --- 6. DELEGACIÓN DE EVENTOS (ESTRATEGIA PRO) ---
// Útil cuando tienes muchos elementos o elementos que se crean dinámicamente.
document.querySelector('#lista-padre').addEventListener('click', (e) => {
    // Si el clic ocurrió en un elemento con clase 'item'
    if (e.target.classList.contains('item')) {
        console.log("Hiciste clic en un hijo de la lista:", e.target.textContent);
    }
});


// --- 7. CICLO DE VIDA DEL DOM ---
// Úsalo para que tu código no falle si el HTML aún no existe
document.addEventListener('DOMContentLoaded', () => {
    console.log("1. El DOM está construido (HTML leído)");
});

window.addEventListener('load', () => {
    console.log("2. Todo cargado (Imágenes, CSS, fuentes...)");
});
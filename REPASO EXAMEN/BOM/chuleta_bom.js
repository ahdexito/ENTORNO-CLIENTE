/**
 * BOM: Interacción con el navegador
 */

// --- EL OBJETO WINDOW (Global) ---
window.innerHeight; // Altura del viewport (lo que se ve)
window.innerWidth;  // Anchura del viewport
window.open('url');  // Abre una nueva pestaña
window.close();      // Cierra la pestaña actual

// --- OBJETO LOCATION (La URL actual) ---
// URL: https://www.ejemplo.com:8080/search?q=js#result
console.log(location.href);     // La URL completa
console.log(location.hostname); // "www.ejemplo.com"
console.log(location.pathname); // "/search"
console.log(location.protocol); // "https:"
console.log(location.search);   // "?q=js" (parámetros)
// location.reload();           // Recarga la página
// location.assign('url');      // Navega a una nueva URL

// --- OBJETO HISTORY (Navegación del usuario) ---
history.back();    // Atrás
history.forward(); // Adelante
history.go(-2);    // Va 2 páginas atrás en el historial

// --- OBJETO NAVIGATOR (Información del navegador) ---
console.log(navigator.userAgent); // Info del navegador y SO
console.log(navigator.language);  // Idioma (ej: "es-ES")
console.log(navigator.onLine);    // Boolean: ¿tiene internet?

// --- OBJETO SCREEN (Pantalla física) ---
console.log(screen.width);  // Ancho total de la pantalla del monitor
console.log(screen.height); // Alto total

// --- TEMPORIZADORES (Window Methods) ---
const timer = setTimeout(() => {
    console.log("Se ejecuta una vez a los 2 segundos");
}, 2000);
clearTimeout(timer); // Cancela el timeout

const interval = setInterval(() => {
    console.log("Se ejecuta cada 3 segundos");
}, 3000);
clearInterval(interval); // Detiene el intervalo
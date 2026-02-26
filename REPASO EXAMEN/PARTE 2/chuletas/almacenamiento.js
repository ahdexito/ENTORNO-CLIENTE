/**
 * CHULETA JS: ALMACENAMIENTO (Basado en el tema 7.5)
 * Métodos para persistir datos en el navegador del usuario.
 */

// 1. COOKIES (La forma clásica)
// Datos pequeños (max 4KB) que se envían al servidor en cada petición.
// Formato: "nombre=valor; expires=fecha; path=ruta"

// Crear/Modificar una cookie (expira en 1 hora)
const fecha = new Date();
fecha.setTime(fecha.getTime() + (1 * 60 * 60 * 1000));
document.cookie = "usuario=Juan; expires=" + fecha.toUTCString() + "; path=/";

// Leer todas las cookies
console.log("Todas las cookies:", document.cookie);

// Borrar una cookie (poniendo una fecha pasada)
document.cookie = "usuario=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";


// 2. WEB STORAGE (localStorage y sessionStorage)
// API moderna con más capacidad (5-10MB) y más fácil de usar.

// A) localStorage: Persiste incluso al cerrar el navegador.
localStorage.setItem("tema", "oscuro");       // Guardar
const tema = localStorage.getItem("tema");    // Leer
localStorage.removeItem("tema");             // Borrar uno
localStorage.clear();                        // Borrar todo

// B) sessionStorage: Se borra al cerrar la pestaña.
sessionStorage.setItem("sesionId", "12345");
console.log(sessionStorage.getItem("sesionId"));


// 3. ALMACENAMIENTO DE OBJETOS (JSON)
// Como Storage solo guarda strings, usamos JSON.stringify y JSON.parse.
const configuracion = { idioma: "es", volumen: 80 };

localStorage.setItem("config", JSON.stringify(configuracion)); // Guardar objeto
const datos = JSON.parse(localStorage.getItem("config"));      // Recuperar objeto
console.log(datos.idioma); // "es"


// 4. INDEXEDDB (Almacenamiento Avanzado)
// Base de datos NoSQL en el navegador para grandes cantidades de datos estructurados.
const request = indexedDB.open("MiBaseDeDatos", 1);

request.onsuccess = (event) => {
    const db = event.target.result;
    console.log("Base de datos abierta con éxito");
};


// 5. AUTENTICACIÓN CON JWT (JSON Web Token)
// Flujo típico de uso de almacenamiento para seguridad:

async function login(user, pass) {
    const response = await fetch("https://api.ejemplo.com/login", {
        method: "POST",
        body: JSON.stringify({ user, pass })
    });
    
    const data = await response.json();
    
    // Guardamos el token recibido en localStorage
    if (data.token) {
        localStorage.setItem("jwt_token", data.token);
    }
}

// Usar el token en peticiones protegidas (Headers)
async function obtenerPerfil() {
    const token = localStorage.getItem("jwt_token");
    
    const response = await fetch("https://api.ejemplo.com/perfil", {
        headers: {
        "Authorization": `Bearer ${token}` // Estándar para enviar el JWT
        }
    });
}
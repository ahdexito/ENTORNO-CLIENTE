/**
 * CHULETA JS: ASINCRONÍA Y AJAX (Basado en el tema 7.4)
 * Permite procesar solicitudes al servidor en segundo plano sin recargar la página
 */

// 1. CALLBACKS (La forma clásica)
// Funciones que se pasan como parámetro para ejecutarse al finalizar una tarea
function obtenerDatos(callback) {
    console.log("Solicitando datos...");
    setTimeout(() => {
        const datos = { nombre: "Ana", edad: 25 };
        callback(datos); // Se llama al terminar la espera
    }, 2000);
}

obtenerDatos((resultado) => {
    console.log("Datos recibidos via callback:", resultado);
});


// 2. PROMESAS (Mecanismo moderno)
// Representan un valor que estará disponible en el futuro (o no)
// Estados: pending (pendiente), fulfilled (resuelta), rejected (rechazada)

const miPromesa = new Promise((resolve, reject) => {
    const exito = true;
    if (exito) {
        resolve("¡Operación exitosa!"); // Pasa a estado fulfilled
    } else {
        reject("Hubo un error"); // Pasa a estado rejected
    }
});

// Consumo de Promesas con .then() y .catch()
miPromesa
    .then(valor => console.log(valor))    // Se ejecuta si se resuelve
    .catch(error => console.error(error)) // Se ejecuta si falla
    .finally(() => console.log("Fin"));   // Se ejecuta siempre al terminar


// 3. ASYNC / AWAIT (Sintaxis simplificada ES2017)
// Permite escribir código asíncrono que parece síncrono
async function procesarTarea() {
    try {
        // 'await' pausa la ejecución hasta que la promesa se resuelve
        const resultado = await miPromesa; 
        console.log("Resultado con await:", resultado);
    } catch (error) {
        console.error("Error capturado:", error);
    }
}
// Nota: Una función async siempre devuelve una Promesa


// 4. PETICIONES HTTP CON FETCH API
// Fetch es el estándar moderno basado en promesas que sustituye a XMLHttpRequest
async function realizarPeticion() {
    try {
        const respuesta = await fetch("https://api.ejemplo.com/datos");
        
        // IMPORTANTE: fetch() no falla en errores 404 o 500, hay que revisar .ok
        if (!respuesta.ok) {
        throw new Error("Error en la petición: " + respuesta.status);
        }
        
        const datos = await respuesta.json(); // Convierte el JSON recibido
        console.log("Datos de la API:", datos);
    } catch (error) {
        console.error("Fallo de red o servidor:", error);
    }
}


// 5. CONCURRENCIA: PROMISE.ALL
// Útil para realizar varias peticiones a la vez y esperar a que todas terminen
async function multiplesPeticiones() {
    const [res1, res2] = await Promise.all([
        fetch("url1"),
        fetch("url2")
    ]);
}
/**
 * CHULETA JS: JSON (Basado en el tema 7.3)
 * Formato ligero de intercambio de datos, nativo en JavaScript.
 */

// 1. ESTRUCTURA JSON
// Es una colección de pares clave/valor (objetos) o listas ordenadas (arrays).
// IMPORTANTE: En un archivo .json, las claves y strings DEBEN usar comillas dobles "".
const jsonEjemplo = {
    "nombre": "Richard",
    "edad": 33,
    "hobbies": ["Biking", "Gaming"],
    "esEstudiante": false,
    "direccion": { "ciudad": "Portland" }
};


// 2. SERIALIZACIÓN (De Objeto a String)
// Útil para enviar datos al servidor.
const usuario = { id: 1, nombre: "Ana" };

const usuarioJSON = JSON.stringify(usuario); 
console.log(usuarioJSON); // '{"id":1,"nombre":"Ana"}'


// 3. DESERIALIZACIÓN (De String a Objeto)
// Útil para procesar datos que llegan del servidor.
const respuestaServidor = '{"status": "ok", "code": 200}';

const objetoJS = JSON.parse(respuestaServidor);
console.log(objetoJS.status); // "ok"


// 4. HERRAMIENTAS DE PRUEBA: JSONPlaceholder
// API falsa gratuita para practicar peticiones sin tener un servidor propio.
// Ejemplo de uso con fetch para obtener un JSON:
async function testJSON() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const post = await res.json(); // .json() aplica JSON.parse internamente
    console.log(post.title);
}


// 5. CREACIÓN DE APIS RÁPIDAS (JSON Server)
// Herramienta para crear una API REST falsa en segundos usando un archivo .json.
/* Pasos en terminal:
1. npm install -g json-server
2. Crear db.json con datos.
3. json-server --watch db.json
*/


// 6. BACKEND PROFESIONAL: EXPRESS
// Framework de Node.js para crear APIs reales y escalables.
/*
Estructura básica de un endpoint que devuelve JSON:
*/
const express = require('express');
const app = express();

app.get('/api/usuario', (req, res) => {
    res.json({
        nombre: "Usuario Real",
        rol: "Admin"
    });
});

app.listen(3000);


// 7. CLIENTE DE PRUEBAS: POSTMAN
// Se utiliza para realizar peticiones HTTP (GET, POST, etc.) a nuestras APIs
// y verificar que el JSON que recibimos o enviamos es correcto.
/* 
Estructura sugerida (y la más común en examen)

index.html: Solo contiene el esqueleto (formularios y el contenedor donde pintarás).

src/models/Mago.js: Solo la Clase (el molde).

src/services/api.js: Las funciones que el profesor ya te da (los fetch).

src/main.js: El "cerebro". Aquí importas todo lo anterior, escuchas el formulario y mandas a pintar.
*/

// -------------------------------------------------------------------

/* 
1. El Molde (src/models/Mago.js)
Este archivo solo exporta la clase.
*/
export class Mago {
    constructor(nombre, casa) {
        this.nombre = nombre;
        this.casa = casa;
        this.serie = "HP"; // Lo prefijamos para cumplir la temática
    }
}

// -------------------------------------------------------------------

/* 
2. La API (src/services/api.js)
Este es el archivo que el profesor ya te daría. 
No tienes que tocarlo, solo saber qué hay dentro.
*/
const URL = "http://localhost:3000/personajes";

// Función ya creada para traer datos
export async function obtenerPersonajes() {
    const res = await fetch(URL);
    return await res.json();
}

// Función ya creada para insertar
export async function insertarPersonaje(objeto) {
    await fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(objeto)
    });
}

// -------------------------------------------------------------------

/* 
3. El Cerebro (src/main.js)
Aquí es donde tú escribes la lógica del examen. 
Unes la clase con la API y el HTML.
*/
// 1. IMPORTAR lo necesario
import { Mago } from './models/Mago.js';
import { obtenerPersonajes, insertarPersonaje } from './services/api.js';

// 2. SELECCIONAR elementos del DOM
const form = document.querySelector('#mago-form');
const listado = document.querySelector('#lista-magos');

// 3. FUNCIÓN PARA PINTAR (La creas tú)
async function pintar() {
    const datos = await obtenerPersonajes(); // Llamas a la API del profe
    listado.innerHTML = ''; // Limpias la pantalla
    
    datos.filter(m => m.serie === "HP").forEach(m => {
        const p = document.createElement('p');
        p.textContent = `${m.nombre} - ${m.casa}`;
        listado.appendChild(p);
    });
}

// 4. EVENTO DEL FORMULARIO
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Creas el objeto con la Clase
    const nuevoMago = new Mago(form.nombre.value, form.casa.value);
    
    // Usas la API del profe para guardar
    await insertarPersonaje(nuevoMago);
    
    // Refrescas la pantalla
    pintar();
    form.reset();
});

// 5. CARGA INICIAL
pintar();

// -------------------------------------------------------------------

/*
Muy importante para el examen:
Si el código está separado en archivos, 
en tu index.html la etiqueta <script> debe ser así:
*/
<script type="module" src="./src/main.js"></script>
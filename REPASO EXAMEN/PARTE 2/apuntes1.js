/**
 * EXAMEN DAW: GESTIÓN DE PERSONAJES (HARRY POTTER)
 * Arquitectura: Clase -> Fetch/XHR -> Formulario -> Render
 */

// -------------------------------------------------------------------------
// 1. EL MODELO (CLASE PERSONAJE)
// -------------------------------------------------------------------------
export class Mago {
    constructor(nombre, casa, serie = "HP") {
        this.id = Date.now(); // Genera un ID único basado en el tiempo
        this.nombre = nombre;
        this.casa = casa;     // Ejemplo: Gryffindor, Slytherin...
        this.serie = serie;   // Valor fijo según la temática del examen
    }

    // Método opcional por si piden "mostrar descripción"
    presentarse() {
        return `Soy ${this.nombre} y pertenezco a ${this.casa}`;
    }
}

// -------------------------------------------------------------------

// -------------------------------------------------------------------------
// 2. PETICIONES API (SERVICES)
// -------------------------------------------------------------------------
const API_URL = "http://localhost:3000/personajes";

/**
 * OPCIÓN A: FETCH (Asíncrono moderno)
 * Se usa para traer datos (GET) o insertar (POST)
 */
async function apiFetch_Insertar(mago) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(mago)
        });
        
        if (!response.ok) throw new Error("Fallo en la conexión con el Ministerio");
        
        const data = await response.json();
        console.log("Éxito Fetch: Personaje insertado", data);
        return data;
    } catch (error) {
        console.error("Error:", error.message);
    }
}

/**
 * OPCIÓN B: XMLHttpRequest (El método antiguo que suele pedir el profe)
 * Solo se usa si el enunciado dice explícitamente "XHR"
 */
function apiXHR_Insertar(mago) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", API_URL, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        // readyState 4 = petición terminada | status 201 = objeto creado
        if (xhr.readyState === 4) {
            if (xhr.status === 201) {
                console.log("Éxito XHR:", JSON.parse(xhr.responseText));
                alert("Mago enviado a la API mediante XHR");
            } else {
                console.error("Error en XHR");
            }
        }
    };

    xhr.send(JSON.stringify(mago));
}

// -------------------------------------------------------------------

// -------------------------------------------------------------------------
// 3. VISTA (RENDERIZADO)
// -------------------------------------------------------------------------
function pintarMagos(lista) {
    const grid = document.getElementById('grid-personajes');
    grid.innerHTML = ''; // Limpiar antes de pintar

    lista.forEach(mago => {
        const card = document.createElement('div');
        card.className = 'mago-card';
        
        // Ejemplo de cambio de estilo dinámico (requisito habitual)
        if (mago.casa === 'Gryffindor') card.style.border = "2px solid red";
        if (mago.casa === 'Slytherin') card.style.border = "2px solid green";

        card.innerHTML = `
            <h3>${mago.nombre}</h3>
            <p>Casa: ${mago.casa}</p>
            <p>Universo: ${mago.serie}</p>
        `;
        grid.appendChild(card);
    });
}

// -------------------------------------------------------------------

// -------------------------------------------------------------------------
// 4. CONTROLADOR (CAPTURA DEL FORMULARIO)
// -------------------------------------------------------------------------
document.getElementById('mago-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // Capturar valores de los inputs
    const nombre = document.getElementById('input-nombre').value;
    const casa = document.getElementById('select-casa').value;

    // VALIDACIÓN BÁSICA (Suele dar puntos extra)
    if (nombre.trim() === "") return alert("El nombre es obligatorio");

    // CREAR INSTANCIA DE CLASE (¡OBLIGATORIO!)
    const nuevoMago = new Mago(nombre, casa);

    // ENVIAR A LA API (Elige Fetch o XHR según pida el examen)
    await apiFetch_Insertar(nuevoMago);
    
    // RECARGAR LISTA (Para ver el cambio inmediatamente)
    const listaActualizada = await obtenerTodos();
    pintarMagos(listaActualizada);

    e.target.reset(); // Limpiar formulario
});

/**
 * Función auxiliar para obtener todos los personajes
 */
async function obtenerTodos() {
    const res = await fetch(API_URL);
    return await res.json();
}
/* 
1. ¿Cómo encontrar y entender las funciones de la API?
Busca archivos llamados api.js, services.js o magoProvider.js. 
Verás funciones exportadas. Lo más importante es fijarte en qué 
reciben y qué devuelven.

Si usan async/await: Devuelven una Promesa. Debes usarlas con await o .then().

Si son para insertar: Esperarán un Objeto (tu instancia de la clase).
*/

// -------------------------------------------------------------------

/* 
2. Chuleta: Cómo usar las funciones "Ya creadas"
Imagina que en el archivo api.js que te dan, existe una función 
llamada insertarPersonaje(obj). Así es como debes usarla en tu código:
*/
import { insertarPersonaje, obtenerPersonajes } from './api.js'; // 1. Importar siempre
import { Mago } from './Mago.js';

// --- CASO A: Insertar desde un formulario ---
const form = document.getElementById('mago-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 2. Recoger datos y crear el objeto con tu CLASE
    const nuevoMago = new Mago(
        document.getElementById('nom').value,
        document.getElementById('casa').value
    );

    // 3. LLAMAR A LA FUNCIÓN DE LA API (la que ya te dan)
    try {
        await insertarPersonaje(nuevoMago); // La invocas y esperas a que termine
        alert("¡Mago insertado!");
        
        // 4. Refrescar la lista automáticamente
        await cargarYDibujar(); 
    } catch (error) {
        console.error("Error al usar la API del profe:", error);
    }
});

// -------------------------------------------------------------------

/*
3. El ciclo de vida de los datos (Lo que harás en el examen)
El examen suele ser un círculo: Pintar -> Insertar -> Volver a pintar.
*/
// Función que coordina todo (llámala al cargar la página)
async function cargarYDibujar() {
    // 1. Llamas a la función de la API que te dan para traer datos
    const magos = await obtenerPersonajes(); 
    
    // 2. Filtras si el profe lo pide (ej: solo Harry Potter)
    const soloHP = magos.filter(m => m.serie === "HP");

    // 3. Llamas a tu función de pintar (la que tú creas)
    renderizar(soloHP);
}

// -------------------------------------------------------------------

/*
4. Resumen de Comandos de Terminal (Imprescindible)
Nada más abrir el proyecto del profesor, haz esto en la terminal de VS Code:

1. Instalar dependencias:
    npm install (Esto creará la carpeta node_modules).

2. Arrancar la API (el mock):
    Mira el archivo package.json. Si ves una línea que dice "json-mock": "...", escribe:
    npm run json-mock

3. Arrancar el proyecto (Vite):
    Abre otra terminal (no cierres la de la API) y escribe:
    npm run dev

4. Abrir el navegador:
    Haz Ctrl + Clic en el enlace que te salga (normalmente http://localhost:5173).
*/
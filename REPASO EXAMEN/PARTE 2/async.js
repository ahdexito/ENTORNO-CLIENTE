/**
 * Definición de la función asíncrona.
 * La palabra clave 'async' indica que dentro de esta función 
 * se podrán pausar operaciones usando 'await'.
 */
async function cargarUsuarios() {
    const listaUI = document.getElementById('lista');

    // Feedback visual inicial para mejorar la experiencia de usuario
    listaUI.innerHTML = "<li>Cargando con Async/Await...</li>";

    /**
     * El bloque try-catch es fundamental aquí. 
     * Agrupa toda la lógica que podría fallar (red, servidor o formato de datos).
     */
    try {
        /**
         * 1. await fetch(...): 
         * El código se "detiene" en esta línea hasta que el servidor responde.
         * No bloquea el navegador, solo la ejecución de esta función.
         */
        const respuesta = await fetch('datos.php');

        /**
         * 2. Validación de la respuesta HTTP:
         * Verificamos si el servidor devolvió un error (como 404 o 500).
         */
        if (!respuesta.ok) {
            // Si hay error, saltamos directamente al bloque 'catch'
            throw new Error(`Error en la petición: ${respuesta.status}`);
        }

        /**
         * 3. await respuesta.json():
         * Esperamos a que el cuerpo de la respuesta se convierta en un objeto JS.
         */
        const usuarios = await respuesta.json();

        // Si llegamos aquí, los datos son correctos. Limpiamos la lista.
        listaUI.innerHTML = "";

        // 4. Renderizado de los datos en el DOM
        usuarios.forEach(usuario => {
            const li = document.createElement('li');
            // Usamos Template Literals para una sintaxis limpia
            li.textContent = `ID: ${usuario.id} - Nombre: ${usuario.nombre} - Edad: ${usuario.edad}`;
            listaUI.appendChild(li);
        });
    }

    catch (error) {
        /**
         * 5. Gestión de errores:
         * Captura fallos de red, errores 404/500 lanzados arriba o JSON mal formado.
         */
        console.error("Fallo al cargar usuarios:", error.message);
        listaUI.innerHTML = `<li>Error: ${error.message}</li>`;
    }
}

/**
 * Evento de inicialización:
 * Separamos la lógica de la petición (cargarUsuarios) del evento del DOM.
 */
document.addEventListener('DOMContentLoaded', () => {
    const btnCargar = document.getElementById('btnCargar');
    
    // Pasamos la referencia de la función asíncrona al evento click
    btnCargar.addEventListener('click', cargarUsuarios);
});
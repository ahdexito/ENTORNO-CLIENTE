/**
 * Se asegura de que el HTML esté cargado antes de ejecutar el JS.
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // Referencias a los elementos del DOM
    const btnCargar = document.getElementById('btnCargar');
    const listaUI = document.getElementById('lista');

    // Evento click para iniciar la petición
    btnCargar.addEventListener('click', () => {
        
        // Feedback visual inmediato
        listaUI.innerHTML = "<li>Cargando con Fetch (.then)...</li>";

        /**
         * 1. fetch('datos.php'): 
         * Inicia una petición HTTP GET por defecto. Devuelve una Promesa.
         */
        fetch('datos.php')
            
            /**
             * 2. Primer .then(): Se ejecuta cuando recibimos la respuesta inicial (cabeceras).
             * Aquí verificamos si la comunicación con el servidor fue exitosa.
             */
            .then(respuesta => {
                // respuesta.ok es true si el status está entre 200 y 299
                if (!respuesta.ok) {
                    // Si hay error (ej. 404 o 500), lanzamos un error para que lo capture el .catch()
                    throw new Error(`Error: ${respuesta.status} ${respuesta.statusText}`);
                }

                /**
                 * respuesta.json() es otro método que devuelve una Promesa.
                 * Se encarga de leer el cuerpo de la respuesta y parsearlo como JSON.
                 */
                return respuesta.json();
            })
            
            /**
             * 3. Segundo .then(): Se ejecuta cuando el JSON ya ha sido procesado 
             * y está listo para usarse como un objeto/array de JavaScript.
             */
            .then(usuarios => {
                // Limpiamos el mensaje de "Cargando..."
                listaUI.innerHTML = "";

                // Recorremos el array de usuarios obtenido del servidor
                usuarios.forEach(usuario => {
                    const li = document.createElement('li');
                    
                    // Construimos el contenido del ítem de lista
                    li.textContent = `ID: ${usuario.id} - Nombre: ${usuario.nombre} - Edad: ${usuario.edad}`;
                    
                    // Insertamos el elemento en la interfaz
                    listaUI.appendChild(li);
                });
            })
            
            /**
             * 4. .catch(): El bloque de seguridad.
             * Captura cualquier error ocurrido en los pasos anteriores:
             * - Problemas de red (sin internet).
             * - Errores lanzados manualmente con 'throw'.
             * - Errores de sintaxis si el JSON del servidor está mal formado.
             */
            .catch(error => {
                console.error("Fallo en la obtención de usuarios:", error);
                listaUI.innerHTML = `<li>No se pudo conectar con el servidor</li>`;
            });
    });
});
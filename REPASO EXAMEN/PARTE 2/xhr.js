/**
 * Esperamos a que el DOM esté completamente cargado para evitar 
 * errores al intentar acceder a elementos que aún no existen.
 */
document.addEventListener('DOMContentLoaded', () => {

    // 1. Captura de elementos de la Interfaz de Usuario (UI)
    const btnCargar = document.getElementById('btnCargar');
    const listaUI = document.getElementById('lista');

    // 2. Asignación del evento 'click' al botón
    btnCargar.addEventListener('click', () => {
        
        // Feedback visual: indicamos al usuario que la petición está en curso
        listaUI.innerHTML = "<li>Cargando...</li>";

        // 3. Instancia del objeto XMLHttpRequest (Cimiento de AJAX)
        const xhr = new XMLHttpRequest();

        /**
         * Configuración de la petición:
         * - 'GET': Método para solicitar datos.
         * - 'datos.php': El archivo en el servidor que nos devolverá el JSON.
         * - true: Indica que la petición será asíncrona (no bloquea el navegador).
         */
        xhr.open('GET', 'datos.php', true);

        /**
         * onreadystatechange se ejecuta cada vez que el estado de la petición cambia.
         * Existen 5 estados (del 0 al 4).
         */
        xhr.onreadystatechange = function () {
            
            // Estado 4: Significa 'DONE' (La operación se ha completado)
            if (xhr.readyState === 4) {
                
                // Código de estado HTTP 200: Significa que el servidor respondió con éxito
                if (xhr.status === 200) {
                    try {
                        /**
                         * JSON.parse convierte el texto plano (string) que viene del 
                         * servidor en un objeto o array de JavaScript manipulable.
                         */
                        const usuarios = JSON.parse(xhr.responseText);
                        
                        // Limpiamos el mensaje de "Cargando..." antes de mostrar los datos
                        listaUI.innerHTML = "";

                        // Iteramos sobre el array de usuarios recibidos
                        usuarios.forEach(usuario => {
                            // Creamos un nuevo elemento de lista <li> por cada usuario
                            const li = document.createElement('li');
                            
                            // Insertamos los datos usando Template Literals (comillas invertidas)
                            li.textContent = `ID: ${usuario.id} - Nombre: ${usuario.nombre} - Edad: ${usuario.edad}`;
                            
                            // Agregamos el <li> al contenedor <ul> o <ol> en el HTML
                            listaUI.appendChild(li);
                        });

                    } catch (error) {
                        /**
                         * Si el servidor no devuelve un JSON válido (por ejemplo, devuelve 
                         * un error de PHP), el bloque catch capturará el fallo de parseo.
                         */
                        console.error("Error al procesar el JSON:", error);
                        listaUI.innerHTML = "<li>Error en el formato de datos.</li>";
                    }
                } 
                else {
                    /**
                     * Manejo de errores de red o servidor (ej: 404 No encontrado o 500 Error interno)
                     */
                    console.error("Fallo en la obtención de usuarios. Status:", xhr.status, xhr.statusText);
                    listaUI.innerHTML = "<li>Error al conectar con el servidor.</li>";
                }
            }
        };

        // 4. Envío de la petición
        // Hasta que no se ejecuta .send(), la comunicación no inicia.
        xhr.send();
    });
});
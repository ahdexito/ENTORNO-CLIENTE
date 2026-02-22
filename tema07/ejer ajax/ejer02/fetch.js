document.addEventListener('DOMContentLoaded', () => {
    const btnCargar = document.getElementById('btnCargar');
    const listaUI = document.getElementById('lista');

    btnCargar.addEventListener('click', () => {
        listaUI.innerHTML = "<li>Cargando con Fetch (.then)...</li>";

        fetch('datos.php')
            .then(respuesta => {
                if (!respuesta.ok) {
                    throw new Error(`Error: ${respuesta.status} ${respuesta.statusText}`);
                }

                return respuesta.json();
            })
            .then(usuarios => {
                listaUI.innerHTML = "";

                usuarios.forEach(usuario => {
                    const li = document.createElement('li');
                    li.textContent = `ID: ${usuario.id} - Nombre: ${usuario.nombre} - Edad: ${usuario.edad}`;
                    listaUI.appendChild(li);
                });
            })
            .catch(error => {
                console.error("Fallo en la obtención de usuarios:", error);
                listaUI.innerHTML = `<li>No se pudo conectar con el servidor</li>`;
            });
    });
});
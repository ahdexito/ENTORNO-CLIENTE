async function cargarUsuarios() {
    const listaUI = document.getElementById('lista');

    listaUI.innerHTML = "<li>Cargando con Async/Await...</li>";

    try {
        const respuesta = await fetch('datos.php');

        if (!respuesta.ok) {
            throw new Error(`Error en la petición: ${respuesta.status}`);
        }

        const usuarios = await respuesta.json();

        listaUI.innerHTML = "";

        usuarios.forEach(usuario => {
            const li = document.createElement('li');
            li.textContent = `ID: ${usuario.id} - Nombre: ${usuario.nombre} - Edad: ${usuario.edad}`;
            listaUI.appendChild(li);
        });
    }

    catch (error) {
        console.error("Fallo al cargar usuarios:", error.message);
        listaUI.innerHTML = `<li>Error: ${error.message}</li>`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const btnCargar = document.getElementById('btnCargar');
    btnCargar.addEventListener('click', cargarUsuarios);
});
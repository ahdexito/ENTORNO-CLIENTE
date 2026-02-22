document.addEventListener('DOMContentLoaded', () => {
    const btnCargar = document.getElementById('btnCargar');
    const listaUI = document.getElementById('lista');

    btnCargar.addEventListener('click', () => {
        listaUI.innerHTML = "Cargando...";

        const xhr = new XMLHttpRequest();

        xhr.open('GET', 'datos.php', true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        const usuarios = JSON.parse(xhr.responseText);
                        
                        listaUI.innerHTML = "";

                        usuarios.forEach(usuario => {
                            const li = document.createElement('li');
                            li.textContent = `ID: ${usuario.id} - Nombre: ${usuario.nombre} - Edad: ${usuario.edad}`;
                            listaUI.appendChild(li);
                        });
                    }

                    catch (error) {
                        console.error("Error al procesar el JSON:", error);
                    }
                }

                else {
                    console.error("Fallo en la obtención de usuarios. Status:", xhr.status, xhr.statusText);
                    listaUI.innerHTML = "<li>Error al cargar los usuarios</li>";
                }
            }
        };

        xhr.send();
    });
});
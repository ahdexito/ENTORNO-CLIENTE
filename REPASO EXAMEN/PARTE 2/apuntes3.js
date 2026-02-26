/*
1. La Clase Mago (Tu "molde" de datos)
Aunque la API esté creada, tú debes crear el objeto 
con una Clase antes de enviarlo.
*/
// Definimos la clase Mago
export class Mago {
    // El constructor se ejecuta al hacer "new Mago(...)"
    constructor(nombre, casa, varita) {
        this.id = Date.now(); // Genera un ID usando la fecha actual (milisegundos)
        this.nombre = nombre;  // Asigna el nombre recibido al objeto
        this.casa = casa;      // Asigna la casa (Gryffindor, etc.)
        this.varita = varita;  // Asigna el tipo de varita
        this.serie = "HP";     // Marcamos que es de la temática Harry Potter
    }

    // Un método para que el profesor vea que sabes usar lógica de clase
    describir() {
        return `${this.nombre} es un mago de ${this.casa}.`;
    }
}

// -------------------------------------------------------------------

/*
2. Cómo usar las Funciones de la API (Si ya te las dan)
Supongamos que en el archivo del profesor hay una función apiInsertar(personaje).
*/
// Paso 1: Importar la función del archivo que te dé el profe
import { apiInsertar } from './api.js'; 
import { Mago } from './Mago.js';

// Paso 2: Escuchar el evento del formulario
document.getElementById('magoForm').addEventListener('submit', async (evento) => {
    evento.preventDefault(); // Evita que la página se recargue y pierdas los datos

    // Paso 3: Recoger los datos de los inputs del HTML
    const nom = document.getElementById('inputNombre').value;
    const cas = document.getElementById('selectCasa').value;
    const varit = document.getElementById('inputVarita').value;

    // Paso 4: Crear la instancia de la clase (EL PASO MÁS IMPORTANTE)
    const nuevoMago = new Mago(nom, cas, varit);

    // Paso 5: Llamar a la función del profe usando await (porque es asíncrona)
    try {
        await apiInsertar(nuevoMago); // Enviamos nuestro objeto "nuevoMago" a la API
        alert("¡Mago registrado en el Ministerio!"); // Mensaje de éxito
        actualizarPantalla(); // Llamamos a una función para refrescar la lista
    } catch (error) {
        console.error("La API ha fallado:", error); // Por si el servidor está apagado
    }
});

// -------------------------------------------------------------------

/*
3. Petición XHR (Si te obligan a escribirla desde cero)
Si el profe te pide que NO uses la función de la API y que escribas un XMLHttpRequest.
*/
function enviarConXHR(magoObjeto) {
    // 1. Crear el objeto de la petición
    const xhr = new XMLHttpRequest();

    // 2. Configurar: Método POST, URL de la API, y True para que sea asíncrono
    xhr.open("POST", "http://localhost:3000/personajes", true);

    // 3. Indicar que enviamos un JSON (OBLIGATORIO)
    xhr.setRequestHeader("Content-Type", "application/json");

    // 4. Definir qué hacer cuando la respuesta llegue
    xhr.onreadystatechange = function () {
        // readyState 4 significa que la petición ha terminado
        // status 201 significa que el objeto se ha creado con éxito
        if (xhr.readyState === 4 && xhr.status === 201) {
            const respuesta = JSON.parse(xhr.responseText); // Convertir texto a objeto JS
            console.log("Servidor dice:", respuesta);
            alert("¡Personaje insertado via XHR!");
        }
    };

    // 5. Convertir nuestro objeto Mago a texto JSON y enviarlo
    xhr.send(JSON.stringify(magoObjeto));
}

// -------------------------------------------------------------------

/* 
4. Renderizado y Filtro (Pintar en el HTML)
Suele ser la parte final: traer los datos y ponerlos bonitos.
*/
// Esta función se encarga de "dibujar" los magos en el navegador
function renderizarMagos(arrayDeMagos) {
    const contenedor = document.getElementById('lista-magos');
    contenedor.innerHTML = ''; // Borramos lo que hubiera antes para no duplicar

    // Filtramos para quedarnos solo con los de Harry Potter (serie === "HP")
    const filtrados = arrayDeMagos.filter(m => m.serie === "HP");

    // Recorremos el array filtrado
    filtrados.forEach(mago => {
        // Creamos un elemento div para la tarjeta
        const card = document.createElement('div');
        card.className = 'mago-item'; // Le damos una clase CSS

        // Rellenamos el interior con los datos del mago
        // Usamos backticks (`) para poder meter variables con ${}
        card.innerHTML = `
            <h3>${mago.nombre}</h3>
            <p>Casa: <strong>${mago.casa}</strong></p>
            <p>Varita: ${mago.varita}</p>
            <button class="btn-borrar" data-id="${mago.id}">Expulsar</button>
        `;

        // Añadimos la tarjeta al contenedor principal del HTML
        contenedor.appendChild(card);
    });
}

// -------------------------------------------------------------------

/* 
Resumen de qué mirar en el examen:
1. ¿Qué devuelve la función de la API? 
    Si la función del profe hace return fetch(...).then(res => res.json()), 
    tú tienes que usar const datos = await funcionDelProfe().

2. ¿Qué nombres usa el JSON? 
    Si en el db.json pone "name", en tu clase no 
    pongas this.nombre, pon this.name. Deben coincidir.

3. Terminal:
    npm install (Solo una vez al empezar).
    npm run json-mock (Para encender la base de datos).
    npm run dev (Para encender la web).
*/
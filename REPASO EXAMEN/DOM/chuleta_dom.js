/**
 * DOM: Manipulación del HTML
 */

// --- SELECCIÓN DE ELEMENTOS ---
document.getElementById('id');           // El más rápido, devuelve 1 elemento
document.getElementsByClassName('clase'); // Devuelve HTMLCollection (array-like)
document.getElementsByTagName('div');    // Por etiqueta
document.querySelector('.clase');        // Devuelve el PRIMERO que coincida
document.querySelectorAll('.clase');     // Devuelve TODOS (NodeList estable)

// --- CREACIÓN Y MOVIMIENTO ---
const nuevoDiv = document.createElement('div');
const texto = document.createTextNode('Hola Mundo');
nuevoDiv.appendChild(texto); // Mete el texto dentro del div

const padre = document.getElementById('padre');
padre.appendChild(nuevoDiv);      // Añade al final
padre.insertBefore(nuevoDiv, ref); // Añade antes de un elemento de referencia
// nuevoDiv.remove();             // Elimina el elemento del DOM

// --- ATRIBUTOS Y CLASES ---
const img = document.querySelector('img');
img.setAttribute('src', 'foto.jpg'); // Cambia o crea atributo
img.getAttribute('src');             // Lee atributo
img.removeAttribute('alt');          // Borra atributo

img.classList.add('nueva-clase');    // Añade clase
img.classList.remove('vieja-clase'); // Quita clase
img.classList.toggle('activo');      // Si la tiene la quita, si no la pone
img.classList.contains('activo');    // Devuelve true/false

// --- CONTENIDO Y ESTILOS ---
const p = document.querySelector('p');
p.innerHTML = 'Texto con <b>negrita</b>'; // Renderiza HTML
p.textContent = 'Solo texto plano';       // Más seguro (evita XSS)
p.style.backgroundColor = 'red';          // Estilo en línea (camelCase)
p.style.display = 'none';

// --- NAVEGACIÓN POR EL ÁRBOL (Traversing) ---
const el = document.querySelector('.hijo');
console.log(el.parentElement);    // El padre directo
console.log(el.children);         // Array de hijos HTML
console.log(el.nextElementSibling); // El hermano de abajo
console.log(el.previousElementSibling); // El hermano de arriba



/**
 * DOM AVANZADO: Manipulación, Estructura y Rendimiento
 */

// --- 1. SELECCIÓN DE PRECISIÓN ---
// Más allá de querySelector
const inputs = document.querySelectorAll('input[name="genero"]:checked'); // Selectores CSS complejos
const formulario = document.forms['miFormulario']; // Acceso directo a formularios por name
const imagenes = document.images; // Colección de todas las imágenes


// --- 2. TRAVERSING (Navegación precisa por nodos) ---
const item = document.querySelector('.item-central');

// Hacia arriba
console.log(item.parentElement);      // Padre directo (Elemento)
console.log(item.closest('.contenedor-principal')); // Sube por el DOM hasta el ancestro que coincida con el selector

// Hacia los lados (Hermanos)
console.log(item.nextElementSibling);     // Siguiente hermano (ignora texto/espacios)
console.log(item.previousElementSibling); // Hermano anterior

// Hacia abajo (Hijos)
console.log(item.firstElementChild); // Primer hijo
console.log(item.lastElementChild);  // Último hijo
console.log(item.children);          // HTMLCollection con todos los hijos elementos


// --- 3. MANIPULACIÓN DE VALORES Y ESTADOS ---
const miInput = document.querySelector('#username');
miInput.value = "Gemini";            // Cambia el valor de un campo de texto
miInput.disabled = true;             // Desactiva un elemento
miInput.readOnly = false;            // Lo hace de solo lectura o no

const checkbox = document.querySelector('#terminos');
checkbox.checked = true;             // Marca un checkbox/radio


// --- 4. DATA-ATTRIBUTES (Atributos personalizados) ---
// En HTML: <div id="user" data-id="123" data-rol="admin"></div>
const userDiv = document.querySelector('#user');
console.log(userDiv.dataset.id);     // "123" (Acceso directo vía dataset)
userDiv.dataset.rol = "editor";      // Cambia data-rol a "editor"


// --- 5. FRAGMENTOS (Optimización de rendimiento) ---
// IMPORTANTE: Si vas a insertar 100 elementos, NO hagas 100 appendChild al DOM real.
// Usa un DocumentFragment como "bolsa" temporal para evitar reflujos (reflows).

const lista = document.querySelector('#miLista');
const fragmento = document.createDocumentFragment();

for (let i = 1; i <= 5; i++) {
    const li = document.createElement('li');
    li.textContent = `Elemento número ${i}`;
    fragmento.appendChild(li); // Aquí NO se renderiza nada todavía (rápido)
}

lista.appendChild(fragmento); // Una sola inserción real en el DOM (eficiente)


// --- 6. GEOMETRÍA Y SCROLL ---
const caja = document.querySelector('.caja');

console.log(caja.getBoundingClientRect()); // Devuelve objeto con top, left, width, height... relativo al viewport
console.log(caja.offsetHeight);            // Altura total (incluye padding y border)
console.log(caja.scrollHeight);            // Altura total del contenido (aunque haya scroll)
// caja.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll suave hacia arriba del elemento


// --- 7. REEMPLAZO Y ELIMINACIÓN MODERNA ---
const viejo = document.querySelector('#obsoleto');
const nuevo = document.createElement('span');
nuevo.textContent = "Soy nuevo";

viejo.replaceWith(nuevo); // Reemplaza un nodo por otro de forma directa
// viejo.remove();        // El nodo se elimina a sí mismo del DOM
/**
 * EJERCICIO 1: Delegación de eventos con filtrado dinámico
 * Objetivo: Manejar clics solo en botones de "borrar" dentro de una lista infinita.
 */
document.getElementById('miLista').addEventListener('click', (e) => {
    // Usamos .closest para asegurar que capturamos el botón aunque se haga clic en un icono interno
    const btn = e.target.closest('.btn-delete');
    if (btn && e.currentTarget.contains(btn)) {
        console.log("Eliminando elemento ID:", btn.dataset.id);
        btn.parentElement.remove();
    }
});

/**
 * EJERCICIO 2: Drag & Drop personalizado (Mouse Tracking)
 * Objetivo: Mover un elemento solo mientras se mantiene el clic pulsado.
 */
const box = document.querySelector('.box');
const onMouseMove = (e) => {
    box.style.left = `${e.clientX}px`;
    box.style.top = `${e.clientY}px`;
};

box.addEventListener('mousedown', () => {
    // Escuchamos el movimiento en 'document' para no "perder" el ratón si nos movemos rápido
    document.addEventListener('mousemove', onMouseMove);
});

document.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', onMouseMove);
});

/**
 * EJERCICIO 3: El evento "Once" y la autodestrucción
 * Objetivo: Un botón de "Cofre del tesoro" que solo funciona una vez y luego cambia su comportamiento.
 */
const btnTesor = document.getElementById('tesoro');
btnTesor.addEventListener('click', function(e) {
    alert("¡Tesoro encontrado!");
    this.textContent = "Cofre Vacío";
    this.classList.add('disabled');
}, { once: true }); // El tercer parámetro 'once' elimina el listener automáticamente tras el primer uso.

/**
 * EJERCICIO 4: Control de salida de página (BeforeUnload)
 * Objetivo: Avisar al usuario si intenta cerrar la pestaña con un formulario a medias.
 */
window.addEventListener('beforeunload', (e) => {
    if (formularioEstaSucio) { // Variable booleana que controlamos al escribir
        e.preventDefault();
        e.returnValue = ''; // Requerido por navegadores modernos para mostrar el aviso
    }
});

/**
 * EJERCICIO 5: Coordinación de Checkboxes (Select All)
 * Objetivo: Que el "Check All" se desmarque si quitas uno individual, y viceversa.
 */
const master = document.getElementById('masterCheck');
const slaves = document.querySelectorAll('.slaveCheck');

master.addEventListener('change', () => {
    slaves.forEach(s => s.checked = master.checked);
});

// Delegación para los esclavos:
document.body.addEventListener('change', (e) => {
    if (e.target.classList.contains('slaveCheck')) {
        const todosMarcados = [...slaves].every(s => s.checked);
        master.checked = todosMarcados;
    }
});

/**
 * EJERCICIO 6: "Konami Code" (Secuencia de teclas)
 * Objetivo: Detectar una combinación específica de teclas para activar un "easter egg".
 */
const secreto = ['a', 'b', 'c'];
let teclasPulsadas = [];

window.addEventListener('keydown', (e) => {
    teclasPulsadas.push(e.key.toLowerCase());
    // Cortamos el array para que siempre tenga el tamaño del secreto
    teclasPulsadas = teclasPulsadas.slice(-secreto.length);
    
    if (JSON.stringify(teclasPulsadas) === JSON.stringify(secreto)) {
        console.log("¡MODO DIOS ACTIVADO!");
    }
});

/**
 * EJERCICIO 7: Intersección y Lazy Loading de Eventos
 * Objetivo: Cargar datos solo cuando un elemento es visible en el viewport.
 */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log("Elemento a la vista, lanzando evento de carga...");
            entry.target.dispatchEvent(new CustomEvent('heavyLoad'));
            observer.unobserve(entry.target); // Dejar de observar tras cargar
        }
    });
});
observer.observe(document.querySelector('.footer-load'));

/**
 * EJERCICIO 8: Custom Events (Eventos Personalizados)
 * Objetivo: Comunicación entre dos componentes que no se conocen.
 */
// Componente A emite
const emitirDatos = (datos) => {
    const evento = new CustomEvent('datosEnviados', { detail: datos });
    window.dispatchEvent(evento);
};

// Componente B escucha
window.addEventListener('datosEnviados', (e) => {
    console.log("Recibido en B:", e.detail);
});

/**
 * EJERCICIO 9: Prevención selectiva y propagación condicionada
 * Objetivo: Un link que solo navega si se hace clic en el texto, pero no si se hace clic en un icono interno.
 */
const link = document.querySelector('.my-link');
link.addEventListener('click', (e) => {
    if (e.target.tagName === 'I') { // Si es el icono
        e.preventDefault(); // No navegues
        console.log("Hiciste clic en el icono, no te vas a ninguna parte.");
        e.stopPropagation(); // Detiene el viaje hacia arriba
    }
});

/**
 * EJERCICIO 10: Sincronización de Inputs (Input vs Change)
 * Objetivo: Reflejar texto en tiempo real mientras se escribe, pero validar solo al salir.
 */
const input = document.getElementById('username');
const preview = document.getElementById('preview');

// 'input' se dispara en cada pulsación/borrado
input.addEventListener('input', (e) => {
    preview.textContent = e.target.value;
});

// 'change' solo se dispara cuando el usuario pierde el foco (blur) o pulsa Enter
input.addEventListener('change', (e) => {
    if (e.target.value.length < 5) {
        alert("Demasiado corto para guardarse.");
    }
});
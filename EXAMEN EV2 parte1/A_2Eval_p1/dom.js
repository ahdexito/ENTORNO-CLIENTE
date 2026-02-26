// EJERCICIO 1
const elemento1 = document.getElementById("elemento1");
elemento1.textContent = "Elemento Modificado";

// ----------------------------------------------------------

// EJERCICIO 2
const lista = document.querySelector("ul");
lista.lastElementChild.textContent = "Elemento Modificado con querySelector"

// ----------------------------------------------------------

// EJERCICIO 3
const nuevo = document.createElement("li");
nuevo.textContent = "Elemento Nuevo Agregado";

lista.appendChild(nuevo);
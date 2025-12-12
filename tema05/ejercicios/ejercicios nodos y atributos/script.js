// EJERCICIO 1
{
    const listaUsuarios = document.querySelector("#usuarios ul");

    const nuevoUsuario = document.createElement("li");
    nuevoUsuario.classList.add("user");
    nuevoUsuario.textContent = "Pedro";

    listaUsuarios.appendChild(nuevoUsuario);
}


// EJERCICIO 2
{
    const listaUsuarios = document.querySelector("#usuarios ul");

    const nuevo = document.createElement("li");
    nuevo.classList.add("user", "nuevo");
    nuevo.textContent = "Mario";

    listaUsuarios.prepend(nuevo);
}


// EJERCICIO 3
{
    const activo = document.querySelector("#usuarios .activo");

    if (activo) {
        activo.remove();
    }
}


// EJERCICIO 4
{
    const usuarios = document.querySelectorAll("#usuarios .user");

    usuarios.forEach(u => u.classList.add("verificado"));
}


// EJERCICIO 5
{
    // obtener section de productos
    const seccionProductos = document.getElementById("productos");

    // crear elementos
    const nuevoProducto = document.createElement("div");
    const titulo = document.createElement("h3");
    const precio = document.createElement("p");

    // asignar atributos, clases y contenido
    nuevoProducto.classList.add("producto");
    nuevoProducto.setAttribute("data-id", "103");

    titulo.textContent = "Auriculares";

    precio.className = "precio";
    precio.textContent = "35.00";

    // unir elementos
    nuevoProducto.append(titulo, precio);
    seccionProductos.append(nuevoProducto);
}


// EJERCICIO 6
{
    // obtener producto
    const productoOriginal = document.querySelector('.producto');

    // clonar nodo
    const productoClon = productoOriginal.cloneNode(true);

    // modificar título
    const tituloClon = productoClon.querySelector('h3');
    tituloClon.textContent = "Teclado PRO";

    // modificar atributo
    productoClon.setAttribute("data-id", "201");

    // obtener contenedor y añadir al final
    const seccionProductos = document.getElementById("productos");
    seccionProductos.append(productoClon);
}


// EJERCICIO 7
{
    // obtener todos los productos
    const productos = document.querySelectorAll('.producto');

    // iterar sobre la lista
    productos.forEach(producto => {
        // buscar nodo que contiene el precio
        const nodoPrecio = producto.querySelector('.precio');

        // obtener el precio y parsearlo
        let precioActual = parseFloat(nodoPrecio.textContent);

        // sumar 5€
        let nuevoPrecio = precioActual + 5;

        // actualizar contenido
        nodoPrecio.textContent = nuevoPrecio.toFixed(2);

        // comprobar si es caro
        if (nuevoPrecio > 30) {
            nodoPrecio.classList.add("caro");
        }
    });
}


// EJERCICIO 8
{
    // obtener referencia del body y nombres de productos
    const body = document.body;
    const nombresProductos = document.querySelectorAll('#productos h3');

    // crear elemento ul
    const lista = document.createElement("ul");
    lista.setAttribute("id", "indice-productos");

    // iterar sobre lista de productos
    nombresProductos.forEach(hijo => {
        // crear nuevo elemento li
        const listItem = document.createElement("li");

        // obtener nombre de producto
        const nombre = hijo.textContent;

        // asignar texto al nuevo li
        listItem.textContent = nombre;

        // añadir li a la lista
        lista.appendChild(listItem);
    });

    // insertar lista como primer hijo del body
    body.prepend(lista);
}


// EJERCICIO 9
{
    // obtener sección y todos sus productos
    const seccionProductos = document.getElementById("productos");
    const productos = document.querySelectorAll('.producto');

    const tituloProductos = seccionProductos.querySelector('h2');

    // inicializar variables
    let precioMax = -1;
    let productoMasCaro = null;

    // iterar sobre productos para encontrar el más caro
    productos.forEach(producto => {
        // obtener precio actual
        const nodoPrecio = producto.querySelector('.precio');
        const precioActual = parseFloat(nodoPrecio.textContent);

        // comparar y actualizar si el precio es mayor
        if (precioActual > precioMax) {
            precioMax = precioActual;
            productoMasCaro = producto;
        }
    });

    // mover el producto más caro
    if (productoMasCaro) {
        tituloProductos.after(productoMasCaro);
    }
}


// EJERCICIO 10
{
    // obtener sección de usuarios y la lista
    const seccionUsuarios = document.getElementById("usuarios");
    const listaUsuarios = seccionUsuarios.querySelector('ul');

    // crear nuevo elemento div
    const tarjetaCompacta = document.createElement("div");
    const tituloCompacto = document.createElement("h3");

    // asignar atributos y contenido a los nuevos elementos
    tarjetaCompacta.classList.add("card");
    tituloCompacto.textContent = "Listado actualizado";

    // mover la lista al nuevo div
    tarjetaCompacta.append(tituloCompacto, listaUsuarios);

    // insertar el div dentro de la sección usuarios
    seccionUsuarios.append(tarjetaCompacta);
}


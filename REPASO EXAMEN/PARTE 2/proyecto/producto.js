/*
1. El Objeto de Datos Complejo
Antes de programar, definamos qué es un "dato complejo". 
No es solo un nombre, es un objeto con estructuras anidadas:
*/

const productoNuevo = {
    sku: "ELEC-9920",
    info: {
        nombre: "Monitor Gamer 4K",
        marca: "UltraView",
        specs: ["144Hz", "HDR10", "OLED"] // Array dentro del objeto
    },
    precios: {
        base: 450.00,
        impuestos: 0.15 // 15%
    },
    stock: 25
};

// -------------------------------------------------------------------

/*
2. Frontend: El Despachador (index.html / script.js)
Aquí usamos async/await para enviar este objeto a nuestro archivo PHP local.
*/
async function registrarProducto(datosProducto) {
    try {
        console.log("Enviando objeto complejo al servidor local...");

        const respuesta = await fetch('procesar.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            // Convertimos el objeto complejo en una cadena de texto JSON
            body: JSON.stringify(datosProducto) 
        });

        if (!respuesta.ok) throw new Error("Error en el servidor local");

        const resultado = await respuesta.json();
        console.log("Respuesta final del ecosistema:", resultado);
        alert(`Producto registrado con ID: ${resultado.api_logistica_id}`);

    } catch (error) {
        console.error("Error en el flujo:", error);
    }
}
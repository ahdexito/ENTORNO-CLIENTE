/* 
1. El Patrón "Data Mapper" con Clases y Fetch

El reto: 

No basta con recibir un JSON. Debes convertir 
cada elemento del JSON en una instancia de una clase que 
tenga sus propios métodos, realizar cálculos y luego 
enviar un reporte resumido.

El Problema:

Recibes un JSON de una API de ventas. Debes crear una 
clase Producto, calcular el IVA dinámicamente, filtrar los 
productos con stock bajo y enviar un objeto "Pedido" a otra API.*/


// 1. Definición de la Clase con lógica de negocio
class Producto {
    constructor({ id, nombre, precioBase, stock }) {
        this.id = id;
        this.nombre = nombre;
        this.precioBase = precioBase;
        this.stock = stock;
    }

    // Método para calcular precio con impuesto (Dato calculado)
    get precioFinal() {
        return (this.precioBase * 1.21).toFixed(2);
    }

    estaAgotándose() {
        return this.stock < 5;
    }
}

// 2. Lógica Asíncrona Compleja
async function procesarInventario() {
    try {
        const respuesta = await fetch('api/productos.php');
        const data = await respuesta.json(); // Data es un Array de objetos simples

        // TRANSFORMACIÓN: De Objetos Planos a Instancias de Clase
        const catalogo = data.map(item => new Producto(item));

        // FILTRADO Y PROCESAMIENTO
        const criticos = catalogo.filter(p => p.estaAgotándose());
        
        console.log(`Hay ${criticos.length} productos en alerta.`);

        // ENVÍO DE DATOS COMPLEJOS
        if (criticos.length > 0) {
            const reporte = {
                fecha: new Date().toISOString(),
                productosAlerta: criticos.map(p => ({
                    id: p.id,
                    nombre: p.nombre,
                    precioVenta: p.precioFinal // Enviamos el dato calculado, no el original
                }))
            };

            await fetch('api/alertas.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reporte)
            });
        }
    } catch (e) {
        console.error("Error en el flujo:", e);
    }
}
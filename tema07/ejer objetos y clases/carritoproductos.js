class Producto {
    #id;
    #nombre;
    #precio;
    #cantidad;
    #tieneImpuesto;

    constructor(nombre, precio, cantidad, tieneImpuesto) {
        if (precio < 0) throw new Error("El precio no puede ser menor a 0.");
        if (cantidad <= 0) throw new Error("La cantidad debe ser mayor a 0.");

        this.#id = this.#generarId();
        this.#nombre = nombre;
        this.#precio = precio;
        this.#cantidad = cantidad;
        this.#tieneImpuesto = tieneImpuesto;
    }

    #generarId() {
        return Math.random().toString(36).substring(2, 9).toUpperCase();
    }

    getId() { return this.#id; }
    getNombre() { return this.#nombre; }
    getPrecio() { return this.#precio; }
    getCantidad() { return this.#cantidad; }
    getTieneImpuesto() { return this.#tieneImpuesto; }

    set cantidad(nuevaCantidad) {
        if (nuevaCantidad <= 0) throw new Error("La cantidad no puede ser 0 o menor.");
        this.#cantidad = nuevaCantidad;
    }
}



class Carrito {
    #productos = [];
    #IVA = 0.10;

    agregarProducto(producto) {
        if (!(producto instanceof Producto)) throw new Error("Debe ser un objeto de tipo Producto.");
        this.#productos.push(producto);
    }

    actualizarCantidadProducto(id, nuevaCantidad) {
        const producto = this.#productos.find(p => p.getId() === id);
        if (producto) {
            producto.cantidad = nuevaCantidad;
        }
    }

    eliminarProducto(id) {
        this.#productos = this.#productos.filter(p => p.getId() !== id);
    }

    calcularImpuestoTotal() {
        return this.#productos.reduce((total, p) => {
            if (p.getTieneImpuesto()) {
                return total + (p.getPrecio() * p.getCantidad() * this.#IVA);
            }
            return total;
        }, 0);
    }

    calcularTotal() {
        const subtotal = this.#productos.reduce((total, p) => total + (p.getPrecio() * p.getCantidad()), 0);
        return subtotal + this.calcularImpuestoTotal();
    }

    obtenerCantidadTotal() {
        return this.#productos.reduce((total, p) => total + p.getCantidad(), 0);
    }

    obtenerProductos() {
        return [...this.#productos];
    }

    toString() {
        let lista = "------ CARRITO ------\n";
        let subtotalSinIVA = 0;

        this.#productos.forEach(p => {
            const sub = p.getPrecio() * p.getCantidad();
            subtotalSinIVA += sub;
            lista += `- ${p.getNombre()}: ${p.getPrecio()}€ x ${p.getCantidad()} ud. = ${sub}€\n`;
        });

        const imp = this.calcularImpuestoTotal();
        const total = subtotalSinIVA + imp;

        return `${lista}` +
            `- `.repeat(20) + `\n` +
            `Subtotal (sin IVA): ${subtotalSinIVA.toFixed(2)}€\n` +
            `Total Impuestos (10%): ${imp.toFixed(2)}€\n` +
            `TOTAL FINAL: ${total.toFixed(2)}€\n`;
    }
}


console.log('-'.repeat(50));
console.log("EJERCICIO CARRITO");

const producto1 = new Producto('Manzana', 1.5, 10, true);
const producto2 = new Producto('Pan', 2, 5, false);

const carrito = new Carrito();
carrito.agregarProducto(producto1);
carrito.agregarProducto(producto2);

console.log(carrito.toString());

console.log('Total con impuestos:', carrito.calcularTotal());
console.log('Total impuestos:', carrito.calcularImpuestoTotal());
console.log('Cantidad total de ítems:', carrito.obtenerCantidadTotal());

console.log("-".repeat(20));

carrito.actualizarCantidadProducto(producto1.getId(), 20);
console.log("Tras actualizar 'manzanas' a 20:");
console.log(carrito.toString());

carrito.eliminarProducto(producto2.getId());
console.log("Tras eliminar 'pan':");
console.log(carrito.toString());
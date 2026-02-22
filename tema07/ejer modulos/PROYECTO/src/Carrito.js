import { Producto } from './Producto.js';

export class Carrito {
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
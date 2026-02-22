export class Producto {
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
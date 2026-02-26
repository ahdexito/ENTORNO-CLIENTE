/**
 * CHULETA JS: OBJETOS Y CLASES (Basado en el tema 7.1)
 */

// 1. DEFINICIÓN DE CLASES Y CONSTRUCTOR [cite: 6, 88]
// Las clases modelan entidades reales (Usuario, Producto, etc.)[cite: 52].
class Casa {
    // El constructor se ejecuta automáticamente al usar 'new'[cite: 88].
    constructor(color, habitaciones) {
        this.color = color; // Propiedad pública [cite: 135]
        this.habitaciones = habitaciones;
    }

    // Método de la clase (se guarda en el prototype para ahorrar memoria) [cite: 94, 122]
    describir() {
        return `Casa de color ${this.color} con ${this.habitaciones} habitaciones`;
    }
}

// INSTANCIACIÓN: Crear un objeto basado en la clase [cite: 85, 86]
const miCasa = new Casa("azul", 3);
console.log(miCasa.describir());


// 2. PRIVACIDAD (ES2020) [cite: 131]
// Se usa el símbolo '#' para que algo sea inaccesible desde fuera[cite: 137].
class Usuario {
    #password; // Propiedad privada real [cite: 137, 138]

    constructor(user, pass) {
        this.user = user;
        this.#password = pass;
    }

    // Método privado
    #validarPass() { 
        return true; 
    }
}


// 3. PROPIEDADES COMPUTADAS (GETTERS Y SETTERS) [cite: 142]
// Se usan para leer/modificar propiedades privadas o añadir lógica[cite: 144].
class Producto {
    #precio;

    constructor(nombre, precio) {
        this.nombre = nombre;
        this.#precio = precio;
    }

    // Getter: para leer el valor [cite: 143]
    get precio() {
        return `${this.#precio}€`;
    }

    // Setter: para modificar el valor con validación [cite: 143]
    set precio(nuevoPrecio) {
        if (nuevoPrecio > 0) this.#precio = nuevoPrecio;
    }
}


// 4. HERENCIA [cite: 37, 38]
// Una clase hija obtiene propiedades y métodos de una clase padre[cite: 38].
class Mansion extends Casa {
    constructor(color, habitaciones, tienePiscina) {
        // super() llama al constructor del padre (Casa)
        super(color, habitaciones); 
        this.tienePiscina = tienePiscina;
    }
}


// 5. MÉTODOS ESPECIALES (Conversión) [cite: 40]
class Contador {
    constructor(valor) {
        this.valor = valor;
    }

    // Se llama al concatenar el objeto como string [cite: 41]
    toString() {
        return `Valor actual: ${this.valor}`;
    }

    // Se llama en comparaciones relacionales (>, <, >=, <=) [cite: 43]
    valueOf() {
        return this.valor;
    }
}

const c1 = new Contador(10);
console.log("Info: " + c1); // Usa toString() -> "Info: Valor actual: 10"
console.log(c1 > 5); // Usa valueOf() -> true [cite: 42, 43]


// 6. EL SISTEMA DE PROTOTIPOS (Concepto clave) [cite: 104]
// JavaScript no copia métodos en cada objeto, los comparte vía prototype[cite: 83].
// miCasa.__proto__ === Casa.prototype // true [cite: 112]
// - Las propiedades viven en el OBJETO[cite: 122].
// - Los métodos viven en el PROTOTYPE[cite: 122].
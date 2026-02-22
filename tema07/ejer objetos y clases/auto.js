class Auto {
    #encendido = false;
    #velocidad = 0;
    #marca;
    #modelo;
    #patente;

    constructor(marca, modelo, patente) {
        this.#marca = marca;
        this.#modelo = modelo;
        this.#patente = patente;
    }

    arrancar() {
        this.#encendido = true;
        console.log("El auto ha arrancado.");
    }

    apagar() {
        if (this.#velocidad > 0) {
            console.warn("No puedes apagar el coche en movimiento");
            return;
        }

        this.#encendido = false;
        console.log("El auto se ha apagado.");
    }

    acelerar() {
        if (!this.#encendido) {
            console.warn("No puedes acelerar, el auto está apagado.");
            return;
        }

        this.#velocidad += 10;
    }

    desacelerar() {
        if (!this.#encendido) {
            console.warn("No puedes desacelerar, el auto está apagado.");
            return;
        }

        if (this.#velocidad >= 10) {
            this.#velocidad -= 10;
        } 
        
        else {
            this.#velocidad = 0;
        }
    }

    getVelocidad() {
        return this.#velocidad;
    }

    toString() {
        return `${this.#marca} ${this.#modelo}, patente ${this.#patente}`;
    }
}


console.log('-'.repeat(50));
console.log("EJERCICIO AUTO");

const miAuto = new Auto('Toyota', 2001, 'ABC123');

console.log(miAuto.toString());

miAuto.acelerar();

miAuto.arrancar();
miAuto.acelerar();
console.log("Velocidad actual: ", miAuto.getVelocidad());

miAuto.apagar();

miAuto.desacelerar();
console.log("Velocidad tras desacelerar: ", miAuto.getVelocidad());

miAuto.apagar();
class Calculadora {
    #resultado = 0;

    #validarNumero(numero) {
        if (!Number.isFinite(numero)) {
            throw new Error("No es un número válido.");
        }
    }

    sumar(numero) {
        this.#validarNumero(numero);
        this.#resultado += numero;
        return this.#resultado;
    }

    restar(numero) {
        this.#validarNumero(numero);
        this.#resultado -= numero;
        return this.#resultado;
    }

    multiplicar(numero) {
        this.#validarNumero(numero);
        this.#resultado *= numero;
        return this.#resultado;
    }

    dividir(numero) {
        this.#validarNumero(numero);
        if (numero === 0) {
            throw new Error("No se puede dividir por cero.")
        }
        this.#resultado /= numero;
        return this.#resultado;
    }

    obtenerResultado() {
        return this.#resultado;
    }

    reiniciar() {
        this.#resultado = 0;
    }
}

console.log('-'.repeat(50));
console.log("EJERCICIO CALCULADORA");

const calc = new Calculadora();

try {
    console.log("Suma 10:", calc.sumar(10));
    console.log("Resta 5:", calc.restar(5));
    console.log("Multiplica 3:", calc.multiplicar(3));
    console.log("Divide 5:", calc.dividir(5));
    console.log("Resultado final:", calc.obtenerResultado());

    calc.reiniciar();
    console.log("Tras reiniciar:", calc.obtenerResultado());

} catch (error) {
    console.error("ERROR:", error.message);
}
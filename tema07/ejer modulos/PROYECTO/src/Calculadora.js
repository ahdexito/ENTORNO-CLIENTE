export class Calculadora {
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
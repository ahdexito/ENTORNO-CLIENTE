import { Calculadora } from './Calculadora.js';
import { Auto } from './Auto.js';
import { Carrito } from './Carrito.js';
import { Producto } from './Producto.js';

// PORBAR CALCULADORA
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


// PROBAR AUTO
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


// PROBAR CARRITO
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
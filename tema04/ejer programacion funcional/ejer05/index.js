let notas = [];

// pedir notas al usuario
let entrada;
do {
    entrada = prompt("Introduce nota");
    notas = addItems(notas, entrada);
} while (entrada);

// limpiar última posición 'null' al terminar
notas.pop(notas.length - 1);


// limpiar array de números no válidos
let notas_validas = clearItems(notas);

// encontrar primer suspenso
let suspenso = primerSuspenso(notas_validas);

// filtrar aprobados
let listaAprobados = aprobados(notas_validas);

// nota media
let media = notaMedia(notas_validas);

// notas finales con incremento del 10%
let notas_finales = cambiaNotas(notas_validas, 0.1);

console.log(`Notas introducidas: ${notas}`);
console.log(`Notas válidas: ${notas_validas}`);
console.log(`Nota del primer suspenso: ${suspenso}`);
console.log(`Notas de los ${listaAprobados.length} aprobados: ${listaAprobados}`);
console.log(`Nota media: ${media}`);
console.log(`Notas finales: ${notas_finales}`);
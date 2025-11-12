/****************************************************
 *                CHULETA JS                       *
 * Programación funcional, objetos y arrays        *
 ****************************************************/

/************** PROGRAMACIÓN FUNCIONAL *************/

// map -> transforma cada elemento y devuelve nuevo array
const numeros = [1, 2, 3];
const numerosDobles = numeros.map((n) => n * 2); // [2, 4, 6]

// filter -> filtra elementos según condición
const mayoresQueUno = numeros.filter((n) => n > 1); // [2, 3]

// find -> devuelve el primer elemento que cumple condición
const primeroMayorQueUno = numeros.find((n) => n > 1); // 2

// some / every -> al menos uno / todos cumplen condición
const hayMayorQueDos = numeros.some((n) => n > 2); // true
const todosMayoresQueCero = numeros.every((n) => n > 0); // true

// reduce -> acumula valores de un array
const suma = numeros.reduce((acum, n) => acum + n, 0); // 6

// forEach -> ejecuta una función sobre cada elemento (no devuelve array)
numeros.forEach((n, i) => console.log(`Elemento ${i}: ${n}`));

// sort -> ordena arrays (callback para orden numérico o personalizado)
const desordenados = [10, 2, 5];
const ordenados = [...desordenados].sort((a, b) => a - b); // [2, 5, 10]

// spread/rest -> copiar, combinar arrays o capturar argumentos
const arr1 = [1, 2];
const arr2 = [...arr1, 3]; // [1, 2, 3]
function sumaTodo(...nums) {
  // rest
  return nums.reduce((a, b) => a + b, 0);
}
const total = sumaTodo(1, 2, 3); // 6

/************** OBJETOS *************/

// Creación de objetos
const player = {
  name: "Ana",
  life: 99,
  power: 10,
  // método
  attack: (enemy) => enemy.life - 10,
};

// Acceso a propiedades
console.log(player.name); // 'Ana'
console.log(player["life"]); // 99

// Encadenamiento seguro
console.log(player.stats?.mana); // undefined

// Desestructuración
const { name, life } = player;
console.log(name, life); // 'Ana' 99

// Copiar objetos
const copy = { ...player };

// Iterar propiedades
console.log(Object.keys(player)); // ['name','life','power','attack']
console.log(Object.values(player)); // ['Ana', 99, 10, function]
console.log(Object.entries(player)); // [['name','Ana'],['life',99],['power',10],['attack', function]]

// Recorrer con for...of
for (const [k, v] of Object.entries(player)) {
  console.log(`${k}: ${v}`);
}

// Convertir array a objeto y viceversa
const arrEntries = [
  ["nombre", "Ana"],
  ["edad", 20],
];
const objFromArr = Object.fromEntries(arrEntries); // {nombre:'Ana', edad:20}

/************** EJEMPLOS FUNCIONALES CON ARTISTAS *************/

const artistas = [
  {
    nombre: "Ochoa",
    edad: 33,
    instrumento: "batería",
    solista: true,
    discos: [
      { titulo: "A", copiasVendidas: 100 },
      { titulo: "B", copiasVendidas: 200 },
    ],
    ultimoRecital: { entradasVendidas: 500 },
  },
  {
    nombre: "Blevins",
    edad: 40,
    instrumento: "batería",
    solista: true,
    discos: [{ titulo: "C", copiasVendidas: 50 }],
    ultimoRecital: { entradasVendidas: 600 },
  },
  {
    nombre: "Rasmussen",
    edad: 30,
    instrumento: "teclado",
    solista: false,
    discos: [{ titulo: "D", copiasVendidas: 300 }],
    ultimoRecital: { entradasVendidas: 400 },
  },
];

// Obtener artistas solistas
const artistasSolistas = artistas.filter((a) => a.solista);
console.log(artistasSolistas.map((a) => a.nombre)); // ['Ochoa', 'Blevins']

// Artista con más entradas en último recital
const artistaMaxEntradas = artistas.reduce(
  (max, a) =>
    a.ultimoRecital.entradasVendidas > max.ultimoRecital.entradasVendidas
      ? a
      : max,
  artistas[0]
);
console.log(artistaMaxEntradas.nombre); // 'Blevins'

// Cantidad de artistas por instrumento
const cantidadPorInstrumento = artistas.reduce((acc, a) => {
  acc[a.instrumento] = (acc[a.instrumento] || 0) + 1;
  return acc;
}, {});
console.log(cantidadPorInstrumento); // {batería: 2, teclado: 1}

// Artistas con más de X discos
function artistasConMasDiscosQue(cantidad, arr) {
  return arr
    .filter((a) => a.discos.length > cantidad)
    .sort((a, b) => b.discos.length - a.discos.length)
    .map((a) => a.nombre);
}
console.log(artistasConMasDiscosQue(1, artistas)); // ['Ochoa']

// Artista con más copias vendidas en total
const artistaMasCopias = artistas.reduce((max, a) => {
  const totalCopias = a.discos.reduce((sum, d) => sum + d.copiasVendidas, 0);
  return totalCopias > (max.total || 0) ? { ...a, total: totalCopias } : max;
}, {});
console.log(artistaMasCopias.nombre); // 'Ochoa'

/************** EJEMPLOS DE ORDENACIÓN *************/

// Ordenar por nombre ascendente
const porNombre = [...artistas].sort((a, b) => (a.nombre > b.nombre ? 1 : -1));
console.log(porNombre.map((a) => a.nombre));

// Ordenar por edad descendente
const porEdadDesc = [...artistas].sort((a, b) => b.edad - a.edad);
console.log(porEdadDesc.map((a) => `${a.nombre} (${a.edad})`));

/************** DESAFÍOS ADICIONALES *************/

// Último carácter de una cadena
const dias = ["Lunes", "Martes", "Miércoles"];
const ultimo = dias.map((d) => d[d.length - 1]);
console.log(ultimo); // ['s','s','s']

// Verificar si un día es 'Martes'
const hayMartes = dias.some((d) => d === "Martes");
console.log(hayMartes); // true

function addItems(notas, item) {
    notas.push(item);
    return notas;
}

// limpiar array de números no válidos
function clearItems(notas) {
    return notas.filter(nota => {
        let n = Number(nota);
        return !isNaN(n) && n >= 0 && n <= 10; 
    });
}

// encontrar primer suspenso
function primerSuspenso(notas) {
    return notas.find(nota => nota < 5);
}

// filtrar aprobados
function aprobados(notas) {
    return notas.filter(nota => nota >= 5);
}

// nota media
function notaMedia(notas) {
    if (notas.length === 0) return 0;
    let suma = notas.reduce((acum, nota) => acum + Number(nota), 0);
    return (suma / notas.length).toFixed(2);
}

// notas finales con incremento del 10%
function cambiaNotas(notas, incremento) {
    return notas.map(nota => {
        let n = Number(nota); 
        let nota_final = Math.round(n + n * incremento); 
        return nota_final > 10 ? 10 : nota_final; 
    });
}
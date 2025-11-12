// EJERCICIO 1
function artistasSolistas(artistas) {
    return artistas.filter(artista => artista.solista === true);
}

// console.log(artistasSolistas(artistas));


// EJERCICIO 2
function artistasPorEdad(artistas, edad) {
    return artistas.filter(artista => artista.edad === edad);
}

// console.log(artistasPorEdad(artistas, 24));


// EJERCICIO 3
function cantidadDeArtistasPorInstrumento(artistas) {
    const resultado = {};

    for (let artista of artistas) {
        let instrumento = artista.instrumento;

        if (resultado[instrumento]) resultado[instrumento]++;
        else resultado[instrumento] = 1;
    }

    return resultado;
}

// console.log(cantidadDeArtistasPorInstrumento(artistas));


// EJERCICIO 4
function cantidadDeArtistasPorGenero(artistas) {
    const resultado = {};

    for (let artista of artistas) {
        let genero = artista.genero;

        if (resultado[genero]) resultado[genero]++;
        else resultado[genero] = 1;
    }

    return resultado;
}

// console.log(cantidadDeArtistasPorGenero(artistas));


// EJERCICIO 5
function artistasConMasDiscosQue(cantidadDeDiscos, artistas) {
    return artistas
        .filter(artista => artista.discos.length > cantidadDeDiscos)
        .sort((a, b) => b.discos.length - a.discos.length);
}

// console.log(artistasConMasDiscosQue(6, artistas));


// EJERCICIO 6
function artistaConMasEntradasVendidas(artistas) {
    const copia = [...artistas];
    copia.sort((a, b) => b.ultimoRecital.entradasVendidas - a.ultimoRecital.entradasVendidas);
    return copia[0];
}

// console.log(artistaConMasEntradasVendidas(artistas));


// EJERCICIO 7
function artistaConMayorRecaudacion(artistas) {
    const copia = [...artistas];
    copia.sort((a, b) => 
        (b.ultimoRecital.entradasVendidas * b.ultimoRecital.costoEntradas) -
        (a.ultimoRecital.entradasVendidas * a.ultimoRecital.costoEntradas)
    )
    return copia[0];
}

// console.log(artistaConMayorRecaudacion(artistas));


// EJERCICIO 8
function artistasConDiscoEnAnyo(anyo, artistas) {
    return artistas.filter(artista => 
        artista.discos.some(disco => disco.anioLanzamiento === anyo)
    );
}

// console.log(artistasConDiscoEnAnyo(2002, artistas));


// EJERCICIO 9
function artistaConMasCopias(artistas) {
    let mejorArtista = null;
    let copiasMax = 0;

    for (let artista of artistas) {
        let totalCopias = 0;
        for (let disco of artista.discos) {
            totalCopias += disco.copiasVendidas;
        }

        if (totalCopias > copiasMax) {
            copiasMax = totalCopias;
            mejorArtista = artista;
        }
    }

    return mejorArtista;
}

// console.log(artistaConMasCopias(artistas));
let opcion = -1;

do {
    opcion = Number(prompt(
        "Elige opción que deseas ver:\n" +
        "  0. Salir.\n" +
        "  1. Artistas solistas.\n" +
        "  2. Artistas filtrados por edad.\n" +
        "  3. Cantidad de cada instrumento.\n" +
        "  4. Cantidad de artistas en cada género.\n" +
        "  5. Artistas filtrados por cantidad mínima de discos.\n" +
        "  6. Artista con más entradas vendidas.\n" +
        "  7. Artista con mayor recaudación.\n" +
        "  8. Artistas filtrados por tener algún disco en año determinado.\n" +
        "  9. Artista con más copias vendidas en total."));

        switch (opcion) {
            case 1:
                console.log(artistasSolistas(artistas));
                break;
            case 2:
                let edad = Number(prompt("Introduce edad."));
                console.log(artistasPorEdad(edad, artistas));
                break;
            case 3:
                console.log(cantidadDeArtistasPorInstrumento(artistas));
                break;
            case 4:
                console.log(cantidadDeArtistasPorGenero(artistas));
                break;
            case 5:
                let cantidadDiscos = Number(prompt("Introduce cantidad de discos."));
                console.log(artistasConMasDiscosQue(cantidadDiscos, artistas));
                break;
            case 6:
                console.log(artistaConMasEntradasVendidas(artistas));
                break;
            case 7:
                console.log(artistaConMayorRecaudacion(artistas));
                break;
            case 8:
                let anyo = Number(prompt("Introduce año."));
                console.log(artistasConDiscoEnAnyo(anyo, artistas));
                break;
            case 9:
                console.log(artistaConMasCopias(artistas));
                break;
        }
} while (opcion !== 0);
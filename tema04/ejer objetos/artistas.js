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
                let solistas = artistasSolistas(artistas);
                let nombres = solistas.map(solista => solista.nombre);
                alert(nombres.join(" | "));
                break;
            case 2:
                
        }
} while (opcion !== 0);
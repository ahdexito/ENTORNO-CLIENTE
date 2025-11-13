// EJERCICIO 1
function estudiantesConMasAmigosQue(numAmigos, estudiantes) {
    
    // filtrar estudiante por número de amigos mínimo
    return estudiantes.filter(estudiante => estudiante.amigues.length >= numAmigos);
}


// EJERCICIO 2
function estudiantesPorHechizo(hechizo, estudiantes) {

    // filtrar estudiante por hechizo
    return estudiantes.filter(estudiante => estudiante.hechizoPreferido === hechizo);
}


// EJERCICIO 3
function obtenerAmigos(nombreCompletoEstudiante, estudiantes) {

     // encontrar y guardar estudiante
    const estudianteBuscado = estudiantes.find(estudiante => 
        (estudiante.nombreCompleto.nombre + " " + estudiante.nombreCompleto.apellido) === nombreCompletoEstudiante);
    
    // guardar los amigos en variable
    let amigos = estudianteBuscado.amigues;

    // definir array que devolverá nombres
    let nombres = [];

    for (let amigo of amigos) {
        // añadir al array cada nombre
        nombres.push(amigo.nombre);
    }

    return nombres;
}


// EJERCICIO 4
function promedioMateria(materiaNombre, estudiantes) {

    // definir variable
    let notas = [];

    for (let estudiante of estudiantes) {
        // buscar la materia en cada estudiante
        let materiaBuscada = estudiante.materias.find(materia => materia.nombre === materiaNombre);

        // guardar nota de la materia si la cursa
        let promedio = materiaBuscada.promedio;

        // guardar el promedio de cada alumno en array de notas
        if (promedio !== undefined) {
            notas.push(promedio);
        }
    }

    // sumar todas las notas
    let suma = notas.reduce((acum, nota) => acum + Number(nota), 0);

    // devolver la media
    return (suma / notas.length).toFixed(2);
}


// EJERCICIO 5
function mejorEstudianteEnMateria(materiaNombre, estudiantes) {

    // definir variables
    let mejorEstudiante = null;
    let promedioMax = 0;

    for (let estudiante of estudiantes) {
        // buscar la materia en cada estudiante
        let materiaBuscada = estudiante.materias.find(materia => materia.nombre === materiaNombre);

        // guardar nota de la materia si la cursa
        let promedio = materiaBuscada.promedio;

        // guardar el promedio más alto junto al estudiante que lo obtuvo
        if (promedio !== undefined && promedio > promedioMax) {
            promedioMax = promedio;
            mejorEstudiante = estudiante;
        }
    }

    // concatenar nombre y apellido del estudiante
    let nombreEstudiante = mejorEstudiante.nombreCompleto.nombre + " " + mejorEstudiante.nombreCompleto.apellido;

    return nombreEstudiante;
}
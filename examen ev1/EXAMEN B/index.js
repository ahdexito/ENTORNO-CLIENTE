
let menu = true;

while (menu) {
    var opcion = prompt(
    "Selecciona una opción:\n1. Estudiantes con más amigos que (número) \n2. Estudiantes por hechizo \n3. Amigos/as del estudiante \n4. Promedio materia \n5. Mejor estudiante en materia \n6. Salir");
    
    switch (opcion) {
        case "1":
            let numAmigos = prompt("Introduce número de amigos mínimo.");
            console.log(`Tienen más de ${numAmigos} amigos:\n-------------------------------`);
            console.log(estudiantesConMasAmigosQue(numAmigos, estudiantes));
            break;

        case "2":
            let hechizo = prompt("Introduce el hechizo preferizo.");
            console.log(`Hechizo ${hechizo} preferido por:\n-------------------------------`);
            console.log(estudiantesPorHechizo(hechizo, estudiantes));
            break;

        case "3":
            let nombreCompletoEstudiante = prompt("Introduce el nombre completo del estudiante.");
            console.log(`Amigos de ${nombreCompletoEstudiante}:\n-------------------------------`);
            console.log(obtenerAmigos(nombreCompletoEstudiante, estudiantes));
            break;

        case "4":
            let materiaPromedio = prompt("Introduce nombre de la materia.");
            console.log(`Promedio escuela para ${materiaPromedio}:\n-------------------------------`);
            console.log(promedioMateria(materiaPromedio, estudiantes));
        break;

        case "5":
            let materia = prompt("Introduce el nombre de la materia.");
            console.log(`Promedio más alto para materia ${materia}:\n-------------------------------`);
            console.log(mejorEstudianteEnMateria(materia, estudiantes));
        break;
        
        case "6":
            alert("Adiós!");
            menu = false;
        break;

    }
}
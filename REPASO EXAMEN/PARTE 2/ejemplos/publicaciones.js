/*
2. Gestión de "Race Conditions" y Carga Paralela

El reto: 

Te piden consultar dos APIs distintas que dependen entre sí, 
manejando los errores de ambas de forma elegante y 
optimizando el tiempo de espera.

El Problema:

Necesitas los datos de un Usuario y sus Publicaciones. 
Si intentas traer uno tras otro, el tiempo de espera se 
suma. Debes lanzarlos en paralelo y esperar a que ambos 
terminen, pero solo si el usuario existe.
*/


async function obtenerPerfilCompleto(userId) {
    try {
        // 1. Primera petición: Validar usuario
        const resUser = await fetch(`api/usuarios.php?id=${userId}`);
        if (!resUser.ok) throw new Error("Usuario no encontrado");
        const usuario = await resUser.json();

        // 2. Peticiones Paralelas (Optimización de tiempo)
        // Lanzamos las dos promesas al mismo tiempo
        const [resPosts, resAmigos] = await Promise.all([
            fetch(`api/posts.php?userId=${userId}`),
            fetch(`api/amigos.php?userId=${userId}`)
        ]);

        // 3. Conversión masiva
        const posts = await resPosts.json();
        const amigos = await resAmigos.json();

        // 4. Construcción de Objeto Complejo Final
        const perfilFull = {
            ...usuario, // Spread operator para copiar propiedades
            actividad: {
                totalPosts: posts.length,
                listaPosts: posts.slice(0, 5), // Solo los últimos 5
                amigosCercanos: amigos.filter(a => a.nivel > 3)
            },
            actualizado: new Date().toLocaleDateString()
        };

        console.log("Perfil consolidado:", perfilFull);
        return perfilFull;

    } catch (error) {
        // En un examen, el manejo de errores cuenta puntos extra
        document.getElementById('error-msg').textContent = error.message;
    }
}
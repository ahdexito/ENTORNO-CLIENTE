fetch('localhost:5001/personajes')

    .then(respuesta => {
        if (!respuesta.ok) {
            throw new Error(`Error: ${respuesta.status} ${respuesta.statusText}`);
        }

        return respuesta.json();
    })
    

    .then(personajes => {
        personajes.forEach(personaje => {
            
            
        });
    })
    
    .catch(error => {
        console.error("Fallo en la obtención de personajes:", error);
    });

import { personajes } from '../../Personajes_API_jsonmock/src/routes/personajes';
import { Mago } from './Mago.js';

const form = document.getElementById('formPerson');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nuevoMago = new Mago(
        document.getElementById('nombre').value,
        document.getElementById('casa').value
    );

    try {
        fetch('http://localhost:5001/personajes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoMago)
        });

    }
    catch (error) {
        console.error("Error al usar la API:", error);
    }
});
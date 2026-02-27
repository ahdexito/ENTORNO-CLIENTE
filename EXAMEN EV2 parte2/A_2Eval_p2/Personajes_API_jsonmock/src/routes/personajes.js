import express from 'express';


// Almacenamiento temporal de personajes
let personajes = [];

const personRouter = express.Router();

// Añadir personaje
personRouter.post('/', (req, res) => {
  const { nombre, casa, patronus, fechaNacimiento, sangre, varita } = req.body;
  
  const newPerson= {
    id: personajes.length + 1,
    nombre,
    casa,
    patronus,
    fechaNacimiento,
    sangre,
    varita
  };

  personajes.push(newPerson);

  res.status(201).json({
    message: 'Personaje añadido con éxito',
    data: newPerson
  });
});

// Obtener todos los personajes
personRouter.get('/', (req, res) => {
  res.json({
    message: 'Lista de personajes',
    data: personajes
  });
});

// Obtener personaje por ID
personRouter.get('/:id', (req, res) => {
  const personId = parseInt(req.params.id);
  
  if (personajes.find(person => person.id === personId)) {
    res.json({
      message: 'Personaje',
      data: personajes.filter(person => person.id == req.params.id)
    });
  } else {
    res.json({
      message: `Personaje con id ${personId} no encontrado`
    });
  }
});

// Borrar personaje por ID
personRouter.delete('/:id', (req, res) => {
  const personId = parseInt(req.params.id);
  const initialLength = personajes.length;
  personajes = personajes.filter(person => person.id !== personId);

  if (personajes.length < initialLength) {
    res.json({
      message: `Personaje con id ${personId} eliminado`,
      data: personajes
    });
  } else {
    res.status(404).json({
      message: `Personaje con id ${personId} no encontrado`
    });
  }
});

export default personRouter;

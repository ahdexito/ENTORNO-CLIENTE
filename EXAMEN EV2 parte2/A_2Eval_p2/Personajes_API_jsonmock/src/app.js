import {} from 'dotenv/config';
import express from 'express';
import cors from 'cors'; // Asegúrate de importar cors
import personajesRoutes from './routes/personajes.js';

const app = express();

const PORT = process.env.PORT || 3000;


// Habilitando CORS para todas las solicitudes
// cualquier dominio podrá acceder a los recursos
// app.use(cors());
app.use(cors({
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));


//-- Middlewares

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true }));
//--
app.use('/personajes', personajesRoutes);


// Ruta básica
app.get('/', (req, res) => {
  res.send('¡Hola mundo, desde Express!');
});

export default app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto: ${PORT}`);
});

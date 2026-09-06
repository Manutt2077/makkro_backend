const express = require('express');
const cors = require('cors');

const app = express();
const errorHandler = require('./middleware/errorHandlerMiddleware'); // <-- Asegúrate de que la ruta esté bien

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
const routes = require('./routes');
app.use('/api', routes);  // Todas las rutas van montadas aquí

// Ruta base de prueba
app.get('/', (req, res) => {
  res.send('API funcionando');
});


app.use(errorHandler);

module.exports = app;
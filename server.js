// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./services/sequelize');

// Rutas
const vehiculoRoutes = require('./routes/vehiculoRoutes');
const openaiService = require('./services/openaiService');

// Middleware de manejo de errores
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(bodyParser.json());

// Rutas de API
app.use('/vehiculos', vehiculoRoutes);

// Ruta para el chat
app.post('/chat', async (req, res, next) => {
  const { consulta, placa } = req.body;
  const vehiculoRepository = require('./repositories/vehiculoRepository');
  
  try {
    const vehiculoInfo = await vehiculoRepository.findByPlaca(placa);
  
    if (!vehiculoInfo) {
      return res.status(404).json({
        respuesta: 'No existe información para el vehículo consultado.',
        metodologia: 'Se valida la existencia del vehículo antes de procesar la consulta.'
      });
    }
  
    const respuestaChat = await openaiService.getChatResponse(consulta, vehiculoInfo);
    res.json(respuestaChat);
  } catch (error) {
    next(error);
  }
});

// Middleware de errores (siempre al final de la cadena de middlewares)
app.use(errorHandler);

// Sincronizar la base de datos y arrancar el servidor
sequelize.sync({ force: false })  // force: true recrea tablas (útil en desarrollo)
  .then(() => {
    console.log('Base de datos sincronizada');
    app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
  })
  .catch(error => console.error('Error sincronizando la base de datos:', error));

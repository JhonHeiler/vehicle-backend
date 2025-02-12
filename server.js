// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./services/sequelize');

// Importar rutas
const vehiculoRoutes = require('./routes/vehiculoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/vehiculos', vehiculoRoutes);

// Ruta para el chat (por ejemplo, /chat)
app.post('/chat', async (req, res) => {
    const { consulta, placa } = req.body;
    const Vehiculo = require('./models/vehiculo');
  
    try {
      // Buscar vehículo en la base de datos
      const vehiculoInfo = await Vehiculo.findOne({ where: { placa } });
  
      if (!vehiculoInfo) {
        return res.json({
          respuesta: 'No existe información para el vehículo consultado.',
          metodologia: 'La respuesta se genera validando la existencia del vehículo en la base de datos antes de consultar el modelo de lenguaje.'
        });
      }
  
      // Si existe el vehículo, generar la respuesta con OpenAI
      const openaiService = require('./services/openaiService');
      const respuestaChat = await openaiService.getChatResponse(consulta, vehiculoInfo);
  
      res.json(respuestaChat);
    } catch (error) {
      console.error("Error en el servidor:", error);
      res.status(500).json({
        respuesta: "Hubo un error al procesar la solicitud.",
        metodologia: "Error en la validación de la base de datos o en la llamada a OpenAI."
      });
    }
  });
  

// Sincronizar la base de datos y arrancar el servidor
sequelize.sync({ force: false })  // force:true recrea tablas (útil en desarrollo)
  .then(() => {
    console.log('Base de datos sincronizada');
    app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
  })
  .catch(error => console.error('Error sincronizando la base de datos:', error));

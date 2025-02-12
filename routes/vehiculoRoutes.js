// backend/routes/vehiculoRoutes.js
const express = require('express');
const router = express.Router();
const vehiculoController = require('../../backend/controllers/vehiculoController');

// Endpoints
router.get('/', vehiculoController.getAll);
router.post('/', vehiculoController.create);
router.put('/:id', vehiculoController.update);
router.delete('/:id', vehiculoController.delete);
// Ruta específica para buscar vehículo por placa
router.get('/placa/:placa', vehiculoController.findByPlaca);

module.exports = router;

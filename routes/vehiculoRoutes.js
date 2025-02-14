// backend/routes/vehiculoRoutes.js
const express = require('express');
const router = express.Router();
const vehiculoController = require('../controllers/vehiculoController');

router.get('/', (req, res, next) => vehiculoController.getAll(req, res, next));
router.post('/', (req, res, next) => vehiculoController.create(req, res, next));
router.put('/:id', (req, res, next) => vehiculoController.update(req, res, next));
router.delete('/:id', (req, res, next) => vehiculoController.delete(req, res, next));
router.get('/placa/:placa', (req, res, next) => vehiculoController.findByPlaca(req, res, next));

module.exports = router;

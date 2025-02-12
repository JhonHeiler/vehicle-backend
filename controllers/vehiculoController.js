// backend/controllers/vehiculoController.js
const Vehiculo = require('../models/vehiculo');

// Obtener todos los vehículos
exports.getAll = async (req, res) => {
  try {
    const vehiculos = await Vehiculo.findAll();
    res.json(vehiculos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Agregar un vehículo
exports.create = async (req, res) => {
  try {
    const { placa, marca, modelo, serie, color } = req.body;
    const nuevoVehiculo = await Vehiculo.create({ placa, marca, modelo, serie, color });
    res.json(nuevoVehiculo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un vehículo
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { placa, marca, modelo, serie, color } = req.body;
    await Vehiculo.update({ placa, marca, modelo, serie, color }, { where: { id } });
    res.json({ message: 'Vehículo actualizado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un vehículo
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    await Vehiculo.destroy({ where: { id } });
    res.json({ message: 'Vehículo eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buscar vehículo por placa
exports.findByPlaca = async (req, res) => {
  try {
    const { placa } = req.params;
    const vehiculo = await Vehiculo.findOne({ where: { placa } });
    if (vehiculo) {
      res.json(vehiculo);
    } else {
      res.status(404).json({ message: 'Vehículo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

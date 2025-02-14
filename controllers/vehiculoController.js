const vehiculoRepository = require('../repositories/vehiculoRepository');

class VehiculoController {
  async getAll(req, res, next) {
    try {
      const vehiculos = await vehiculoRepository.findAll();
      res.json(vehiculos);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const { placa, marca, modelo, serie, color } = req.body;
      const nuevoVehiculo = await vehiculoRepository.create({ placa, marca, modelo, serie, color });
      res.status(201).json(nuevoVehiculo);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { placa, marca, modelo, serie, color } = req.body;
      const updatedRows = await vehiculoRepository.update(id, { placa, marca, modelo, serie, color });
      if (updatedRows === 0) {
        return res.status(404).json({ message: 'Vehículo no encontrado' });
      }
      res.json({ message: 'Vehículo actualizado' });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const deletedRows = await vehiculoRepository.delete(id);
      if (deletedRows === 0) {
        return res.status(404).json({ message: 'Vehículo no encontrado' });
      }
      res.json({ message: 'Vehículo eliminado' });
    } catch (error) {
      next(error);
    }
  }

  async findByPlaca(req, res, next) {
    try {
      const { placa } = req.params;
      const vehiculo = await vehiculoRepository.findByPlaca(placa);
      if (!vehiculo) {
        return res.status(404).json({ message: 'Vehículo no encontrado' });
      }
      res.json(vehiculo);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new VehiculoController();

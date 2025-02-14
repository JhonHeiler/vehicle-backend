const Vehiculo = require('../models/vehiculo');

class VehiculoRepository {
  async findAll() {
    return await Vehiculo.findAll();
  }

  async findById(id) {
    return await Vehiculo.findByPk(id);
  }

  async findByPlaca(placa) {
    return await Vehiculo.findOne({ where: { placa } });
  }

  async create(vehiculoData) {
    return await Vehiculo.create(vehiculoData);
  }

  async update(id, vehiculoData) {
    const [updatedRows] = await Vehiculo.update(vehiculoData, { where: { id } });
    return updatedRows;
  }

  async delete(id) {
    return await Vehiculo.destroy({ where: { id } });
  }
}

module.exports = new VehiculoRepository();

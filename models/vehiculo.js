const { DataTypes } = require('sequelize');
const sequelize = require('../services/sequelize'); // crearemos este servicio para instanciar Sequelize

const Vehiculo = sequelize.define('Vehiculo', {
  placa: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  marca: {
    type: DataTypes.STRING,
    allowNull: false
  },
  modelo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  serie: {
    type: DataTypes.STRING,
    allowNull: false
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Vehiculo;

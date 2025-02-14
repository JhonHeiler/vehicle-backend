// backend/services/sequelize.js
const { Sequelize } = require('sequelize');
const config = require('../config').development;

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: false // Suprime logs en consola
});

module.exports = sequelize;

// backend/config.js
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'usuario',
    password: process.env.DB_PASSWORD || 'usuariopassword',
    database: process.env.DB_NAME || 'vehiculosdb',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql'
  }
};

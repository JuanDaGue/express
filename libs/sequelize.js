const { Sequelize } = require('sequelize');
const { config } = require('./../config/config');
const setupModels = require('./../db/models');

// Encode credentials to handle special characters
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

// Construct URI with encoded user and password
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: console.log, // Use console.log to avoid deprecation warning
  dialectOptions: { connectTimeout: 120000 } // 60 seconds timeout
});

// Initialize models with sequelize
setupModels(sequelize);

module.exports = sequelize;

const { Sequelize } = require('sequelize');
const { config } = require('./../config/config');
const setupModels = require('./../../db/models');

// // Encode credentials to handle special characters
// const USER = encodeURIComponent(config.dbUser);
// const PASSWORD = encodeURIComponent(config.dbPassword);

// // Construct URI with encoded user and password
// const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const options ={
  dialect:'postgres',
  logging: config.isProd? false: console.log,
}
if(config.isProd){
  options.ssl={
    require: true,
    rejectUnauthorized: false
  }
}

const sequelize = new Sequelize(config.dbUrl, options);

// Initialize models with sequelize
setupModels(sequelize);

module.exports = sequelize;

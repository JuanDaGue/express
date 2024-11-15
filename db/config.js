const {config} = require('./../api/config/config')


// const USER= encodeURIComponent(config.dbUser)
// const PASSWORD= encodeURIComponent(config.dbPassword)

// const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`
// console.log(URI)

module.exports = {
  development: {
    url: config.dbUrl,
    dialect: 'postgres',
  },
  production: {
    url: config.dbUrl,
    dialect: 'postgres',
    ssl:{
      rejectUnauthorized: false
    },
  }
}

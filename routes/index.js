const express= require('express')

const productsRouter = require('./products')
const categoryRouter = require('./categories')
const usersRouter = require('./users')

function routerApi(app){
  const router = express.Router();
  app.use('/api/v1', router)
  router.use('/products', productsRouter)
  router.use('/categories', categoryRouter)
  router.use('/user', usersRouter)
}
module.exports = routerApi;

const express= require('express')

const productsRouter = require('./products')
const categoryRouter = require('./categories')
const usersRouter = require('./users')
const ordersRouter = require('./orders')
const customersRouter = require('./customers')
const authRouter = require('./auth')
const profileRouter = require('./profile')

function routerApi(app){
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/categories', categoryRouter);
  router.use('/users', usersRouter);
  router.use('/orders', ordersRouter);
  router.use('/customers', customersRouter);
  router.use('/auth', authRouter);
  router.use('/profile', profileRouter);

}
module.exports = routerApi;

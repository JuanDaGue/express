const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { config } = require('./../config/config');

const OrderServices = require('./../services/order');

const router = express.Router();


const service = new OrderServices();

router.get('/my-orders',
  passport.authenticate('jwt', {session:false}),
  async (req, res, next) => {
    try {
      const user= req.user
      const orders= await service.findByUser(user.sub);

      res.status(201).json({user,orders });
    } catch (error) {
      next(error);
    }
  }
);



module.exports = router;

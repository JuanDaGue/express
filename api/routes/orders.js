const express = require('express');
const { validatorHandler } = require('./../middlewares/validator.handler');
const { createOrderSchema, updateOrderSchema, getOrderSchema, addItemSchema } = require('../schemas/order.schema');
const router = express.Router();
const OrderServices = require('./../services/order'); // Update to OrderServices
const service = new OrderServices();

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await service.find();
    res.json(orders);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

// Get an order by ID
router.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  }
);

// Create a new order
router.post('/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const order = await service.create(body);
      res.status(201).json({
        message: 'Order created',
        data: order,
      });
    } catch (error) {
      next(error)
    }
  }
);

// addItem
router.post('/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItem = await service.addItem(body);
      res.status(201).json({
        message: 'Order created',
        data: newItem,
      });
    } catch (error) {
      next(error);
    }
  }
);
// Update an order by ID
router.patch('/:id',
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(updateOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedOrder = await service.update(id, body);
      res.json({
        message: 'Order updated',
        data: updatedOrder,
      });
    } catch (error) {
      next(error)
    }
  }
);

// Delete an order by ID
router.delete('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.json({
        message: 'Order deleted',
        id,
      });
    } catch (error) {
      next(error)
    }
  }
);

module.exports = router;

const Joi = require('joi');

// Define the properties for the Order schema
const id = Joi.number().integer();
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().integer();
const customerId = Joi.number().integer().required();
const price = Joi.number().integer().min(1).required();
const createdAt = Joi.date();

// Define schema for creating a new order
const createOrderSchema = Joi.object({
  customerId,
});

// Define schema for updating an order (all fields are optional)
const updateOrderSchema = Joi.object({
  customerId: Joi.number().integer(),
  price: Joi.number().integer().min(1),
  createdAt
});

// Define schema for retrieving a specific order by its ID
const getOrderSchema = Joi.object({
  id: id.required(),
});

const addItemSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required(),
})
module.exports = { createOrderSchema, updateOrderSchema, getOrderSchema, addItemSchema };

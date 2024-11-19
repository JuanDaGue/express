const Joi = require('joi');


const id  = Joi.number().integer();
const name = Joi.string().min(3).max(25);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();
const description = Joi.string().min(10);
const categoryId  = Joi.number().integer();
const limit  = Joi.number().integer();
const offset  = Joi.number().integer();
const price_min = Joi.number().integer().min(10);
const price_max = Joi.number().integer().min(10);

const creatProductSchema = Joi.object({
  name:name.required(),
  price:price.required(),
  image: image.required(),
  description: description.required(),
  categoryId:categoryId.required(),
})

const updatedProductSchema = Joi.object({
  name:name,
  price:price,
  description: description,
  image: image,
  categoryId
})
const getProductSchema = Joi.object({
  id:id.required(),
})
const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  price_min,
  price_max: Joi.when('price_min', {
    is: Joi.number().integer(),
    then: Joi.required(),
  })
})
module.exports={getProductSchema,updatedProductSchema,creatProductSchema,queryProductSchema}

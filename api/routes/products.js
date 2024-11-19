const express = require('express');
const {validatorHandler} =require('./../middlewares/validator.handler')
const {creatProductSchema,updatedProductSchema,getProductSchema,queryProductSchema}= require('./../schemas/products.schema')
const router = express.Router();
const ProductServices = require('./../services/products');
const service = new ProductServices();

// Products
router.get('/',
  validatorHandler(queryProductSchema,'query'),
  async (req,res, next)=>{
    try {
      const products =await  service.find(req.query);
      res.json(products)
    } catch (error) {
      next(error);
  }

});

router.get('/filter',async (req,res)=>{
  res.send(`I'm a Filter`)
})

router.get('/:id',
  validatorHandler(getProductSchema,'params'),
  async (req,res,next)=>{
    try {
      const {id} = req.params;
      product= await service.findOne(id)
      res.status(200).json(product);
    } catch (error) {
      next(error)
    }
});

router.post('/',
  validatorHandler(creatProductSchema,'body'),
  async (req, res, next)=>{
    try {

      const body = req.body;
      const product= await service.create(body)
      res.status(201).json({
        message:'created',
        data:product,
      })
    } catch (error) {
      next(error)
    }
})

router.put('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updatedProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params; // Ensure id is properly extracted
      const body = req.body; // Extract body from the request
      const updatedProduct = await service.update(id, body); // Call the update method
      res.json({
        message: 'Updated successfully',
        data: updatedProduct,
        id,
      });
    } catch (error) {
      next(error);
    }
  }
);


router.patch('/:id',
  validatorHandler(getProductSchema,'params'),
  validatorHandler(updatedProductSchema,'body'),
  async (req,res,next)=>{
    try {

      const {id} = req.params;
      const body = req.body
      const updated= await service.update(id, body)
      res.json({
        message:'Partial updated',
        data: updated,
        id,
      });
    } catch (error) {
      next(error)
    }
})


router.delete('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params; // Ensure id is properly extracted
      const deletedProduct = await service.delete(id); // Call the delete method
      res.json({
        message: 'Deleted successfully',
        id: deletedProduct.id, // Return the id of the deleted product
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router

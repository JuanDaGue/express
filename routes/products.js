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

router.put('/:id',async (req,res)=>{
  if(id === 999){
    res.status(404).json({
      message:'no founnd'
    })
  }
  const {id} = req.params;
  const body = await req.body
  res.json({
    message:'Updated',
    data: body,
    id,
  });
})

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
  validatorHandler(getProductSchema,'params'),
  async (req,res,next)=>{
    try {
      const {id} = req.params;
      await service.delete(id)
      res.json({
        message:'Delete',
        id,
      });
    } catch (error) {
      next(error)
    }

})

module.exports = router

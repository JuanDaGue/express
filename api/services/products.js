
const {faker} = require('@faker-js/faker')
const boom = require('@hapi/boom')
const {models} = require('../libs/sequelize');
const {Op } = require('sequelize');

class ProductServices {

    constructor(){
      this.products=[];
      this.generate();
    }
    async generate (){
      const limit= 100
      for (let i=0; i<limit; i++) {
        this.products.push({
          id: faker.string.uuid(),
          name: faker.commerce.productName(),
          price: parseInt(faker.commerce.price(),10),
          image: faker.image.url(),
        })
      }
    }
    async create (data){
      const newProduct = await models.Product.create(data)
      return newProduct;
    }
    async find (query){
      const options={
        include: ['category'],
        where:{}
      }
      const {limit, offset} = query;

      if(limit && offset){
        options.limit=limit;
        options.offset=offset
      }
      const { price }= query;
      if(price){
        options.where.price = price;
      }

      const { price_min, price_max }= query;
      if(price_min && price_max){
        options.where.price ={
          [Op.gte]: price_min,
          [Op.lte]: price_max,
        };
      }
      const products = await models.Product.findAll(options)
      return products

    }
    async findOne(id) {
      const product = await models.Product.findByPk(id);
      if (!product) {
        throw boom.notFound('product not found');
      }
      if (product.isBlock) {
        throw boom.conflict('product is block');
      }
      return product;
    }
    async update (id,changes){
      const index = this.products.findIndex(elem => elem.id === id);
      if(index===-1){
        throw boom.notFound('Product no found');
      }
      const product=this.products[index]
      this.products[index]={...product,...changes};

      return this.products[index];
    }
    async delete (id){
      const index = this.products.findIndex(elem => elem.id === id);
      if(index===-1){
        throw boom.notFound('Product no found');
      }
      this.products.splice(index, 1);
      return {id};
    }
}

module.exports= ProductServices

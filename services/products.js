
const {faker} = require('@faker-js/faker')
const boom = require('@hapi/boom')
const {models} = require('../libs/sequelize')

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
      }
      const {limit, offset} = query;

      if(limit && offset){
        options.limit=limit;
        options.offset=offset
      }
      console.log(limit,offset)
      const products = await models.Product.findAll(options)
      return products

    }
    async findOne(id) {
      const product = this.products.find(item => item.id === id);
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

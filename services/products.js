
const {faker} = require('@faker-js/faker')
const boom = require('@hapi/boom')
const sequelize = require('../libs/sequelize')
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
      const newProduct = {
        id: faker.string.uuid(),
        ...data
      }
      this.products.push(newProduct);
      return newProduct;
    }
    async find (){
      const query= 'SELECT * FROM tasks';
      const [data] = await sequelize.query(query)
      return {data}

    }
    async findOne(id) {
      const product = this.products.find(elem => elem.id === id);
      if (!product) {
        throw boom.notFound('Product not found');
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

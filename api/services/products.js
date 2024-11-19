
const {faker} = require('@faker-js/faker')
const boom = require('@hapi/boom')
const {models} = require('../libs/sequelize');
const {Op } = require('sequelize');

class ProductServices {
  constructor() {}

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(query) {
    const options = {
      include: ['category'], // Ensure category is defined in associations
      where: {},
    };

    const { limit, offset, price, price_min, price_max } = query;

    // Pagination
    if (limit && offset) {
      options.limit = parseInt(limit, 10);
      options.offset = parseInt(offset, 10);
    }

    // Exact price filtering
    if (price) {
      options.where.price = price;
    }

    // Price range filtering
    if (price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max,
      };
    }

    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('Product is blocked');
    }
    return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id); // Reuse `findOne` to check if the product exists
    const updatedProduct = await product.update(changes); // Update directly on the Sequelize instance
    return updatedProduct;
  }

  async delete(id) {
    const product = await this.findOne(id); // Reuse `findOne` to check if the product exists
    await product.destroy(); // Delete directly using the Sequelize instance
    return { id };
  }
}

module.exports = ProductServices;

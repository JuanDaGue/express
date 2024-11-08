const boom = require('@hapi/boom');
const {models} = require('./../libs/sequelize')

class CategoryService {

  constructor(){
  }
  async create(data) {
    const newCategory= await models.Category.create(data);
    return newCategory;
  }

  async find() {
    return await models.Category.findAll();
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include:['products']
    })
    if (!category) {
      throw boom.notFound('category not found');
    }
    return category;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

}

module.exports = CategoryService;

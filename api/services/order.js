const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class OrderService {

  constructor() {}

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async find() {
    const orders = await models.Order.findAll({
      include: ['customer'], // include related data, e.g., customer details
    });
    return orders;
  }
  // find by user
  async findByUser(userId) {
    const orders = await models.Order.findAll( {
      where: {
        '$customer.user.id$': userId
      },
      include: [{
        association: 'customer',
        include: ['user']
      }],
    });
    return orders;
  }
  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [{
        association: 'customer',
        include: ['user']
      }, 'items'],
    });
    if (!order) {
      throw boom.notFound('Order not found');
    }
    return order;
  }

  async update(id, changes) {
    const order = await this.findOne(id); // reuse findOne to handle error if order doesn't exist
    const updatedOrder = await order.update(changes);
    return updatedOrder;
  }

  async delete(id) {
    const order = await this.findOne(id); // reuse findOne to handle error if order doesn't exist
    await order.destroy();
    return { id };
  }
}

module.exports = OrderService;

'use strict';
const { ORDER_PRODUCT_TABLE } = require('../models/order-product.model');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.renameColumn(ORDER_PRODUCT_TABLE, 'ammount', 'amount');
  },

  async down (queryInterface) {
    await queryInterface.renameColumn(ORDER_PRODUCT_TABLE, 'amount', 'ammount');
  }
};

'use strict';
const {USER_TABLE} = require('../models/user.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn(USER_TABLE, 'create_at', 'created_at')
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn(USER_TABLE, 'created_at', 'create_at');
  }
};

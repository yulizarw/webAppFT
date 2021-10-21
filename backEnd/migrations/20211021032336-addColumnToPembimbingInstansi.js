'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('pembimbingInstansis', 'instansiId', Sequelize.INTEGER)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropColumn('pembimbingInstansis', 'instansiId')
  }
};

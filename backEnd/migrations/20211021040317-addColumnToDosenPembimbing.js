'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('dosenPembimbings', 'prodiId', Sequelize.INTEGER)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropColumn('dosenPembimbings', 'prodiId')
  }
};

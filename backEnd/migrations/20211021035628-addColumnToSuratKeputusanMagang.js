'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('suratKeputusanMagangs', 'dikjarId', Sequelize.INTEGER)
    await queryInterface.addColumn('suratKeputusanMagangs', 'pembimbingInstansiId', Sequelize.INTEGER)
    await queryInterface.addColumn('suratKeputusanMagangs', 'dosenPembimbingId', Sequelize.INTEGER)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropColumn('suratKeputusanMagangs', 'dikjarId')
    await queryInterface.dropColumn('suratKeputusanMagangs', 'pembimbingInstansiId')
    await queryInterface.dropColumn('suratKeputusanMagangs', 'dosenPembimbingId')
  }
};

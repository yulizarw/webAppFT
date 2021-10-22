'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('suratKeputusanMagangs', 'dikjarId', Sequelize.INTEGER)
    await queryInterface.addColumn('suratKeputusanMagangs', 'pembimbingInstansiId', Sequelize.INTEGER)
    await queryInterface.addColumn('suratKeputusanMagangs', 'dosenPembimbingId', Sequelize.INTEGER)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('suratKeputusanMagangs', 'dikjarId')
    await queryInterface.removeColumn('suratKeputusanMagangs', 'pembimbingInstansiId')
    await queryInterface.removeColumn('suratKeputusanMagangs', 'dosenPembimbingId')
  }
};

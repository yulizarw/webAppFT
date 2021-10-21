'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('suratMagangInstansis', 'formulirPersetujuanId', Sequelize.INTEGER)
    await queryInterface.addColumn('suratMagangInstansis', 'dikjarId', Sequelize.INTEGER)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropColumn('suratMagangInstansis', 'formulirPersetujuanId')
    await queryInterface.dropColumn('suratMagangInstansis', 'dikjarId')
  }
};

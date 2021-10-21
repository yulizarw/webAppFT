'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('suratPersetujuanInstansis', 'suratMagangInstansiId', Sequelize.INTEGER)
    await queryInterface.addColumn('suratPersetujuanInstansis', 'instansiId', Sequelize.INTEGER)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropColumn('suratPersetujuanInstansis', 'suratMagangInstansiId')
    await queryInterface.dropColumn('suratPersetujuanInstansis', 'instansiId')
  }
};

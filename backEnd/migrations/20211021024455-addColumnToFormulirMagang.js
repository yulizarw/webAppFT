'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('FormulirMagangs', 'mahasiswaId', Sequelize.INTEGER)
    await queryInterface.addColumn('FormulirMagangs', 'prodiId', Sequelize.INTEGER)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('FormulirMagangs', 'mahasiswaId')
    await queryInterface.removeColumn('FormulirMagangs', 'prodiId')
  }
};

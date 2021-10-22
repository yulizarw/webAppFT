'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try{
      await queryInterface.addColumn('formulirPersetujuans', 'formulirMagangId', Sequelize.INTEGER)
      await queryInterface.addColumn('formulirPersetujuans', 'kaprodiId', Sequelize.INTEGER)
    }catch{

    }
  },

  down: async (queryInterface, Sequelize) => {
    try{
      await queryInterface.dropColumn('formulirPersetujuans', 'formulirMagangId')
      await queryInterface.removeColumn('formulirPersetujuans', 'kaprodiId')
    }catch{

    }
  }
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try{
      await queryInterface.addColumn('formulirPersetujuans', 'formulirMagangId', Sequelize.INTEGER)
      await queryInterface.addColumn('formulirPersetujuans', 'kaprodiId', Sequelize.INTEGER)
      await queryInterface.addColumn('formulirPersetujuans', 'prodiId', Sequelize.INTEGER)
    }catch{

    }
  },

  down: async (queryInterface, Sequelize) => {
    try{
      await queryInterface.removeColumn('formulirPersetujuans', 'formulirMagangId')
      await queryInterface.removeColumn('formulirPersetujuans', 'kaprodiId')
      await queryInterface.removeColumn('formulirPersetujuans', 'prodiId', Sequelize.INTEGER)
    }catch{

    }
  }
};

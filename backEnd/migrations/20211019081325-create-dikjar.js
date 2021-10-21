'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('dikjars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      namaDikjar: {
        type: Sequelize.STRING
      },
      satuanKerja: {
        type: Sequelize.STRING
      },
      emailDikjar: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      role :{
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('dikjars');
  }
};
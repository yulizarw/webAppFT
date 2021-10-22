'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('dosenPembimbings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      namaDosen: {
        type: Sequelize.STRING
      },
      programStudi: {
        type: Sequelize.STRING
      },
      bidangKepakaran: {
        type: Sequelize.STRING
      },
      emailDospem: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      jabatanAkademik: {
        type: Sequelize.STRING
      },
      role:{
        type:Sequelize.STRING
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
    await queryInterface.dropTable('dosenPembimbings');
  }
};
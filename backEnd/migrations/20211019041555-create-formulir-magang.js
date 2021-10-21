'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('FormulirMagangs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      namaPemohon: {
        type: Sequelize.STRING
      },
      nimPemohon: {
        type: Sequelize.DOUBLE
      },
      prodiPemohon: {
        type: Sequelize.STRING
      },
      namaInstansi: {
        type: Sequelize.STRING
      },
      alamatInstansi: {
        type: Sequelize.STRING
      },
      waktuPKL: {
        type: Sequelize.STRING
      },
      catatan: {
        type: Sequelize.STRING
      },
      peminatanPemohon: {
        type: Sequelize.STRING
      },
      namaDosenPembimbing: {
        type: Sequelize.STRING
      },
      rekomendasiKaprodi: {
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
    await queryInterface.dropTable('FormulirMagangs');
  }
};
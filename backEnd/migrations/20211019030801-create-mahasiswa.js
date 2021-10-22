'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Mahasiswas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      namaMahasiswa: {
        type: Sequelize.STRING
      },
      nim: {
        type: Sequelize.DOUBLE
      },
      programStudi: {
        type: Sequelize.STRING
      },
      jenisKelamin: {
        type: Sequelize.STRING
      },
      tahunAngkatan: {
        type: Sequelize.DOUBLE
      },
      semester: {
        type: Sequelize.DOUBLE
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      tanggalLahir: {
        type: Sequelize.DATE
      },
      tempatLahir: {
        type: Sequelize.STRING
      },
      ipk: {
        type: Sequelize.DOUBLE
      },
      bidangPeminatan: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.STRING
      },
      namaOrangTua: {
        type: Sequelize.STRING
      },
      statusAkademik: {
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
    await queryInterface.dropTable('Mahasiswas');
  }
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dikjar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  dikjar.init({
    namaDikjar: {
      type:DataTypes.STRING,
      validate:{
        msg:'Nama Tenaga Kependidikan harus diisi'
      }
    },
    satuanKerja: {
      type:DataTypes.STRING,
      validate:{
        msg:'Satuan Kerja Tenaga Kependidikan harus diisi'
      }
    },
    emailDikjar: {
      type:DataTypes.STRING,
      validate:{
        msg:'Email Tenaga Kependidikan harus diisi'
      }
    },
    password: {
      type:DataTypes.STRING,
      validate:{
        msg:'Password harus diisi'
      }
    }
  }, {
    sequelize,
    modelName: 'dikjar',
  });
  return dikjar;
};
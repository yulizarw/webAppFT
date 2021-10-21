'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pembimbingInstansi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  pembimbingInstansi.init({
    namaPembimbing: {
      type:DataTypes.STRING,
      validate:{
        msg:'Nama Pembimbing Instansi harus diisi'
      }
    },
    email: {
      type:DataTypes.STRING,
      validate:{
        msg:'Email Pembimbing Instansi harus diisi'
      }
    },
    password: {
      type:DataTypes.STRING,
      validate:{
        msg:'Password harus diisi'
      }
    },
    jabatan: {
      type:DataTypes.STRING,
      validate:{
        msg:'Jabatan Pembimbing Instansi harus diisi'
      }
    },
    satuanKerja: {
      type:DataTypes.STRING,
      validate:{
        msg:'Satuan Kerja Pembimbing Instansi harus diisi'
      }
    },
  }, {
    sequelize,
    modelName: 'pembimbingInstansi',
  });
  return pembimbingInstansi;
};
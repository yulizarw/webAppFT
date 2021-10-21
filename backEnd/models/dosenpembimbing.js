'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dosenPembimbing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  dosenPembimbing.init({
    namaDosen: {
      type:DataTypes.STRING,
      validate:{
        msg:'Nama Dosen Pembimbing harus diisi'
      }
    },
    prodi:{
      type:DataTypes.STRING,
      validate:{
        msg:'Program Studi harus diisi'
      }
    },
    bidangKepakaran: {
      type:DataTypes.STRING,
      validate:{
        msg:'Bidang Kepakaran harus diisi'
      }
    },
    emailDospem: {
      type:DataTypes.STRING,
      validate:{
        msg:'Email dosen pembimbing harus diisi'
      }
    },
    password: {
      type:DataTypes.STRING,
      validate:{
        msg:'Password harus diisi'
      }
    },
    jabatanAkademik: {
      type:DataTypes.STRING,
      validate:{
        msg:'Jabatan Akademik harus diisi'
      }
    }
  }, {
    sequelize,
    modelName: 'dosenPembimbing',
  });
  return dosenPembimbing;
};
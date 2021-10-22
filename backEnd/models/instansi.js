'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class instansi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      instansi.hasMany(models.suratPersetujuanInstansi,{foreignKey:'instansiId'})
      instansi.hasMany(models.pembimbingInstansi,{foreignKey:'instansiId'})
    }
  };
  instansi.init({
    namaInstansi: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Nama Instansi harus diisi'
        }
      }
    },
    bidangBisnis: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Bidang Instansi harus diisi'
        }
      }
    },
    alamat: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Alamat Instansi harus diisi'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'instansi',
  });
  return instansi;
};
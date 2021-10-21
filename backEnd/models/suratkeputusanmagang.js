'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class suratKeputusanMagang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      suratKeputusanMagang.belongsTo(models.pembimbingInstansi,{foreignKey:'pembimbingInstansiId'})
      suratKeputusanMagang.belongsTo(models.dikjar,{foreignKey:'dikjarId'})
      suratKeputusanMagang.belongsTo(models.dosenPembimbing,{foreignKey:'dosenPembimbingId'})
    }
  };
  suratKeputusanMagang.init({
    namaDekan: {
      type:DataTypes.STRING,
      validate:{
        msg:'Nama Dekan harus diisi'
      }
    },
    jabatanDekan: {
      type:DataTypes.STRING,
      validate:{
        msg:'Jabatan harus diisi'
      }
    },
    tanggalDisetujui: {
      type:DataTypes.DATE,
      validate:{
        msg:'Tanggal disetujui harus diisi'
      }
    }
  }, {
    sequelize,
    modelName: 'suratKeputusanMagang',
  });
  return suratKeputusanMagang;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class suratMagangInstansi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      suratMagangInstansi.belongsTo(models.formulirPersetujuan,{foreignKey:'formulirPersetujuanId'})
      suratMagangInstansi.belongsTo(models.dikjar,{foreignKey:'dikjarId'})
      suratMagangInstansi.hasOne(models.suratPersetujuanInstansi,{foreignKey:'suratMagangInstansiId'})
    }
  };
  suratMagangInstansi.init({
    dasarHukum: {
      type:DataTypes.STRING,
      validate:{
        msg:'Harap isi dasar hukum'
      }
    }
  }, {
    sequelize,
    modelName: 'suratMagangInstansi',
  });
  return suratMagangInstansi;
};
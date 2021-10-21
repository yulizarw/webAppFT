'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class formulirPersetujuan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      formulirPersetujuan.belongsTo(models.FormulirMagang,{foreignKey:'formulirMagangId'})
      formulirPersetujuan.belongsTo(models.kaprodi,{foreignKey:'kaprodiId'})
      formulirPersetujuan.hasOne(models.suratMagangInstansi, {foreignKey:'formulirPersetujuanId'})
    }
  };
  formulirPersetujuan.init({
    statusPengajuan: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Status pengajuan PKL harus diisi'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'formulirPersetujuan',
  });
  return formulirPersetujuan;
};
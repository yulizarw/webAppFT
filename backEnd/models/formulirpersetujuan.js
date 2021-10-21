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
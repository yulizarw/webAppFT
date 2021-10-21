'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class suratPersetujuanInstansi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  suratPersetujuanInstansi.init({
    statusPersetujuan: {
      type:DataTypes.STRING,
      validate:{
        msg:'Status Persetujuan Instansi harus diisi'
      }
    }
  }, {
    sequelize,
    modelName: 'suratPersetujuanInstansi',
  });
  return suratPersetujuanInstansi;
};
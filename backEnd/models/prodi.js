'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class prodi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  prodi.init({
    namaProdi: {
      type:DataTypes.STRING,
      validate:{
        msg:'Nama Program Studi harus diisi'
      }
    },
    peminatan: {
      type:DataTypes.STRING,
      validate:{
        msg:'Peminatan Program Studi harus diisi'
      }
    }
  }, {
    sequelize,
    modelName: 'prodi',
  });
  return prodi;
};
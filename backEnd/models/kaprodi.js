'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class kaprodi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  kaprodi.init({
    namaKaprodi: {
      type:DataTypes.STRING,
      validate:{
        msg:'Nama Kaprodi harus diisi'
      }
    },
    emailKaprodi:{
      type:DataTypes.STRING,
      validate:{
        msg:'Email Kaprodi harus diisi'
      }
    },
    passwordKaprodi: {
      type:DataTypes.STRING,
      validate:{
        msg:'Password Kaprodi harus diisi'
      }
    },
    role: {
      type:DataTypes.STRING,
      validate:{
        msg:'Role harus diisi'
      }
    }
  }, {
    sequelize,
    modelName: 'kaprodi',
  });
  return kaprodi;
};
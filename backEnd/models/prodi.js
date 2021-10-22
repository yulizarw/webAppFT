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
      prodi.hasMany(models.dosenPembimbing,{foreignKey:'prodiId'})
      prodi.hasOne(models.kaprodi,{foreignKey:'prodiId'})
      prodi.hasMany(models.Mahasiswa,{foreignKey:'prodiId'})
    }
  };
  prodi.init({
    namaProdi: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Nama Program Studi harus diisi'
        }
      }
    },
    peminatan: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Peminatan Program Studi harus diisi'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'prodi',
  });
  return prodi;
};
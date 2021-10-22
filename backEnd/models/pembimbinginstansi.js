'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require ('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class pembimbingInstansi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      pembimbingInstansi.belongsTo(models.instansi,{foreignKey:'instansiId'})
      pembimbingInstansi.hasMany(models.suratKeputusanMagang,{foreignKey:'pembimbingInstansiId'})
    }
  };
  pembimbingInstansi.init({
    namaPembimbing: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Nama Pembimbing Instansi harus diisi'
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Email Pembimbing Instansi harus diisi'
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Password harus diisi'
        }
      }
    },
    jabatan: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Jabatan Pembimbing Instansi harus diisi'
        }
      }
    },
    role: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Role harus diisi'
        }
      }
    },
    satuanKerja: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Satuan Kerja Pembimbing Instansi harus diisi'
        }
      }
    },
  }, {
    hooks:{
      beforeCreate(user){
        user.password=bcrypt.hashSync(user.password,10)
      }
    },
    sequelize,
    modelName: 'pembimbingInstansi',
  });
  return pembimbingInstansi;
};
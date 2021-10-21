'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class dikjar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      dikjar.hasMany(models.suratKeputusanMagang,{foreignKey:'dikjarId'})
      dikjar.hasMany(models.suratMagangInstansi,{foreignKey:'dikjarId'})
    }
  };
  dikjar.init({
    namaDikjar: {
      type: DataTypes.STRING,
      validate: {
        msg: 'Nama Tenaga Kependidikan harus diisi'
      }
    },
    satuanKerja: {
      type: DataTypes.STRING,
      validate: {
        msg: 'Satuan Kerja Tenaga Kependidikan harus diisi'
      }
    },
    emailDikjar: {
      type: DataTypes.STRING,
      validate: {
        msg: 'Email Tenaga Kependidikan harus diisi'
      }
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        msg: 'Role harus diisi'
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        msg: 'Password harus diisi'
      }
    }
  }, {
    hooks: {
      beforeCreate(user) {
        user.password = bcrypt.hashSync(user.password, 10)
      }
    },
    sequelize,
    modelName: 'dikjar',
  });
  return dikjar;
};
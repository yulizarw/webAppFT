'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Admin.init({
    namaAdmin: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Nama Admin Harus diisi'
        }
      }
    },
    emailAdmin: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Email Admin Harus diisi'
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Password Admin Harus diisi'
        }
      }
    },
    role: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Role Harus diisi'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Admin',
  });
  return Admin;
};
'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require ('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class kaprodi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      kaprodi.belongsTo(models.prodi,{foreignKey:'prodiId'})
      kaprodi.hasMany(models.formulirPersetujuan,{foreignKey:'prodiId'})
    }
  };
  kaprodi.init({
    namaKaprodi: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:"Nama Kaprodi harus diisi"
        }
      }
    },
    emailKaprodi:{
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:"Email Kaprodi harus diisi"
        }
      }
    },
    passwordKaprodi: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:"Password Kaprodi harus diisi"
        }
      }
    },
    role: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:"Role harus diisi"
        }
      }
    }
  }, {
    hooks:{
      beforeCreate(user){
        user.password=bcrypt.hashSync(user.passwordKaprodi,10)

      }
    },
    sequelize,
    modelName: 'kaprodi',
  });
  return kaprodi;
};
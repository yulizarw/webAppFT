'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require ('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class dosenPembimbing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      dosenPembimbing.hasMany(models.suratKeputusanMagang,{foreignKey:'dosenPembimbingId'})
      dosenPembimbing.belongsTo(models.prodi,{foreignKey:'prodiId'})
    }
  };
  dosenPembimbing.init({
    namaDosen: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Nama Dosen Pembimbing harus diisi'
        }
      }
    },
    programStudi:{
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Program Studi harus diisi'
        }
      }
    },
    bidangKepakaran: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Bidang Kepakaran harus diisi'
        }
      }
    },
    emailDospem: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Email dosen pembimbing harus diisi'
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
    role: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Role harus diisi'
        }
      }
    },
    jabatanAkademik: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Jabatan Akademik harus diisi'
        }
      }
    }
  }, {
    hooks:{
      beforeCreate(user){
        user.password=bcrypt.hashSync(user.password,10)
      }
    },
    sequelize,
    modelName: 'dosenPembimbing',
  });
  return dosenPembimbing;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FormulirMagang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  FormulirMagang.init({
    namaPemohon: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Nama Mahasiswa harus diisi'
        }
      }
    },
    nimPemohon: {
      type:DataTypes.DOUBLE,
      validate:{
        notEmpty:{
          msg:'Nomor Induk Mahasiswa harus diisi'
        }
      }
    },
    prodiPemohon: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Prodi harus diisi'
        }
      }
    },
    namaInstansi: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Nama Instansi Tujuan PKL harus diisi'
        }
      }
    },
    alamatInstansi: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Alamat Instansi Tujuan PKL harus diisi'
        }
      }
    },
    waktuPKL: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Durasi pelaksanaan PKL harus diisi'
        }
      }
    },
    catatan: DataTypes.STRING,
    peminatanPemohon: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Peminatan Mahasiswa harus diisi'
        }
      }
    },
    namaDosenPembimbing: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Nama Dosen Pembimbing PKL harus diisi'
        }
      }
    },
    rekomendasiKaprodi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FormulirMagang',
  });
  return FormulirMagang;
};
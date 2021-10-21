'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mahasiswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Mahasiswa.init({
    namaMahasiswa: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Nama Mahasiswa Harus diisi'
        }
      }
    },
    nim: {
      type:DataTypes.DOUBLE,
      validate:{
        notEmpty:{
          msg:'Nomor Induk Mahasiswa Harus diisi'
        }
      }
    },
    prodi: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Program Studi Harus diisi'
        }
      }
    },
    jenisKelamin: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Jenis Kelamin Harus diisi'
        }
      }
    },
    tahunAngkatan: {
      type:DataTypes.DOUBLE,
      validate:{
        notEmpty:{
          msg:'Tahun Angkatan Mahasiswa Harus diisi'
        }
      }
    },
    semester: {
      type:DataTypes.DOUBLE,
      validate:{
        notEmpty:{
          msg:'Semester Mahasiswa Harus diisi'
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Email Harus diisi'
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Password Harus diisi'
        }
      }
    },
    tanggalLahir: {
      type:DataTypes.DATE,
      validate:{
        notEmpty:{
          msg:'Tanggal Lahir Harus diisi'
        }
      }
    },
    tempatLahir: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Tempat Lahir Harus diisi'
        }
      }
    },
    ipk:{
      type:DataTypes.DOUBLE,
      validate:{
        notEmpty:{
          msg:'IPK Harus diisi'
        }
      }
    },
    bidangPeminatan: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Bidang Peminatan Mahasiswa Harus diisi'
        }
      }
    },
    alamat: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Alamat Harus diisi'
        }
      }
    },
    namaOrangTua: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Nama Orang Tua Harus diisi'
        }
      }
    },
    statusAkademik: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Status Akademik Mahasiswa Harus diisi'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Mahasiswa',
  });
  return Mahasiswa;
};
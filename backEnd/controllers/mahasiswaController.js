const { Admin, kaprodi, dikjar, Mahasiswa, dosenPembimbing, pembimbingInstansi, instansi, prodi, formulirPersetujuan, FormulirMagang, suratKeputusanMagang, suratMagangInstansi, suratPersetujuanInstansi } = require("../models");

const axios = require("axios");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = class mahasiswaController {
    static async register(req, res) {
        try {
            let params = {
                namaMahasiswa: req.body.nama,
                nim: +req.body.nim,
                email: req.body.email,
                password: req.body.password,
                programStudi: req.body.programStudi,
                jenisKelamin: req.body.jenisKelamin,
                tahunAngkatan: +req.body.tahunAngkatan,
                semester: +req.body.semester,
                tanggalLahir: req.body.tanggalLahir,
                tempatLahir: req.body.tempatLahir,
                ipk: +req.body.ipk,
                bidangPeminatan: req.body.bidangPeminatan,
                alamat: req.body.alamat,
                namaOrangTua: req.body.namaOrangTua,
                statusAkademik: req.body.statusAkademik,
                role: req.body.role,
                prodiId: +req.body.prodiId
            }
            let filterNama = params.namaMahasiswa

            let filterMahasiswa = await Mahasiswa.findOne({ where: { namaMahasiswa: filterNama } })
            if (!filterMahasiswa) {
                let addMahasiswa = await Mahasiswa.create(params)
                res.status(201).json(addMahasiswa)
            } else {
                res.status(400).json('Mahasiswa telah terdaftar')
            }
        } catch (error) {
            res.status(500).json(error)
            // console.log(error)
        }
    }

    static async login(req, res) {
        try {
            let params = {
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            }
            let loginMahasiswa = await Mahasiswa.findOne({
                where: {
                    email: params.email
                }
            })

            if (
                loginMahasiswa &&
                bcrypt.compareSync(params.password, loginMahasiswa.password)
            ) {
                let access_token = jwt.sign(
                    {
                        id: loginMahasiswa.id,
                        email: loginMahasiswa.email,
                        namaMahasiswa: loginMahasiswa.namaMahasiswa,
                        role: loginMahasiswa.role
                    },
                    process.env.SECRET
                );
                res.status(201).json({
                    access_token,
                    id: loginMahasiswa.id,
                    email: loginMahasiswa.email,
                    namaMahasiswa: loginMahasiswa.namaMahasiswa,
                    role: loginMahasiswa.role
                });
            } else {
                res.status(400).json("Password / Username are incorrect");
            }
        } catch (error) {
            res.status(500).json(error);
            // console.log(error)
        }
    }

    static async editMahasiswa(req, res) {
        try {
            let adminIsLogin = req.userLogin.role
            let adminId = req.userLogin.id
            let id = req.params.id
            let params = {
                namaMahasiswa: req.body.nama,
                nim: +req.body.nim,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                programStudi: req.body.programStudi,
                jenisKelamin: req.body.jenisKelamin,
                tahunAngkatan: +req.body.tahunAngkatan,
                semester: +req.body.semester,
                tanggalLahir: req.body.tanggalLahir,
                tempatLahir: req.body.tempatLahir,
                ipk: +req.body.ipk,
                bidangPeminatan: req.body.bidangPeminatan,
                alamat: req.body.alamat,
                namaOrangTua: req.body.namaOrangTua,
                statusAkademik: req.body.statusAkademik,
                role: req.body.role,
                prodiId: +req.body.prodiId
            }

            let filterMahasiswa = await Mahasiswa.findOne({ where: { id } })

            if (adminIsLogin === 'Mahasiswa') {
                console.log(id, filterMahasiswa)
                if (filterMahasiswa && adminId === +id) {
                    let editMahasiswa = await Mahasiswa.update(params, { where: { id }, returning: true })

                    if (editMahasiswa[0] == 0) {
                        res.status(400).json('Mahasiswa Tidak Terdaftar')
                    } else if (!params) {
                        res.status(400).json('Silahkan isi detail Mahasiswa')
                    } else {
                        res.status(200).json(`Mahasiswa with id ${id} has been updated`)
                    }
                } else {
                    res.status(404).json('Edit Mahasiswa Tidak Berhasil')
                }
            } else {
                res.status(401).json('Unauthorized Access')
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async deleteMahasiswa(req, res) {
        try {
            let adminIsLogin = req.userLogin.role
            let adminId = req.userLogin.id
            let id = req.params.id
            let filterMahasiswa = await Mahasiswa.findOne({ where: { id } })

            if (adminIsLogin === 'Mahasiswa') {
                if (filterMahasiswa && adminId === +id) {
                    let deleteMahasiswa = await Mahasiswa.destroy({ where: { id } })
                    if (deleteMahasiswa) {
                        res.status(200).json(`Mahasiswa dengan ${id} berhasil di hapus `)
                    } else {
                        res.status(400).json('Proses hapus Mahasiswa tidak berhasil')
                    }
                } else {
                    res.status(404).json('Proses Hapus Mahasiswa Tidak Berhasil')
                }
            } else {
                res.status(401).json('Unauthorized Access')
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async createFormulirMagang(req, res) {
        try {
            let adminIsLogin = req.userLogin.role
            let adminId = req.userLogin.id
           
            if (adminIsLogin === 'Mahasiswa' && adminId === +req.body.mahasiswaId) {
                let params = {
                    namaPemohon: req.body.namaPemohon,
                    nimPemohon: +req.body.nimPemohon,
                    prodiPemohon: req.body.prodiPemohon,
                    namaInstansi:req.body.namaInstansi,
                    alamatInstansi:req.body.alamatInstansi,
                    waktuPKL: req.body.waktuPKL,
                    catatan: req.body.catatan,
                    peminatanPemohon: req.body.peminatanPemohon,
                    namaDosenPembimbing: req.body.namaDosenPembimbing,
                    rekomendasiKaprodi: 'Pending',
                    mahasiswaId: +req.body.mahasiswaId,
                }

                let filterNama = params.namaPemohon
               
                let filterFormulir = await FormulirMagang.findOne({ where: { namaPemohon: filterNama } })
                
                if (!filterFormulir) {
                    let addFormulirMagang = await FormulirMagang.create(params)
                    res.status(201).json(addFormulirMagang)
                } else {
                    res.status(400).json(`Formulir Magang no ${filterFormulir.id} masih dalam proses`)
                }
            } else {
                res.status(401).json('Unauthorized Access')
            }
        } catch (error) {
            // res.status(500).json(error)
            console.log(error)
        }
    }

    static async editFormulirMagang(req, res) {
        try {
            let adminIsLogin = req.userLogin.role
            let id = req.params.id
            let adminId = req.userLogin.id
            let params = {
                namaPemohon: req.body.namaPemohon,
                nimPemohon: +req.body.nimPemohon,
                prodiPemohon: req.body.prodiPemohon,
                namaInstansi:req.body.namaInstansi,
                alamatInstansi:req.body.alamatInstansi,
                waktuPKL: req.body.waktuPKL,
                catatan: req.body.catatan,
                peminatanPemohon: req.body.peminatanPemohon,
                namaDosenPembimbing: req.body.namaDosenPembimbing,
                rekomendasiKaprodi: req.body.rekomendasiKaprodi,
                mahasiswaId: +req.body.mahasiswaId,
            }

            let filterFormulirMagang = await FormulirMagang.findOne({ where: { id } })
            
            if (adminIsLogin === 'Mahasiswa' && adminId === +req.body.mahasiswaId) {
                if (filterFormulirMagang) {
                    let editFormulirMagang = await FormulirMagang.update(params, { where: { id }, returning: true })

                    if (editFormulirMagang[0] == 0) {
                        res.status(400).json('Formulir Magang Tidak Terdaftar')
                    } else if (!params) {
                        res.status(400).json('Silahkan isi Formulir Magang')
                    } else {
                        res.status(200).json(`Formulir Magang with id ${id} has been updated`)
                    }
                } else {
                    res.status(404).json('Edit Tidak Berhasil')
                }
            } else {
                res.status(401).json('Unauthorized Access')
            }
        } catch (error) {
            res.status(500).json(error)
           
        }
    }

    static async deleteFormulirMagang(req, res) {
        try {
            let adminIsLogin = req.userLogin.role
            let id = req.params.id
            let adminId = req.userLogin.id
            let filterFormulirMagang = await FormulirMagang.findOne({ where: { id } })

            if (adminIsLogin === 'Mahasiswa') {
                if (filterFormulirMagang && filterFormulirMagang.mahasiswaId === adminId) {
                    let deleteFormulirMagang = await FormulirMagang.destroy({ where: { id } })
                    if (deleteFormulirMagang) {
                        res.status(200).json(`Formulir Magang dengan no ${id} berhasil di hapus `)
                    } else {
                        res.status(400).json('Proses hapus Formulir Magang tidak berhasil')
                    }
                } else {
                    res.status(404).json('Proses Hapus Tidak Berhasil')
                }
            } else {
                res.status(401).json('Unauthorized Access')
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

}
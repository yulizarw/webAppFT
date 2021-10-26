const { Admin, kaprodi, dikjar, Mahasiswa, dosenPembimbing, pembimbingInstansi, instansi, prodi, formulirPersetujuan, FormulirMagang, suratKeputusanMagang, suratMagangInstansi, suratPersetujuanInstansi } = require("../models");
const axios = require("axios");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = class pembimbingInstansiController {
    static async login(req, res) {
        try {
            let params = {
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            }
            let loginAdmin = await pembimbingInstansi.findOne({
                where: {
                    email: params.email
                }
            })

            if (
                loginAdmin &&
                bcrypt.compareSync(params.password, loginAdmin.password)
            ) {
                let access_token = jwt.sign(
                    {
                        id: loginAdmin.id,
                        email: loginAdmin.email,
                        nama: loginAdmin.nama,
                        role: loginAdmin.role
                    },
                    process.env.SECRET
                );
                res.status(201).json({
                    access_token,
                    id: loginAdmin.id,
                    email: loginAdmin.email,
                    nama: loginAdmin.nama,
                    role: loginAdmin.role
                });
            } else {
                res.status(400).json("Password / Username are incorrect");
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async register (req,res) {
        try {
            let params = {
                namaPembimbing: req.body.namaPembimbing,
                email: req.body.email,
                password: req.body.password,
                jabatan: req.body.jabatan,
                satuanKerja:req.body.satuanKerja,
                role: req.body.role,
                instansiId: +req.body.instansiId
            }
            let filterNama = params.namaPembimbing

            let filterPembimbing = await pembimbingInstansi.findOne({ where: { namaPembimbing: filterNama } })
            if (!filterPembimbing) {
                let addPembimbing = await pembimbingInstansi.create(params)
                res.status(201).json(addPembimbing)
            } else {
                res.status(400).json(`Dosen ${params.namaPembimbing} telah terdaftar`)
            }
        } catch (error) {
            res.send(500).json(error)
        }
    }

    static async editPembimbingInstansi(req, res) {
        try {
            let adminIsLogin = req.userLogin.role
            let adminId = req.userLogin.id
            let id = req.params.id

            let params = {
                namaPembimbing: req.body.namaPembimbing,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                jabatan: req.body.jabatan,
                satuanKerja:req.body.satuanKerja,
                role: req.body.role,
                instansiId: +req.body.instansiId
            }

            let filterPembimbing = await pembimbingInstansi.findOne({ where: { id } })

            if (adminIsLogin === 'Pembimbing Instansi' && adminId == id) {
                if (filterPembimbing) {
                    let editPembimbing = await pembimbingInstansi.update(params, { where: { id }, returning: true })

                    if (editPembimbing[0] == 0) {
                        res.status(400).json('Pembimbing Tidak Terdaftar')
                    } else if (!params) {
                        res.status(400).json('Silahkan isi detail Pembimbing Instansi')
                    } else {
                        res.status(200).json(`Pembimbing Instansi with id ${id} has been updated`)
                    }
                } else {
                    res.status(404).json('Edit Tidak Berhasil')
                }
            } else {
                res.status(401).json('Unauthorized Access')
            }
        } catch (error) {
            res.status(500).json(error)
            // console.log(error)
        }
    }

    static async deletePembimbingInstansi(req, res) {
        try {
            let adminIsLogin = req.userLogin.role
            let adminId = req.userLogin.id
            let id = req.params.id
            let filterPembimbing = await pembimbingInstansi.findOne({ where: { id } })

            if (adminIsLogin ==='Pembimbing Instansi' && adminId == id ) {
                if (filterPembimbing) {
                    let deletePembimbing = await pembimbingInstansi.destroy({ where: { id } })
                    if (deletePembimbing) {
                        res.status(200).json(`Pembimbing Instansi dengan ${id} berhasil di hapus `)
                    } else {
                        res.status(400).json('Proses hapus Pembimbing Instansi tidak berhasil')
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

    static async listSuratPersetujuanInstansi(req,res){
        try {
            let adminIsLogin = req.userLogin.role
            let adminId = req.userLogin.id

            let filterPembimbing = await pembimbingInstansi.findOne({where:{id:adminId}})
            if (adminIsLogin = 'Pembimbing Instansi') {
                let suratMagangList = await suratPersetujuanInstansi.findAll({where:{instansiId:filterPembimbing.instansiId}})

                if (suratMagangList.length > 0) {
                    res.status(200).json(suratMagangList)
                } else if (suratMagangList.length <= 0) {
                    res.status(404).json("Belum ada surat Magang Terdaftar")
                }
            } else {
                res.status(401).json('Unauthorized Access')
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async editSuratPersetujuanInstansi (req,res) {
        try {
            let adminIsLogin = req.userLogin.role
            let adminId = req.userLogin.id

            let id = req.params.id
            let params = {
                statusPersetujuan: req.body.statusPersetujuan,
            }

            let filterSurat = await suratPersetujuanInstansi.findOne({where:{id}})
            let filterPembimbing = await pembimbingInstansi.findOne({where:{id:adminId}})
            let filterInstansi = await instansi.findOne({where:{id:filterPembimbing.instansiId}})

            if (adminIsLogin == 'Pembimbing Instansi' && filterInstansi) {
                if (filterSurat) {
                    let editSuratMagang = await suratPersetujuanInstansi.update(params, { where: { id }, returning: true })

                    if (editSuratMagang[0] == 0) {
                        res.status(400).json('Surat Persetujuan Instansi Tidak Terdaftar')
                    } else if (!params) {
                        res.status(400).json('Silahkan isi  Surat Persetujuan Instansi')
                    } else {
                        res.status(200).json(`Surat Persetujuan Instansi with id ${id} has been updated`)
                    }
                } else {
                    res.status(404).json('Edit Tidak Berhasil')
                }
            } else {
                res.status(401).json('Unauthorized Access')
            }
        } catch (error) {
            // res.status(500).json(error)
            console.log(error)  
        }
    }

    static async listSuratMagang(req, res) {
        try {
            let adminIsLogin = req.userLogin.role
            let adminId = req.userLogin.id

            if (adminIsLogin == 'Pembimbing Instansi') {
                let suratMagangList = await suratKeputusanMagang.findAll({where:{pembimbingInstansiId: adminId}})

                if (suratMagangList.length > 0) {
                    res.status(200).json(suratMagangList)
                } else if (suratMagangList.length <= 0) {
                    res.status(404).json("Belum ada surat Keputusan Magang Terdaftar")
                }
            } else {
                res.status(401).json('Unauthorized Access')
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
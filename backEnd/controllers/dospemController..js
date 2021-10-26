const { Admin, kaprodi, dikjar, Mahasiswa, dosenPembimbing, pembimbingInstansi, instansi, prodi, formulirPersetujuan, FormulirMagang, suratKeputusanMagang, suratMagangInstansi, suratPersetujuanInstansi } = require("../models");
const axios = require("axios");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = class dospemController {
    static async login(req, res) {
        try {
            let params = {
                emailDospem: req.body.email,
                password: req.body.password,
                role: req.body.role
            }
            let loginAdmin = await dosenPembimbing.findOne({
                where: {
                    emailDospem: params.emailDospem
                }
            })

            if (
                loginAdmin &&
                bcrypt.compareSync(params.password, loginAdmin.password)
            ) {
                let access_token = jwt.sign(
                    {
                        id: loginAdmin.id,
                        emailDospem: loginAdmin.email,
                        namaDosen: loginAdmin.nama,
                        role: loginAdmin.role
                    },
                    process.env.SECRET
                );
                res.status(201).json({
                    access_token,
                    id: loginAdmin.id,
                    emailDospem: loginAdmin.email,
                    namaDosen: loginAdmin.nama,
                    role: loginAdmin.role
                });
            } else {
                res.status(400).json("Password / Username are incorrect");
            }
        } catch (error) {
            // res.status(500).json(error);
            console.log(error)
        }
    }

    static async register(req, res) {
        try {
            let params = {
                namaDosen: req.body.nama,
                programStudi: req.body.programStudi,
                bidangKepakaran: req.body.bidangKepakaran,
                emailDospem: req.body.emailDospem,
                password: req.body.password,
                jabatanAkademik: req.body.jabatanAkademik,
                role: req.body.role,
                prodiId: +req.body.prodiId
            }
            let filterNama = params.namaDosen

            let filterDosen = await dosenPembimbing.findOne({ where: { namaDosen: filterNama } })
            if (!filterDosen) {
                let addDosen = await dosenPembimbing.create(params)
                res.status(201).json(addDosen)
            } else {
                res.status(400).json(`Dosen ${params.namaDosen} telah terdaftar`)
            }
        } catch (error) {
            res.status(500).json(error)
            // console.log(error)
        }
    }

    static async editDosen(req, res) {
        try {
            let adminIsLogin = req.userLogin.role
            let adminId = req.userLogin.id
            let id = req.params.id
            let params = {
                namaDosen: req.body.nama,
                programStudi: req.body.programStudi,
                bidangKepakaran: req.body.bidangKepakaran,
                emailDospem: req.body.emailDospem,
                password: bcrypt.hashSync(req.body.password, 10),
                jabatanAkademik: req.body.jabatanAkademik,
                role: req.body.role,
                prodiId: +req.body.prodiId
            }

            let filterDosen = await dosenPembimbing.findOne({ where: { id } })

            if (adminIsLogin === 'Dosen Pembimbing' && adminId === +id) {
                if (filterDosen) {
                    let editDosen = await dosenPembimbing.update(params, { where: { id }, returning: true })

                    if (editDosen[0] == 0) {
                        res.status(400).json('Dosen Tidak Terdaftar')
                    } else if (!params) {
                        res.status(400).json('Silahkan isi detail Dosen')
                    } else {
                        res.status(200).json(`Dosen with id ${id} has been updated`)
                    }
                } else {
                    res.status(404).json('Edit Dosen Tidak Berhasil')
                }
            } else {
                res.status(401).json('Unauthorized Access')
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async deleteDosen(req, res) {
        try {
            let adminIsLogin = req.userLogin.role
            let adminId = req.userLogin.id
            let id = req.params.id
            let filterDosen = await dosenPembimbing.findOne({ where: { id } })

            if (adminIsLogin === 'Dosen Pembimbing' && adminId === +id) {
                if (filterDosen) {
                    let deleteDosen = await dosenPembimbing.destroy({ where: { id } })
                    if (deleteDosen) {
                        res.status(200).json(`Dosen dengan ${id} berhasil di hapus `)
                    } else {
                        res.status(400).json('Proses hapus Dosen tidak berhasil')
                    }
                } else {
                    res.status(404).json('Proses Hapus Dosen Tidak Berhasil')
                }
            } else {
                res.status(401).json('Unauthorized Access')
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async listSuratMagang(req, res) {
        try {
            let adminIsLogin = req.userLogin.role
            let adminId = req.userLogin.id

            if (adminIsLogin === 'Dosen Pembimbing') {
                let suratMagangList = await suratKeputusanMagang.findAll()

                if (suratMagangList.length > 0 && suratMagangList.dosenPembimbingId == adminId) {
                    res.status(200).json(suratMagangList)
                } else {
                    res.status(404).json("Belum ada surat tugas magang Terdaftar")
                }
            } else {
                res.status(401).json('Unauthorized Access')
            }
        } catch (error) {
            // res.status(500).json(error);
            console.log(error)
        }
    }

    static async suratMagangFindByPk(req, res) {
        try {
            let adminIsLogin = req.userLogin.role
            let adminId = req.userLogin.id
            let id = req.params.id

            if (adminIsLogin) {
                let suratMagangList = await suratKeputusanMagang.findByPk(id)
                
                if (suratMagangList !==null && suratMagangList.length > 0 && suratMagangList.dosenPembimbingId == adminId) {
                    res.status(200).json(suratMagangList)
                    // console.log(suratMagangList)
                } else  {
                    res.status(404).json("Belum ada Surat Tugas Magang Terdaftar")
                }
            } else {
                res.status(401).json('Unauthorized Access')
            }
        } catch (error) {
            res.status(500).json(error);
            // console.log(error)
        }
    }
}
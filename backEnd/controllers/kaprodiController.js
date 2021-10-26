const { Admin, kaprodi, dikjar, Mahasiswa, dosenPembimbing, pembimbingInstansi, instansi, prodi, formulirPersetujuan, FormulirMagang, suratKeputusanMagang, suratMagangInstansi, suratPersetujuanInstansi } = require("../models");
const axios = require("axios");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = class kaprodiController {
    static async login(req, res) {
        try {
            let params = {
                emailKaprodi: req.body.email,
                passwordKaprodi: req.body.password,
                role: req.body.role
            }
            let loginAdmin = await kaprodi.findOne({
                where: {
                    emailKaprodi: params.emailKaprodi
                }
            })
            console.log( bcrypt.compareSync(params.passwordKaprodi, loginAdmin.passwordKaprodi))
            console.log(loginAdmin.passwordKaprodi, params.passwordKaprodi)
            if (
                loginAdmin &&
                bcrypt.compareSync(params.passwordKaprodi, loginAdmin.passwordKaprodi)
            ) {
                let access_token = jwt.sign(
                    {
                        id: loginAdmin.id,
                        emailKaprodi: loginAdmin.emailKaprodi,
                        namaKaprodi: loginAdmin.namaKaprodi,
                        role: loginAdmin.role
                    },
                    process.env.SECRET
                );
                res.status(201).json({
                    access_token,
                    id: loginAdmin.id,
                    emailKaprodi: loginAdmin.emailKaprodi,
                    namaKaprodi: loginAdmin.namaKaprodi,
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
                namaKaprodi: req.body.namaKaprodi,
                emailKaprodi: req.body.emailKaprodi,
                passwordKaprodi:  bcrypt.hashSync(req.body.passwordKaprodi, 10),
                role: req.body.role,
                prodiId: +req.body.prodiId
            }
            let filterNama = params.namaKaprodi

            let filterKaprodi = await kaprodi.findOne({ where: { namaKaprodi: filterNama } })
            if (!filterKaprodi) {
                let addKaprodi = await kaprodi.create(params)
                res.status(201).json(addKaprodi)
            } else {
                res.status(400).json('Kaprodi telah terdaftar')
            }

        } catch (error) {
            res.status(500).json(error)
            // console.log(error)
        }
    }

    static async editKaprodi(req, res) {
        try {
            let adminIsLogin = req.userLogin.role
            let id = req.params.id
            let adminId = req.userLogin.id
            let params = {
                namaKaprodi: req.body.namaKaprodi,
                emailKaprodi: req.body.emailKaprodi,
                passwordKaprodi: bcrypt.hashSync(req.body.password, 10),
                role: req.body.role,
                prodiId: +req.body.prodiId
            }

            let filterKaprodi = await kaprodi.findOne({ where: { id } })

            if (adminIsLogin === 'Kaprodi' && adminId === +id ) {
                if (filterKaprodi) {
                    let editKaprodi = await kaprodi.update(params, { where: { id }, returning: true })
                    if (editKaprodi[0] == 0) {
                        res.status(400).json('Kaprodi Tidak Terdaftar')
                    } else if (!params) {
                        res.status(400).json('Silahkan isi detail Kaprodi')
                    } else {
                        res.status(200).json(`Kaprodi with id ${id} has been updated`)
                    }
                } else {
                    res.status(404).json('Proses Edit Kaprodi Tidak Berhasil')
                }
            } else {
                res.status(401).json('Unauthorized Access')
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async deleteKaprodi(req, res) {
        try {
            let adminIsLogin = req.userLogin.role
            let id = req.params.id
            let adminId = req.userLogin.id
            let filterKaprodi = await kaprodi.findOne({ where: { id } })

            if (adminIsLogin === 'Kaprodi' && adminId === +id) {
                if (filterKaprodi) {
                    let deleteKaprodi = await kaprodi.destroy({ where: { id } })
                    if (deleteKaprodi) {
                        res.status(200).json(`Kaprodi dengan ${id} berhasil di hapus `)
                    } else {
                        res.status(400).json('Proses hapus kaprodi tidak berhasil')
                    }
                } else {
                    res.status(404).json('Proses hapus kaprodi tidak berhasil')
                }
            } else {
                res.status(401).json('Unauthorized Access')
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async listFormulirMagang(req, res) {
        try {
            let adminIsLogin = req.userLogin.role


            if (adminIsLogin === 'Kaprodi') {
                let formulirMagangList = await FormulirMagang.findAll()

                if (formulirMagangList.length > 0) {
                    res.status(200).json(formulirMagangList)
                } else if (formulirMagangList.length <= 0) {
                    res.status(404).json("Belum ada Formulir Magang Terdaftar")
                }
            } else {
                res.status(401).json('Unauthorized Access')
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async editFormulirMagang(req, res) {
        try {
            let adminIsLogin = req.userLogin.id
            let id = req.params.id
            let params = {
               
                rekomendasiKaprodi: req.body.rekomendasiKaprodi,
              
            }

            let filterFormulirMagang = await FormulirMagang.findOne({ where: { id } })

            if (adminIsLogin) {
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
}
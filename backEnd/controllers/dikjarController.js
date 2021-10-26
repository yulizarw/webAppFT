const { Admin, kaprodi, dikjar, Mahasiswa, dosenPembimbing, pembimbingInstansi, instansi, prodi, formulirPersetujuan, FormulirMagang, suratKeputusanMagang, suratMagangInstansi, suratPersetujuanInstansi } = require("../models");
const axios = require("axios");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = class dikjarController {
    static async register(req, res) {
        try {
            let params = {
                namaDikjar: req.body.nama,
                emailDikjar: req.body.email,
                password: req.body.password,
                role: req.body.role,
                satuanKerja: req.body.satuanKerja
            }
            let filterNama = params.namaDikjar

            let filterDikjar = await dikjar.findOne({ where: { namaDikjar: filterNama } })
            if (!filterDikjar) {
                let addDikjar = await dikjar.create(params)
                res.status(201).json(addDikjar)
            } else {
                res.status(400).json('Dikjar telah terdaftar')
            }

        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async login(req, res) {
        try {
            let params = {
                emailDikjar: req.body.email,
                password: req.body.password,
                role: req.body.role
            }
            let loginDikjar = await dikjar.findOne({
                where: {
                    emailDikjar: params.emailDikjar
                }
            })

            if (
                loginDikjar &&
                bcrypt.compareSync(params.password, loginDikjar.password)
            ) {
                let access_token = jwt.sign(
                    {
                        id: loginDikjar.id,
                        emailDikjar: loginDikjar.emailDikjar,
                        namaDikjar: loginDikjar.namaDikjar,
                        role: loginDikjar.role
                    },
                    process.env.SECRET
                );
                res.status(201).json({
                    access_token,
                    id: loginDikjar.id,
                    emailDikjar: loginDikjar.emailDikjar,
                    namaDikjar: loginDikjar.namaDikjar,
                    role: loginDikjar.role
                });
            } else {
                res.status(400).json("Password / Username are incorrect");
            }
        } catch (error) {
            res.status(500).json(error);

        }
    }

    static async editDikjar(req, res) {
        try {
            let dikjarIsLogin = req.userLogin.role

            let id = req.params.id
            let params = {
                namaDikjar: req.body.nama,
                emailDikjar: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                role: req.body.role,
                satuanKerja: req.body.satuanKerja
            }

            let filterDikjar = await dikjar.findOne({ where: { id } })

            if (dikjarIsLogin === "Dikjar") {
                if (filterDikjar) {
                    let editDikjar = await dikjar.update(params, { where: { id }, returning: true })

                    if (editDikjar[0] == 0) {
                        res.status(400).json('Dikjar Tidak Terdaftar')
                    } else if (!params) {
                        res.status(400).json('Silahkan isi detail Dikjar')
                    } else {
                        res.status(200).json(`Dikjar with id ${id} has been updated`)
                    }
                } else {
                    res.status(404).json('Edit Dikjar Tidak Berhasil')
                }
            } else {
                res.status(401).json('Unauthorized Access')
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async listMahasiswa(req, res) {
        try {

            let dikjarIsLogin = req.userLogin.role

            if (dikjarIsLogin === "Dikjar") {
                let mahasiswaList = await Mahasiswa.findAll()
                if (mahasiswaList.length > 0) {
                    res.status(200).json(mahasiswaList)
                } else if (mahasiswaList.length <= 0) {
                    res.status(404).json("Belum ada Mahasiswa Terdaftar")
                }
            } else {
                res.status(401).json('Unauthorized Access')
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async editMahasiswa(req, res) {
        try {
            let dikjarIsLogin = req.userLogin.role
            let id = req.params.id
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

            let filterMahasiswa = await Mahasiswa.findOne({ where: { id } })

            if (dikjarIsLogin === "Dikjar") {
                if (filterMahasiswa) {
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
            // console.log(error)
        }
    }

    static async createFormulirPersetujuan(req, res) {
        try {
            let dikjarIsLogin = req.userLogin.role

            if (dikjarIsLogin === "Dikjar") {
                let params = {
                    statusPengajuan: 'Pending',
                    formulirMagangId: +req.body.formulirMagangId,
                    kaprodiId: +req.body.kaprodiId,
                    prodiId: +req.body.prodiId
                }

                let filterId = params.formulirMagangId

                let filterFormulir = await formulirPersetujuan.findOne({ where: { formulirMagangId: filterId }, attributes: { exclude: ['prodiId'] } })

                if (!filterFormulir) {
                    let addFormulir = await formulirPersetujuan.create(params)
                    res.status(201).json(addFormulir)
                } else {
                    res.status(400).json(`Formulir Persetujuan no ${params.formulirMagangId} masih dalam proses`)
                }
            } else {
                res.status(401).json('Unauthorized Access')
            }
        } catch (error) {
            res.status(500).json(error)

        }
    }

    static async editFormulirPersetujuan(req, res) {
        try {
            let dikjarIsLogin = req.userLogin.role
            let id = req.params.id

            let params = {
                statusPengajuan: req.body.statusPengajuan,
                formulirMagangId: +req.body.formulirMagangId,
                kaprodiId: +req.body.kaprodiId,
                prodiId: +req.body.prodiId
            }

            let filterId = +params.formulirMagangId

            if (dikjarIsLogin === "Dikjar") {
                if (filterId) {
                    let editFormulirPersetujuan = await formulirPersetujuan.update(params, { where: { id }, returning: true })

                    if (editFormulirPersetujuan[0] == 0) {
                        res.status(400).json('Formulir Persetujuan Tidak Terdaftar')
                    } else if (!params) {
                        res.status(400).json('Silahkan isi Formulir Persetujuan')
                    } else {
                        res.status(200).json(`Formulir Persetujuan with id ${id} has been updated`)
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


    static async deleteFormulirPersetujuan(req, res) {
        let dikjarIsLogin = req.userLogin.role
        let id = req.params.id
        let filterFormulirPersetujuan = await formulirPersetujuan.findOne({ where: { id } })

        if (dikjarIsLogin === "Dikjar") {
            if (filterFormulirPersetujuan) {
                let deleteFormulirPersetujuan = await formulirPersetujuan.destroy({ where: { id } })
                if (deleteFormulirPersetujuan) {
                    res.status(200).json(`Formulir Persetujuan dengan no ${id} berhasil di hapus `)
                } else {
                    res.status(400).json('Proses hapus Formulir Persetujuan tidak berhasil')
                }
            } else {
                res.status(404).json('Proses Hapus Tidak Berhasil')
            }
        } else {
            res.status(401).json('Unauthorized Access')
        }
    } catch(error) {
        res.status(500).json(error)

    }

    static async listFormulirPersetujuan(req, res) {
        try {
            let dikjarIsLogin = req.userLogin.role

            if (dikjarIsLogin === "Dikjar") {
                let formulirPersetujuanList = await formulirPersetujuan.findAll()

                if (formulirPersetujuanList.length > 0) {
                    res.status(200).json(formulirPersetujuanList)
                } else if (formulirPersetujuanList.length <= 0) {
                    res.status(404).json("Belum ada Formulir Persetujuan Terdaftar")
                }
            } else {
                res.status(401).json('Unauthorized Access')
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async createFormulirMagang(req, res) {
        try {
            let adminIsLogin = req.userLogin.role

            if (adminIsLogin === "Dikjar") {
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
            res.status(500).json(error)
        }
    }

    static async editFormulirMagang(req, res) {
        try {
            let adminIsLogin = req.userLogin.role
            let id = req.params.id
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

            if (adminIsLogin === "Dikjar") {
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
            let filterFormulirMagang = await FormulirMagang.findOne({ where: { id } })

            if (adminIsLogin === "Dikjar") {
                if (filterFormulirMagang) {
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

    static async listFormulirMagang(req, res) {
        try {
            let adminIsLogin = req.userLogin.role
       
            if (adminIsLogin === "Dikjar") {
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

    static async createSuratMagang(req, res) {
        try {
            let adminIsLogin = req.userLogin.role
            
            if (adminIsLogin === "Dikjar" ) {
                let params = {
                    namaDekan: req.body.namaDekan,
                    jabatanDekan: req.body.jabatanDekan,
                    tanggalDisetujui: req.body.tanggalDisetujui,
                    dikjarId: +req.userLogin.id,
                    pembimbingInstansiId: +req.body.pembimbingInstansiId,
                    dosenPembimbingId: +req.body.dosenPembimbingId
                }

                // let filterNama = params.namaDekan
               
                // let filterSurat = await suratKeputusanMagang.findOne({ where: { namaPemohon: filterNama } })
                
                // if (!filterSurat) {
                    let addSurat = await suratKeputusanMagang.create(params)
                    res.status(201).json(addSurat)
                // } else {
                    // res.status(400).json(`Formulir Magang no ${filterSurat.id} masih dalam proses`)
                // }
            } else {
                res.status(401).json('Unauthorized Access')
            }
        } catch (error) {
            // res.status(500).json(error)
            console.log(error)
        }
    }

    static async editSuratMagang(req, res) {
        try {
            let adminIsLogin = req.userLogin.role
            let id = req.params.id
            let params = {
                namaDekan: req.body.namaDekan,
                jabatanDekan: req.body.jabatanDekan,
                tanggalDisetujui: req.body.tanggalDisetujui,
                dikjarId: +req.body.dikjarId,
                pembimbingInstansiId: +req.body.pembimbingInstansiId,
                dosenPembimbingId: +req.body.dosenPembimbingId
            }

            let filterSurat = await suratKeputusanMagang.findOne({where:{id}})

            if (adminIsLogin === "Dikjar") {
                if (filterSurat) {
                    let editFormulirMagang = await suratKeputusanMagang.update(params, { where: { id }, returning: true })

                    if (editFormulirMagang[0] == 0) {
                        res.status(400).json('Formulir Magang Tidak Terdaftar')
                    } else if (!params) {
                        res.status(400).json('Silahkan isi Formulir Magang')
                    } else {
                        res.status(200).json(`Surat Keputusan Magang with id ${id} has been updated`)
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

    static async deleteSuratMagang(req, res) {
        try {
            let adminIsLogin = req.userLogin.role
            let id = req.params.id
            let filterSuratMagang = await suratKeputusanMagang.findOne({ where: { id } })

            if (adminIsLogin === 'Dikjar') {
                if (filterSuratMagang) {
                    let deleteSuratMagang = await suratKeputusanMagang.destroy({ where: { id } })
                    if (deleteSuratMagang) {
                        res.status(200).json(`Surat Magang dengan no ${id} berhasil di hapus `)
                    } else {
                        res.status(400).json('Proses hapus Surat Magang tidak berhasil')
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

    static async listSuratMagang(req, res) {
        try {
            let adminIsLogin = req.userLogin.role

            if (adminIsLogin === 'Dikjar') {
                let suratMagangList = await suratKeputusanMagang.findAll()

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

    static async createSuratMagangInstansi(req, res) {
        try {
            let adminIsLogin = req.userLogin.role

            if (adminIsLogin === 'Dikjar') {
                let params = {
                    dasarHukum: req.body.dasarHukum,
                    formulirPersetujuanId: +req.body.formulirPersetujuanId,
                    dikjarId: +req.body.dikjarId,
                }

                // let filterNama = params.namaDekan
               
                // let filterSurat = await suratKeputusanMagang.findOne({ where: { namaPemohon: filterNama } })
                
                // if (!filterSurat) {
                    let addSurat = await suratMagangInstansi.create(params)
                    res.status(201).json(addSurat)
                // } else {
                    // res.status(400).json(`Formulir Magang no ${filterSurat.id} masih dalam proses`)
                }
            // } else {
                // res.status(401).json('Unauthorized Access')
            // }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async editSuratMagangInstansi(req, res) {
        try {
            let adminIsLogin = req.userLogin.role
            let id = req.params.id
            let params = {
                dasarHukum: req.body.dasarHukum,
                formulirPersetujuanId: +req.body.formulirPersetujuanId,
                dikjarId: +req.body.dikjarId,
            }

            let filterSurat = await suratMagangInstansi.findOne({where:{id}})

            if (adminIsLogin ==='Dikjar') {
                if (filterSurat) {
                    let editSuratMagang = await suratMagangInstansi.update(params, { where: { id }, returning: true })

                    if (editSuratMagang[0] == 0) {
                        res.status(400).json('Surat Magang Instansi Tidak Terdaftar')
                    } else if (!params) {
                        res.status(400).json('Silahkan isi  Surat Magang Instansi')
                    } else {
                        res.status(200).json(`Surat Magang Instansi with id ${id} has been updated`)
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

    static async deleteSuratMagangInstansi(req, res) {
        try {
            let adminIsLogin = req.userLogin.role
            let id = req.params.id
            let filterSuratMagang = await suratMagangInstansi.findOne({ where: { id } })

            if (adminIsLogin === 'Dikjar') {
                if (filterSuratMagang) {
                    let deleteSuratMagang = await suratMagangInstansi.destroy({ where: { id } })
                    if (deleteSuratMagang) {
                        res.status(200).json(`Surat Magang Instansi dengan no ${id} berhasil di hapus `)
                    } else {
                        res.status(400).json('Proses hapus Surat Magang Instansi tidak berhasil')
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

    static async listSuratMagangInstansi(req, res) {
        try {
            let adminIsLogin = req.userLogin.role

            if (adminIsLogin === 'Dikjar') {
                let suratMagangList = await suratMagangInstansi.findAll()

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


    static async createSuratPersetujuanInstansi(req, res) {
        try {
            let adminIsLogin = req.userLogin.role

            if (adminIsLogin === 'Dikjar') {
                let params = {
                    statusPersetujuan: req.body.statusPersetujuan,
                    suratMagangInstansiId: +req.body.suratMagangInstansiId,
                    instansiId: +req.body.instansiId,
                }

                // let filterSurat = params.namaDekan
               
                // let filterSurat = await suratKeputusanMagang.findOne({ where: { namaPemohon: filterNama } })
                
                // if (!filterSurat) {
                    let addSurat = await suratPersetujuanInstansi.create(params)
                    res.status(201).json(addSurat)
                // } else {
                    // res.status(400).json(`Formulir Magang no ${filterSurat.id} masih dalam proses`)
                
            } else {
                res.status(401).json('Unauthorized Access')
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async editSuratPersetujuanInstansi(req, res) {
        try {
            let adminIsLogin = req.userLogin.role
            let id = req.params.id
            let params = {
                statusPersetujuan: req.body.statusPersetujuan,
                suratMagangInstansiId: +req.body.suratMagangInstansiId,
                instansiId: +req.body.instansiId,
            }

            let filterSurat = await suratPersetujuanInstansi.findOne({where:{id}})

            if (adminIsLogin === 'Dikjar') {
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
            res.status(500).json(error)
            // console.log(error)
           
        }
    }

    static async deleteSuratPersetujuanInstansi(req, res) {
        try {
            let adminIsLogin = req.userLogin.role
            let id = req.params.id
            let filterSuratMagang = await suratPersetujuanInstansi.findOne({ where: { id } })

            if (adminIsLogin === 'Dikjar') {
                if (filterSuratMagang) {
                    let deleteSuratMagang = await suratPersetujuanInstansi.destroy({ where: { id } })
                    if (deleteSuratMagang) {
                        res.status(200).json(`Surat Persetujuan Instansi dengan no ${id} berhasil di hapus `)
                    } else {
                        res.status(400).json('Proses hapus Surat Persetujuan Instansi tidak berhasil')
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

    static async listSuratPersetujuanInstansi(req, res) {
        try {
            let adminIsLogin = req.userLogin.role

            if (adminIsLogin === 'Dikjar') {
                let suratMagangList = await suratPersetujuanInstansi.findAll()

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
}
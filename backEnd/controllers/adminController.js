const { Admin, kaprodi, dikjar, Mahasiswa, dosenPembimbing, pembimbingInstansi, instansi, prodi, formulirPersetujuan, FormulirMagang, suratKeputusanMagang, suratMagangInstansi, suratPersetujuanInstansi } = require("../models");
const axios = require("axios");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


module.exports = class adminController {
    static async register(req, res) {
        try {
            let params = {
                namaAdmin: req.body.namaAdmin,
                emailAdmin: req.body.emailAdmin,
                password: req.body.password,
                role: req.body.role,
            }

            let registerAdmin = await Admin.create(params)
            let access_token = jwt.sign(
                {
                    id: registerAdmin.id,
                    email: registerAdmin.emailAdmin,
                    namaAdmin: registerAdmin.namaAdmin,
                    role: registerAdmin.role
                },
                process.env.SECRET
            );
            res.status(201).json({
                access_token,
                id: registerAdmin.id,
                email: registerAdmin.emailAdmin,
                namaAdmin: registerAdmin.namaAdmin,
                role: registerAdmin.role
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async login(req, res) {
        try {
            let params = {
                emailAdmin: req.body.email,
                password: req.body.password,
                role: req.body.role
            }
            let loginAdmin = await Admin.findOne({
                where: {
                    emailAdmin: params.emailAdmin
                }
            })

            if (
                loginAdmin &&
                bcrypt.compareSync(params.password, loginAdmin.password)
            ) {
                let access_token = jwt.sign(
                    {
                        id: loginAdmin.id,
                        emailAdmin: loginAdmin.emailAdmin,
                        namaAdmin: loginAdmin.namaAdmin,
                        role: loginAdmin.role
                    },
                    process.env.SECRET
                );
                res.status(201).json({
                    access_token,
                    namaAdmin: loginAdmin.namaAdmin,
                    id: loginAdmin.id,
                    emailAdmin: loginAdmin.emailAdmin,
                    role: loginAdmin.role
                });
            } else {
                res.status(400).json("Password / Username are incorrect");
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async listKaprodi(req, res) {
        try {
            let adminIsLogin = req.userLogin.id

            if (adminIsLogin) {
                let kaprodiList = await kaprodi.findAll()

                if (kaprodiList.length > 0) {
                    res.status(200).json(kaprodiList)
                } else if (kaprodiList.length <= 0) {
                    res.status(404).json("Belum ada Kaprodi Terdaftar")
                }
            } else {
                res.status(401).json('Unauthorized Access')
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async listMahasiswa(req, res) {
        try {

            let adminIsLogin = req.userLogin.id

            if (adminIsLogin) {
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

    static async listDikjar(req, res) {
        try {
            let adminIsLogin = req.userLogin.id

            if (adminIsLogin) {
                let dikjarList = await dikjar.findAll()
                if (dikjarList.length > 0) {
                    res.status(200).json(mahasiswaList)
                } else if (dikjarList.length <= 0) {
                    res.status(404).json("Belum ada Tenaga Dikjar Terdaftar")
                }
            } else {
                res.status(401).json('Unauthorized Access')
            }

        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async listDospem(req, res) {
        try {
            let adminIsLogin = req.userLogin.id

            if (adminIsLogin) {
                let dospemList = await dosenPembimbing.findAll()
                if (dospemList.length > 0) {
                    res.status(200).json(dospemList)
                } else if (dospemList.length <= 0) {
                    res.status(404).json("Belum ada Dosen Pembimbing Terdaftar")
                }
            } else {
                res.status(401).json('Unauthorized Access')
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async listInstansi(req, res) {
        try {
            let adminIsLogin = req.userLogin.id
            if (adminIsLogin) {
                let instansiList = await pembimbingInstansi.findAll()
                if (instansiList.length > 0) {
                    res.status(200).json(dospemList)
                } else if (instansiList.length <= 0) {
                    res.status(404).json("Belum ada Pembimbing Instansi Terdaftar")
                }
            } else {
                res.status(401).json('Unauthorized Access')
            }

        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async createKaprodi(req, res) {
        try {
            let adminIsLogin = req.userLogin.id

            if (adminIsLogin) {
                let params = {
                    namaKaprodi: req.body.namaKaprodi,
                    emailKaprodi: req.body.emailKaprodi,
                    passwordKaprodi: req.body.passwordKaprodi,
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
            } else {
                res.status(401).json('Unauthorized Access')
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async editKaprodi(req, res) {
        try {
            let adminIsLogin = req.userLogin.id
            let id = req.params.id
            let params = {
                namaKaprodi: req.body.namaKaprodi,
                emailKaprodi: req.body.emailKaprodi,
                passwordKaprodi: req.body.passwordKaprodi,
                role: req.body.role,
                prodiId: +req.body.prodiId
            }

            let filterKaprodi = await kaprodi.findOne({ where: { id } })

            if (adminIsLogin) {
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
            let adminIsLogin = req.userLogin.id
            let id = req.params.id
            let filterKaprodi = await kaprodi.findOne({ where: { id } })

            if (adminIsLogin) {
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

    static async createDikjar(req, res) {
        try {
            let adminIsLogin = req.userLogin.id

            if (adminIsLogin) {
                let params = {
                    namaDikjar: req.body.namaDikjar,
                    emailDikjar: req.body.emailDikjar,
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
            } else {
                res.status(401).json('Unauthorized Access')
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async editDikjar(req, res) {
        try {
            let adminIsLogin = req.userLogin.id
            let id = req.params.id
            let params = {
                namaDikjar: req.body.namaDikjar,
                emailDikjar: req.body.emailDikjar,
                password: req.body.password,
                role: req.body.role,
                satuanKerja: req.body.satuanKerja
            }

            let filterDikjar = await dikjar.findOne({ where: { id } })

            if (adminIsLogin) {
                if (filterDikjar) {
                    let editDikjar = await dikjar.update(params, { where: { id }, returning: true })
                    console.log(editDikjar)
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

    static async deleteDikjar(req, res) {
        try {
            let adminIsLogin = req.userLogin.id
            let id = req.params.id
            let filterDikjar = await dikjar.findOne({ where: { id } })

            if (adminIsLogin) {
                if (filterDikjar) {
                    let deleteDikjar = await dikjar.destroy({ where: { id } })
                    if (deleteDikjar) {
                        res.status(200).json(`Dikjar dengan ${id} berhasil di hapus `)
                    } else {
                        res.status(400).json('Proses hapus Dikjar tidak berhasil')
                    }
                } else {
                    res.status(404).json('Proses Hapus Dikjar Tidak Berhasil')
                }
            } else {
                res.status(401).json('Unauthorized Access')
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async createMahasiswa(req, res) {
        try {
            let adminIsLogin = req.userLogin.id

            if (adminIsLogin) {
                let params = {
                    namaMahasiswa: req.body.namaMahasiswa,
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
            } else {
                res.status(401).json('Unauthorized Access')
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async editMahasiswa(req, res) {
        try {
            let adminIsLogin = req.userLogin.id
            let id = req.params.id
            let params = {
                namaMahasiswa: req.body.namaMahasiswa,
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

            if (adminIsLogin) {
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
        }
    }

    static async deleteMahasiswa(req, res) {
        try {
            let adminIsLogin = req.userLogin.id
            let id = req.params.id
            let filterMahasiswa = await Mahasiswa.findOne({ where: { id } })

            if (adminIsLogin) {
                if (filterMahasiswa) {
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

    static async createDosen(req, res) {
        try {
            let adminIsLogin = req.userLogin.id

            if (adminIsLogin) {
                let params = {
                    namaDosen: req.body.namaDosen,
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
            } else {
                res.status(401).json('Unauthorized Access')
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async editDosen(req, res) {
        try {
            let adminIsLogin = req.userLogin.id
            let id = req.params.id
            let params = {
                namaDosen: req.body.namaDosen,
                programStudi: req.body.programStudi,
                bidangKepakaran: req.body.bidangKepakaran,
                emailDospem: req.body.emailDospem,
                password: req.body.password,
                jabatanAkademik: req.body.jabatanAkademik,
                role: req.body.role,
                prodiId: +req.body.prodiId
            }

            let filterDosen = await dosenPembimbing.findOne({ where: { id } })

            if (adminIsLogin) {
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
            let adminIsLogin = req.userLogin.id
            let id = req.params.id
            let filterDosen = await dosenPembimbing.findOne({ where: { id } })

            if (adminIsLogin) {
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

    static async createPembimbingInstansi(req, res) {
        try {
            let adminIsLogin = req.userLogin.id

            if (adminIsLogin) {
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
            } else {
                res.status(401).json('Unauthorized Access')
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async editPembimbingInstansi(req, res) {
        try {
            let adminIsLogin = req.userLogin.id
            let id = req.params.id
            let params = {
                namaPembimbing: req.body.namaPembimbing,
                email: req.body.email,
                password: req.body.password,
                jabatan: req.body.jabatan,
                satuanKerja:req.body.satuanKerja,
                role: req.body.role,
                instansiId: +req.body.instansiId
            }

            let filterPembimbing = await pembimbingInstansi.findOne({ where: { id } })

            if (adminIsLogin) {
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
        }
    }

    static async deletePembimbingInstansi(req, res) {
        try {
            let adminIsLogin = req.userLogin.id
            let id = req.params.id
            let filterPembimbing = await pembimbingInstansi.findOne({ where: { id } })

            if (adminIsLogin) {
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

    static async createInstansi(req, res) {
        try {
            let adminIsLogin = req.userLogin.id

            if (adminIsLogin) {
                let params = {
                    namaInstansi: req.body.namaInstansi,
                    bidangBisnis: req.body.bidangBisnis,
                    alamat: req.body.alamat,
                }
                let filterNama = params.namaInstansi

                let filterInstansi = await instansi.findOne({ where: { namaInstansi: filterNama } })
                if (!filterInstansi) {
                    let addInstansi = await instansi.create(params)
                    res.status(201).json(addInstansi)
                } else {
                    res.status(400).json(`Mitra ${params.namaInstansi} telah terdaftar`)
                }
            } else {
                res.status(401).json('Unauthorized Access')
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async editInstansi(req, res) {
        try {
            let adminIsLogin = req.userLogin.id
            let id = req.params.id
            let params = {
                namaInstansi: req.body.namaInstansi,
                bidangBisnis: req.body.bidangBisnis,
                alamat: req.body.alamat,
            }

            let filterInstansi = await instansi.findOne({ where: { id } })

            if (adminIsLogin) {
                if (filterInstansi) {
                    let editInstansi = await instansi.update(params, { where: { id }, returning: true })

                    if (editInstansi[0] == 0) {
                        res.status(400).json('Mitra Tidak Terdaftar')
                    } else if (!params) {
                        res.status(400).json('Silahkan isi detail Mitra')
                    } else {
                        res.status(200).json(`Mitra with id ${id} has been updated`)
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

    static async deleteInstansi(req, res) {
        try {
            let adminIsLogin = req.userLogin.id
            let id = req.params.id
            let filterInstansi = await instansi.findOne({ where: { id } })

            if (adminIsLogin) {
                if (filterInstansi) {
                    let deleteInstansi = await instansi.destroy({ where: { id } })
                    if (deleteInstansi) {
                        res.status(200).json(`Mitra dengan ${id} berhasil di hapus `)
                    } else {
                        res.status(400).json('Proses hapus Mitra tidak berhasil')
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

    static async listInstansi(req, res) {
        try {
            let adminIsLogin = req.userLogin.id

            if (adminIsLogin) {
                let instansiList = await instansi.findAll()

                if (instansiList.length > 0) {
                    res.status(200).json(instansiList)
                } else if (instansiList.length <= 0) {
                    res.status(404).json("Belum ada Program Studi Terdaftar")
                }
            } else {
                res.status(401).json('Unauthorized Access')
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async createProdi(req, res) {
        try {
            let adminIsLogin = req.userLogin.id

            if (adminIsLogin) {
                let params = {
                    namaProdi: req.body.namaProdi,
                    peminatan: req.body.peminatan,
                   
                }
                let filterNama = params.namaProdi

                let filterProdi = await prodi.findOne({ where: { namaProdi: filterNama } })
                if (!filterProdi) {
                    let addProdi = await prodi.create(params)
                    res.status(201).json(addProdi)
                } else {
                    res.status(400).json(`Program Studi ${params.namaProdi} telah terdaftar`)
                }
            } else {
                res.status(401).json('Unauthorized Access')
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async editProdi(req, res) {
        try {
            let adminIsLogin = req.userLogin.id
            let id = req.params.id
            let params = {
                namaProdi: req.body.namaProdi,
                peminatan: req.body.peminatan,
            }

            let filterProdi = await prodi.findOne({ where: { id } })

            if (adminIsLogin) {
                if (filterProdi) {
                    let editProdi = await prodi.update(params, { where: { id }, returning: true })

                    if (editProdi[0] == 0) {
                        res.status(400).json('Program Studi Tidak Terdaftar')
                    } else if (!params) {
                        res.status(400).json('Silahkan isi detail Program Studi')
                    } else {
                        res.status(200).json(`Program Studi with id ${id} has been updated`)
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

    static async deleteProdi(req, res) {
        try {
            let adminIsLogin = req.userLogin.id
            let id = req.params.id
            let filterProdi = await prodi.findOne({ where: { id } })

            if (adminIsLogin) {
                if (filterProdi) {
                    let deleteProdi = await prodi.destroy({ where: { id } })
                    if (deleteProdi) {
                        res.status(200).json(`Program Studi dengan ${id} berhasil di hapus `)
                    } else {
                        res.status(400).json('Proses hapus Program Studi tidak berhasil')
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

    static async listProdi(req, res) {
        try {
            let adminIsLogin = req.userLogin.id

            if (adminIsLogin) {
                let prodiList = await prodi.findAll()

                if (prodiList.length > 0) {
                    res.status(200).json(prodiList)
                } else if (prodiList.length <= 0) {
                    res.status(404).json("Belum ada Program Studi Terdaftar")
                }
            } else {
                res.status(401).json('Unauthorized Access')
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async createFormulirPersetujuan(req, res) {
        try {
            let adminIsLogin = req.userLogin.id

            if (adminIsLogin) {
                let params = {
                    statusPengajuan: 'Pending',
                    formulirMagangId: +req.body.formulirMagangId,
                    kaprodiId: +req.body.kaprodiId,
                    prodiId:+req.body.prodiId
                }

                let filterId = params.formulirMagangId
               
                let filterFormulir = await formulirPersetujuan.findOne({ where: { formulirMagangId: filterId }, attributes:{exclude:['prodiId']} })
                
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
            let adminIsLogin = req.userLogin.id
            let id = req.params.id
            let params = {
                statusPengajuan: 'Pending',
                formulirMagangId: +req.body.formulirMagangId,
                kaprodiId: +req.body.kaprodiId,
                prodiId:+req.body.prodiId
            }

            let filterId = +params.formulirMagangId

            if (adminIsLogin) {
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
            // res.status(500).json(error)
            console.log(error)
        }
    }

    static async deleteFormulirPersetujuan(req, res) {
        try {
            let adminIsLogin = req.userLogin.id
            let id = req.params.id
            let filterFormulirPersetujuan = await formulirPersetujuan.findOne({ where: { id } })

            if (adminIsLogin) {
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
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async listFormulirPersetujuan(req, res) {
        try {
            let adminIsLogin = req.userLogin.id

            if (adminIsLogin) {
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
            let adminIsLogin = req.userLogin.id

            if (adminIsLogin) {
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
            let adminIsLogin = req.userLogin.id
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

    static async deleteFormulirMagang(req, res) {
        try {
            let adminIsLogin = req.userLogin.id
            let id = req.params.id
            let filterFormulirMagang = await FormulirMagang.findOne({ where: { id } })

            if (adminIsLogin) {
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
            let adminIsLogin = req.userLogin.id

            if (adminIsLogin) {
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
            let adminIsLogin = req.userLogin.id

            if (adminIsLogin) {
                let params = {
                    namaDekan: req.body.namaDekan,
                    jabatanDekan: req.body.jabatanDekan,
                    tanggalDisetujui: req.body.tanggalDisetujui,
                    dikjarId: +req.body.dikjarId,
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
                }
            // } else {
                // res.status(401).json('Unauthorized Access')
            // }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async editSuratMagang(req, res) {
        try {
            let adminIsLogin = req.userLogin.id
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

            if (adminIsLogin) {
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
            let adminIsLogin = req.userLogin.id
            let id = req.params.id
            let filterSuratMagang = await suratKeputusanMagang.findOne({ where: { id } })

            if (adminIsLogin) {
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
            let adminIsLogin = req.userLogin.id

            if (adminIsLogin) {
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
            let adminIsLogin = req.userLogin.id

            if (adminIsLogin) {
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
            let adminIsLogin = req.userLogin.id
            let id = req.params.id
            let params = {
                dasarHukum: req.body.dasarHukum,
                formulirPersetujuanId: +req.body.formulirPersetujuanId,
                dikjarId: +req.body.dikjarId,
            }

            let filterSurat = await suratMagangInstansi.findOne({where:{id}})

            if (adminIsLogin) {
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
            let adminIsLogin = req.userLogin.id
            let id = req.params.id
            let filterSuratMagang = await suratMagangInstansi.findOne({ where: { id } })

            if (adminIsLogin) {
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
            let adminIsLogin = req.userLogin.id

            if (adminIsLogin) {
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
            let adminIsLogin = req.userLogin.id

            if (adminIsLogin) {
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
                }
            // } else {
                // res.status(401).json('Unauthorized Access')
            // }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async editSuratPersetujuanInstansi(req, res) {
        try {
            let adminIsLogin = req.userLogin.id
            let id = req.params.id
            let params = {
                statusPersetujuan: req.body.statusPersetujuan,
                suratMagangInstansiId: +req.body.suratMagangInstansiId,
                instansiId: +req.body.instansiId,
            }

            let filterSurat = await suratPersetujuanInstansi.findOne({where:{id}})

            if (adminIsLogin) {
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
            let adminIsLogin = req.userLogin.id
            let id = req.params.id
            let filterSuratMagang = await suratPersetujuanInstansi.findOne({ where: { id } })

            if (adminIsLogin) {
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
            let adminIsLogin = req.userLogin.id

            if (adminIsLogin) {
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
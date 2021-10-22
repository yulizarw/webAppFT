const { Admin, kaprodi, dikjar, Mahasiswa, dosenPembimbing, pembimbingInstansi } = require("../models");
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

            if(adminIsLogin) {
                let kaprodiList = await kaprodi.findAll()
    
                if (kaprodiList.length > 0 ){
                    res.status(200).json(kaprodiList)             
                }else if (kaprodiList.length <= 0){
                    res.status(404).json("Belum ada Kaprodi Terdaftar")
                }           
            }else {
                res.status(401).json('Unauthorized Access')
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async listMahasiswa(req,res){
        try{

            let adminIsLogin = req.userLogin.id

            if (adminIsLogin){
                let mahasiswaList = await Mahasiswa.findAll()
                if (mahasiswaList.length > 0){
                    res.status(200).json(mahasiswaList)
                }else if (mahasiswaList.length <=0){
                    res.status(404).json("Belum ada Mahasiswa Terdaftar")
                }
            }else {
                res.status(401).json('Unauthorized Access')
            }
        }catch(error){
            res.status(500).json(error)
        }
    }

    static async listDikjar(req,res){
        try{
            let adminIsLogin = req.userLogin.id

            if(adminIsLogin) {
                let dikjarList = await dikjar.findAll()
                if (dikjarList.length > 0){
                    res.status(200).json(mahasiswaList)
                }else if (dikjarList.length <=0){
                    res.status(404).json("Belum ada Tenaga Dikjar Terdaftar")
                }
            }else {
                res.status(401).json('Unauthorized Access')
            }

        }catch(error){
            res.status(500).json(error)
        }
    }

    static async listDospem(req,res){
        try{
            let adminIsLogin = req.userLogin.id

            if(adminIsLogin){
                let dospemList = await dosenPembimbing.findAll()
                if (dospemList.length > 0){
                    res.status(200).json(dospemList)
                }else if (dospemList.length <=0){
                    res.status(404).json("Belum ada Dosen Pembimbing Terdaftar")
                }
            }else {
                res.status(401).json('Unauthorized Access')
            }
        }catch(error){
            res.status(500).json(error)
        }
    }

    static async listInstansi(req,res){
        try{
            let adminIsLogin = req.userLogin.id
            if(adminIsLogin){
                let instansiList = await pembimbingInstansi.findAll()
                if (instansiList.length > 0){
                    res.status(200).json(dospemList)
                }else if (instansiList.length <=0){
                    res.status(404).json("Belum ada Pembimbing Instansi Terdaftar")
                }
            }else{
                res.status(401).json('Unauthorized Access')
            }

        }catch(error){
            res.status(500).json(error)
        }
    }

    static async createKaprodi(req,res){
        try{
            let adminIsLogin = req.userLogin.id
            
            if(adminIsLogin){
                let params ={
                    namaKaprodi: req.body.namaKaprodi,
                    emailKaprodi:req.body.emailKaprodi,
                    passwordKaprodi:req.body.passwordKaprodi,
                    role:req.body.role,
                    prodiId:+req.body.prodiId
                }
                let filterNama = params.namaKaprodi
                
                let filterKaprodi = await kaprodi.findOne({where:{namaKaprodi:filterNama}})
                if(!filterKaprodi){
                    let addKaprodi = await kaprodi.create(params)
                    res.status(201).json(addKaprodi)
                }else{
                    res.status(400).json('Kaprodi telah terdaftar')
                }
            }else{
                res.status(401).json('Unauthorized Access')
            }
        }catch(error){
            res.status(500).json(error)
        }
    }

    static async editKaprodi(req,res){
        try {
            let adminIsLogin = req.userLogin.id
            let id = req.params.id
            let params ={
                namaKaprodi: req.body.namaKaprodi,
                emailKaprodi:req.body.emailKaprodi,
                passwordKaprodi:req.body.passwordKaprodi,
                role:req.body.role,
                prodiId:+req.body.prodiId
            }
        
            let filterKaprodi = await kaprodi.findOne({where:{id}})

            if(adminIsLogin){
                if (filterKaprodi){
                    let editKaprodi = await kaprodi.update(params,{where:{id}, returning:true})
                    if(editKaprodi[0] == 0){
                        res.status(400).json('Kaprodi Tidak Terdaftar')
                      }else if(!params){
                        res.status(400).json('Silahkan isi detail Kaprodi')
                      }else{
                        res.status(200).json(`Kaprodi with id ${id} has been updated`)
                      }
                }else {
                    res.status(404).json('Proses Edit Kaprodi Tidak Berhasil')
                }
            }else{
                res.status(401).json('Unauthorized Access')
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async deleteKaprodi(req,res){
        try {
            let adminIsLogin = req.userLogin.id
            let id = req.params.id
            let filterKaprodi = await kaprodi.findOne({where:{id}})

            if(adminIsLogin){
                if (filterKaprodi){
                    let deleteKaprodi = await kaprodi.destroy({where:{id}})
                    if (deleteKaprodi){
                        res.status(200).json(`Kaprodi dengan ${id} berhasil di hapus `)
                    }else{
                        res.status(400).json('Proses hapus kaprodi tidak berhasil')
                    }
                }else{
                    res.status(404).json('Proses hapus kaprodi tidak berhasil')
                }
            }else{
                res.status(401).json('Unauthorized Access')
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async createDikjar(req,res){
        try{
            let adminIsLogin = req.userLogin.id
            
            if(adminIsLogin){
                let params ={
                    namaDikjar: req.body.namaDikjar,
                    emailDikjar:req.body.emailDikjar,
                    password:req.body.password,
                    role:req.body.role,
                    satuanKerja:req.body.satuanKerja
                }
                let filterNama = params.namaDikjar
               
                let filterDikjar = await dikjar.findOne({where:{namaDikjar:filterNama}})
                if(!filterDikjar){
                    let addDikjar = await dikjar.create(params)
                    res.status(201).json(addDikjar)
                }else{
                    res.status(400).json('Dikjar telah terdaftar')
                }
            }else{
                res.status(401).json('Unauthorized Access')
            }
        }catch(error){
            res.status(500).json(error)
        }
    }

    static async editDikjar(req,res){
        try {
            let adminIsLogin = req.userLogin.id
            let id = req.params.id
            let params ={
                namaDikjar: req.body.namaDikjar,
                emailDikjar:req.body.emailDikjar,
                password:req.body.password,
                role:req.body.role,
                satuanKerja:req.body.satuanKerja
            }
        
            let filterDikjar = await dikjar.findOne({where:{id}})

            if(adminIsLogin){
                if (filterDikjar){
                    let editDikjar = await dikjar.update(params,{where:{id}, returning:true})
                    console.log(editDikjar)
                    if(editDikjar[0] == 0){
                        res.status(400).json('Dikjar Tidak Terdaftar')
                      }else if(!params){
                        res.status(400).json('Silahkan isi detail Dikjar')
                      }else{
                        res.status(200).json(`Dikjar with id ${id} has been updated`)
                      }
                }else{
                    res.status(404).json('Edit Dikjar Tidak Berhasil')
                }
            }else{
                res.status(401).json('Unauthorized Access')
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async deleteDikjar(req,res){
        try {
            let adminIsLogin = req.userLogin.id
            let id = req.params.id
            let filterDikjar = await dikjar.findOne({where:{id}})

            if(adminIsLogin){
                if (filterDikjar){
                    let deleteDikjar = await dikjar.destroy({where:{id}})
                    if (deleteDikjar){
                        res.status(200).json(`Dikjar dengan ${id} berhasil di hapus `)
                    }else{
                        res.status(400).json('Proses hapus Dikjar tidak berhasil')
                    }
                }else{
                    res.status(404).json('Proses Hapus Dikjar Tidak Berhasil')
                }
            }else{
                res.status(401).json('Unauthorized Access')
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async createMahasiswa (req,res){
        try{
            let adminIsLogin = req.userLogin.id
            
            if(adminIsLogin){
                let params ={
                    namaMahasiswa: req.body.namaMahasiswa,
                    nim:+req.body.nim,
                    email:req.body.email,
                    password:req.body.password,
                    programStudi:req.body.programStudi,
                    jenisKelamin:req.body.jenisKelamin,
                    tahunAngkatan:+req.body.tahunAngkatan,
                    semester:+req.body.semester,
                    tanggalLahir:req.body.tanggalLahir,
                    tempatLahir:req.body.tempatLahir,
                    ipk:+req.body.ipk,
                    bidangPeminatan:req.body.bidangPeminatan,
                    alamat:req.body.alamat,
                    namaOrangTua: req.body.namaOrangTua,
                    statusAkademik: req.body.statusAkademik,
                    role:req.body.role,
                    prodiId:+req.body.prodiId
                }
                let filterNama = params.namaMahasiswa
               
                let filterMahasiswa = await Mahasiswa.findOne({where:{namaMahasiswa:filterNama}})
                if(!filterMahasiswa){
                    let addMahasiswa = await Mahasiswa.create(params)
                    res.status(201).json(addMahasiswa)
                }else{
                    res.status(400).json('Mahasiswa telah terdaftar')
                }
            }else{
                res.status(401).json('Unauthorized Access')
            }
        }catch(error){
            res.status(500).json(error)
        }
    }

    static async editMahasiswa(req,res){
        try {
            let adminIsLogin = req.userLogin.id
            let id = req.params.id
            let params ={
                namaMahasiswa: req.body.namaMahasiswa,
                nim:+req.body.nim,
                email:req.body.email,
                password:req.body.password,
                programStudi:req.body.programStudi,
                jenisKelamin:req.body.jenisKelamin,
                tahunAngkatan:+req.body.tahunAngkatan,
                semester:+req.body.semester,
                tanggalLahir:req.body.tanggalLahir,
                tempatLahir:req.body.tempatLahir,
                ipk:+req.body.ipk,
                bidangPeminatan:req.body.bidangPeminatan,
                alamat:req.body.alamat,
                namaOrangTua: req.body.namaOrangTua,
                statusAkademik: req.body.statusAkademik,
                role:req.body.role,
                prodiId:+req.body.prodiId
            }
        
            let filterMahasiswa = await Mahasiswa.findOne({where:{id}})

            if(adminIsLogin){
                if (filterMahasiswa){
                    let editMahasiswa = await Mahasiswa.update(params,{where:{id}, returning:true})
                 
                    if(editMahasiswa[0] == 0){
                        res.status(400).json('Mahasiswa Tidak Terdaftar')
                      }else if(!params){
                        res.status(400).json('Silahkan isi detail Mahasiswa')
                      }else{
                        res.status(200).json(`Mahasiswa with id ${id} has been updated`)
                      }
                }else{
                    res.status(404).json('Edit Mahasiswa Tidak Berhasil')
                }
            }else{
                res.status(401).json('Unauthorized Access')
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async deleteMahasiswa(req,res){
        try {
            let adminIsLogin = req.userLogin.id
            let id = req.params.id
            let filterMahasiswa = await Mahasiswa.findOne({where:{id}})

            if(adminIsLogin){
                if (filterMahasiswa){
                    let deleteMahasiswa = await Mahasiswa.destroy({where:{id}})
                    if (deleteMahasiswa){
                        res.status(200).json(`Mahasiswa dengan ${id} berhasil di hapus `)
                    }else{
                        res.status(400).json('Proses hapus Mahasiswa tidak berhasil')
                    }
                }else{
                    res.status(404).json('Proses Hapus Mahasiswa Tidak Berhasil')
                }
            }else{
                res.status(401).json('Unauthorized Access')
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async createDosen(req,res){
        
    }

    static async editDosen(req,res){
       
    }

    static async deleteDosen(req,res){
        
    }

    static async createPembimbingInstansi(req,res){
        
    }

    static async editPembimbingInstansi(req,res){
        
    }

    static async deletePembimbingInstansi(req,res){
        
    }
}
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
            console.log(loginAdmin.role)
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
            let kaprodiList = await kaprodi.findAll()

            if (kaprodiList.length > 0 ){
                res.status(200).json(kaprodiList)             
            }else if (kaprodiList.length <= 0){
                res.status(404).json("Belum ada Kaprodi Terdaftar")
            }           
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async listMahasiswa(req,res){
        try{
            let mahasiswaList = await Mahasiswa.findAll()
            if (mahasiswaList.length > 0){
                res.status(200).json(mahasiswaList)
            }else if (mahasiswaList.length <=0){
                res.status(404).json("Belum ada Mahasiswa Terdaftar")
            }
        }catch(error){
            res.status(500).json(error)
        }
    }

    static async listDikjar(req,res){
        try{
            let dikjarList = await dikjar.findAll()
            if (dikjarList.length > 0){
                res.status(200).json(mahasiswaList)
            }else if (dikjarList.length <=0){
                res.status(404).json("Belum ada Tenaga Dikjar Terdaftar")
            }

        }catch(error){
            res.status(500).json(error)
        }
    }

    static async listDospem(req,res){
        try{
            let dospemList = await dosenPembimbing.findAll()
            if (dospemList.length > 0){
                res.status(200).json(dospemList)
            }else if (dospemList.length <=0){
                res.status(404).json("Belum ada Dosen Pembimbing Terdaftar")
            }
        }catch(error){
            res.status(500).json(error)
        }
    }

    static async listInstansi(req,res){
        try{
            let instansiList = await pembimbingInstansi.findAll()
            if (instansiList.length > 0){
                res.status(200).json(dospemList)
            }else if (instansiList.length <=0){
                res.status(404).json("Belum ada Pembimbing Instansi Terdaftar")
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
            let filterNama = params.namaKaprodi
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
                }
            }else{
                res.status(401).json('Unauthorized Access')
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
}
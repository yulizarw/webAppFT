const { Admin, Mahasiswa, dikjar, dosenPembimbing, pembimbingInstansi, kaprodi } = require("../models");
const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
    try {
        const { access_token } = req.headers;
       
        if (access_token) {
            req.userLogin = jwt.verify(access_token, process.env.SECRET);
           
            if (req.userLogin.role === "Admin") {
                await Admin.findByPk(req.userLogin.id)
                    .then((admin) => {
                        if (!admin) {
                            res.status(400).json("Wrong Auth");
                        }
                        next();
                    })
                    .catch((err) => {
                        res.status(500).json(err);
                    });
            } else if (req.userLogin.role === "Mahasiswa") {
                await Mahasiswa.findByPk(req.userLogin.id).then((mahasiswa) => {
                    if (!mahasiswa) {
                        res.status(400).json("Wrong Auth");
                    }
                    next();
                });
            } else if (req.userLogin.role === "Dikjar") {
                await dikjar.findByPk(req.userLogin.id)
                    .then((Dikjar) => {
                        if (!Dikjar) {
                            res.status(400).json("Wrong Auth");
                        }
                        next()
                    })
            } else if (req.userLogin.role === "Dosen Pembimbing") {
                await dosenPembimbing.findByPk(req.userLogin.id)
                    .then((dospem) => {
                        if (!dospem) {
                            res.status(400).json("Wrong Auth");
                        }
                        next()
                    })
            } else if (req.userLogin.role === "Pembimbing Instansi"){
                await pembimbingInstansi.findByPk(req.userLogin.id)
                .then((instansiPembimbing)=>{
                    if(!instansiPembimbing) {
                        res.status(400).json("Wrong Auth")
                    }
                    next ()
                })
            } else if (req.userLogin.role === "Kaprodi"){
                await kaprodi.findByPk(req.userLogin.id)
                .then((ketuaProdi)=> {
                    if(!ketuaProdi){
                        res.status(400).json("Wrong Auth")
                    }
                    next ()
                })
            }
        } else {
            res.status(401).json("You are unauthorized to do this");
        }
    } catch (error) {
        res.status(500).json(error)
    }
};

module.exports = { authentication };
const routes = require('express').Router()
const dikjarController = require('../controllers/dikjarController')
const {authentication} =require ("../middlewares/auth")


routes.post('/register', dikjarController.register)
routes.post('/loginDikjar', dikjarController.login)

routes.use(authentication)
routes.put('/dikjar/:id', dikjarController.editDikjar)

routes.get('/mahasiswa', dikjarController.listMahasiswa)
routes.put('/mahasiswa/:id', dikjarController.editMahasiswa)

//
routes.post('/formulirPersetujuan', dikjarController.createFormulirPersetujuan)
routes.put('/formulirPersetujuan/:id', dikjarController.editFormulirPersetujuan)
routes.delete('/formulirPersetujuan/:id', dikjarController.deleteFormulirPersetujuan)
routes.get('/formulirPersetujuan', dikjarController.listFormulirPersetujuan)

routes.post('/formulirMagang', dikjarController.createFormulirMagang)
routes.put('/formulirMagang/:id', dikjarController.editFormulirMagang)
routes.delete('/formulirMagang/:id', dikjarController.deleteFormulirMagang)
routes.get('/formulirMagang', dikjarController.listFormulirMagang)

routes.post('/suratMagang', dikjarController.createSuratMagang)
routes.put('/suratMagang/:id', dikjarController.editSuratMagang)
routes.delete('/suratMagang/:id', dikjarController.deleteSuratMagang)
routes.get('/listSuratMagang', dikjarController.listSuratMagang)

routes.post('/suratMagangInstansi', dikjarController.createSuratMagangInstansi)
routes.put('/suratMagangInstansi/:id', dikjarController.editSuratMagangInstansi)
routes.delete('/suratMagangInstansi/:id', dikjarController.deleteSuratMagangInstansi)
routes.get('/suratMagangInstansi', dikjarController.listSuratMagangInstansi)

routes.post('/suratPersetujuanInstansi', dikjarController.createSuratPersetujuanInstansi)
routes.put('/suratPersetujuanInstansi/:id', dikjarController.editSuratPersetujuanInstansi)
routes.delete('/suratPersetujuanInstansi/:id', dikjarController.deleteSuratPersetujuanInstansi)
routes.get('/suratPersetujuanInstansi', dikjarController.listSuratPersetujuanInstansi)

module.exports = routes
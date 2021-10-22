const routes = require('express').Router()
const adminController = require('../controllers/adminController')
const {authentication} =require ("../middlewares/auth")


// edit user saat password dia gk ke hash
routes.post('/register', adminController.register)
routes.post('/loginAdmin',adminController.login)

routes.use(authentication)
routes.get('/listKaprodi', adminController.listKaprodi)
routes.get('/listMahasiswa', adminController.listMahasiswa)
routes.get('/listDikjar', adminController.listDikjar)
routes.get('listDospem', adminController.listDospem)
routes.get('/listInstansi', adminController.listInstansi)

routes.post('/createKaprodi', adminController.createKaprodi)
routes.put('/kaprodi/:id', adminController.editKaprodi)
routes.delete('/kaprodi/:id', adminController.deleteKaprodi)

routes.post('/createDikjar', adminController.createDikjar)
routes.put('/editDikjar/:id', adminController.editDikjar)
routes.delete('/deleteDikjar/:id', adminController.deleteDikjar)

routes.post('/createMahasiswa', adminController.createMahasiswa)
routes.put('/editMahasiswa/:id', adminController.editMahasiswa)
routes.delete('/deleteMahasiswa/:id', adminController.deleteMahasiswa)

routes.post('/createDosen', adminController.createDosen)
routes.put('/editDosen/:id', adminController.editDosen)
routes.delete('/deleteDosen/:id', adminController.deleteDosen)

routes.post('/createPembimbingInstansi', adminController.createPembimbingInstansi)
routes.put('/editPembimbingInstansi/:id', adminController.editPembimbingInstansi)
routes.delete('/deletePembimbingInstansi/:id', adminController.deletePembimbingInstansi)

routes.post('/createInstansi', adminController.createInstansi)
routes.put('/editInstansi/:id', adminController.editInstansi)
routes.delete('/deleteInstansi/:id', adminController.deleteInstansi)
routes.get('/listInstansi',adminController.listInstansi)

routes.post('/createProdi', adminController.createProdi)
routes.put('/editProdi/:id', adminController.editProdi)
routes.delete('/deleteProdi/:id', adminController.deleteProdi)
routes.get('/listProdi', adminController.listProdi)


//penomoran surat surat masih memakai id, belum menggunakan format UPN yang string
routes.post('/createFormulirPersetujuan', adminController.createFormulirPersetujuan)
routes.put('/editFormulirPersetujuan/:id', adminController.editFormulirPersetujuan)
routes.delete('/deleteFormulirPersetujuan/:id', adminController.deleteFormulirPersetujuan)
routes.get('/listFormulirPersetujuan', adminController.listFormulirPersetujuan)

routes.post('/createFormulirMagang', adminController.createFormulirMagang)
routes.put('/editFormulirMagang/:id', adminController.editFormulirMagang)
routes.delete('/deleteFormulirMagang/:id', adminController.deleteFormulirMagang)
routes.get('/listFormulirMagang', adminController.listFormulirMagang)

routes.post('/createSuratMagang', adminController.createSuratMagang)
routes.put('/editSuratMagang/:id', adminController.editSuratMagang)
routes.delete('/deleteSuratMagang/:id', adminController.deleteSuratMagang)
routes.get('/listSuratMagang', adminController.listSuratMagang)

routes.post('/createSuratMagangInstansi', adminController.createSuratMagangInstansi)
routes.put('/editSuratMagangInstansi/:id', adminController.editSuratMagangInstansi)
routes.delete('/deleteSuratMagangInstansi/:id', adminController.deleteSuratMagangInstansi)
routes.get('/listSuratMagangInstansi', adminController.listSuratMagangInstansi)

routes.post('/createSuratPersetujuanInstansi', adminController.createSuratPersetujuanInstansi)
routes.put('/editSuratPersetujuanInstansi/:id', adminController.editSuratPersetujuanInstansi)
routes.delete('/deleteSuratPersetujuanInstansi/:id', adminController.deleteSuratPersetujuanInstansi)
routes.get('/listSuratPersetujuanInstansi', adminController.listSuratPersetujuanInstansi)

module.exports = routes
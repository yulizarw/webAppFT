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


module.exports = routes
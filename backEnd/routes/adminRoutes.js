const routes = require('express').Router()
const adminController = require('../controllers/adminController')
const {authentication} =require ("../middlewares/auth")

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

module.exports = routes
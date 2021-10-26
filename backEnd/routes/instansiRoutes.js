const routes = require('express').Router()
const pembimbingInstansiController = require('../controllers/instansiController')
const {authentication} =require ("../middlewares/auth")

routes.post('/register', pembimbingInstansiController.register)
routes.post('/login', pembimbingInstansiController.login)

routes.use(authentication)
routes.put('/pembimbingInstansi/:id', pembimbingInstansiController.editPembimbingInstansi)
routes.delete('/pembimbingInstansi/:id', pembimbingInstansiController.deletePembimbingInstansi)

routes.get('/suratPersetujuanInstansi', pembimbingInstansiController.listSuratPersetujuanInstansi)
routes.patch('/suratPersetujuanInstansi/:id', pembimbingInstansiController.editSuratPersetujuanInstansi)

routes.get('/suratKeputusanMagang', pembimbingInstansiController.listSuratMagang)

module.exports = routes
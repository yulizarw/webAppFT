const routes = require('express').Router()
const mahasiswaController = require('../controllers/mahasiswaController')
const {authentication} =require ("../middlewares/auth")


routes.post('/register', mahasiswaController.register)
routes.post('/login', mahasiswaController.login)

routes.use(authentication)
routes.put('/edit/:id', mahasiswaController.editMahasiswa)
routes.delete('/delete/:id', mahasiswaController.deleteMahasiswa)

routes.post('/formulirMagang', mahasiswaController.createFormulirMagang)
routes.put('/formulirMagang/:id', mahasiswaController.editFormulirMagang)
routes.delete('/formulirMagang/:id', mahasiswaController.deleteFormulirMagang)
module.exports = routes
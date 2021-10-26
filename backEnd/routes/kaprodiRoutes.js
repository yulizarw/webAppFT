const routes = require('express').Router()
const kaprodiController = require('../controllers/kaprodiController')
const {authentication} =require ("../middlewares/auth")

routes.post('/register', kaprodiController.register)
routes.post('/login', kaprodiController.login)

routes.use(authentication)
routes.put('/edit/:id', kaprodiController.editKaprodi)
routes.delete('/delete/:id', kaprodiController.deleteKaprodi)


routes.get('/formulirMagang', kaprodiController.listFormulirMagang)
routes.patch('/formulirMagang/:id', kaprodiController.editFormulirMagang)

module.exports = routes
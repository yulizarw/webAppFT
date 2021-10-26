const routes = require('express').Router()
const dospemController = require('../controllers/dospemController.')
const {authentication} =require ("../middlewares/auth")

routes.post('/register', dospemController.register)
routes.post('/login', dospemController.login)

routes.use(authentication)
routes.put('/edit/:id', dospemController.editDosen)
routes.delete('/delete/:id', dospemController.deleteDosen)

routes.get('/suratMagang', dospemController.listSuratMagang)
routes.get('/suratMagang/:id', dospemController.suratMagangFindByPk)





module.exports = routes
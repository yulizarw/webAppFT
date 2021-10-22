const routes = require('express').Router()
const kaprodiRoutes = require('./kaprodiRoutes')
const adminRoutes = require('./adminRoutes')
const dikjarRoutes = require('./dikjarRoutes')
const dospemRoutes = require('./dospemRoutes')
const instansiRoutes = require('./instansiRoutes')
const mahasiswaRoutes = require('./mahasiswaRoutes')

routes.use('/kaprodi', kaprodiRoutes)
routes.use('/admin', adminRoutes)
routes.use('/dikjar', dikjarRoutes)
routes.use('/dospem', dospemRoutes)
routes.use('/instansi', instansiRoutes)
routes.use('/mahasiswa',mahasiswaRoutes)


module.exports = routes
const express = require('express')
const path = require('path')
const planetRouter = require('./routes/planets/planet.route')
const launchesRouter = require('./routes/launches/launches.route')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, "..", 'public')))
app.use(cors())
app.use('/planets',planetRouter)
app.use('/launches',launchesRouter)

module.exports = app
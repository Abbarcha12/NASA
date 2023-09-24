const planetRouter = require('./planets/planet.route')
const launchesRouter = require('./launches/launches.route')
const express = require('express')
const api =express.Router()
api.use('/planets',planetRouter)
api.use('/launches',launchesRouter)


module.exports=api
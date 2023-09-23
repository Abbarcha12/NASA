const express = require('express')
const {httpGetAllPlanets} =require('../planets/planet.controller')
const planetRouter = express.Router()


planetRouter.get('/',httpGetAllPlanets)




module.exports=planetRouter
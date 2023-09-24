const express = require('express')
const path = require('path')
const api= require('./routes/api')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, "..", 'public')))
app.use(cors())
app.use("/v1",api)

module.exports = app
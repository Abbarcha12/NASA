const http = require('http')
const app = require('./app')
const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://barcha1:Abrar123@cluster0.h0y1qpb.mongodb.net/nasa';


mongoose.connection.once('open', () => {
    console.log("Connected to mongo")
})
mongoose.connection.on('error', (err) => {
    console.log(`Error in connection ${err}`) //if error occurs then it will print the err message on terminal
})
const {
    loadPlanetsData
} = require('./models/planet.model')
const {loadLaunchData} = require('./models/lunches.model')
const PORT = 8000
const server = http.createServer(app)
async function startServer() {
    await mongoose.connect(MONGO_URI, {

    })
    await loadPlanetsData()
   await loadLaunchData()
    server.listen(PORT, () => {
        console.log(`listening to ${PORT}`)
    })
}

startServer()
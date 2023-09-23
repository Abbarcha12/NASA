const launches = require('./launches.mongo.js')
const planets= require('./planets.mongo.js')
const Default_FlightNumber=100
const launch = {
    flightNumber: 100,
    mission: "kepler mission",
    rocket: "rocket",
    lunchDate: new Date("December 27,2030"),
    target: "kepler-422",
    customers: ['ZTM', 'NASA'],
    upcoming: true,
    success: true
}

saveLaunch(launch)

function existsLaunchWithId(launchId) {

    return launches.has(launchId)
}
async function saveLaunch(launch) {
    await launches.updateOne({
        flightNumber: launch.flightNumber,

    }, launch, {
        upsert: true
    })
}

function addNewLaunches(launch) {
    latestFlightNumber++;
    launches.set(latestFlightNumber, Object.assign(launch, {
        success: true,
        upcoming: true,
        customer: ['Node Developer', "self Learning"],
        flightNumber: latestFlightNumber
    }))
}

function abortedLaunchById(launchId) {
    const aborted = launches.get(launchId)
    aborted.upcoming = false
    aborted.success = false
    return aborted

}
async function getAllLaunches(){
    const latestLaunch=await launches.find().sort('-flightNumber')
if(!latestLaunch){
    return Default_FlightNumber;
}
    return latestLaunch.flightNumber
}
async function getAllLaunches() {
    const planet = await planets.findOne({
        keplerName:launch.target
    })
    if(!planet){
        throw new Error('No matching Planet found')
    }
    return await launches.find({}, {
        '_id': 0,
        "__v": 0
    })
}
module.exports = {
    addNewLaunches,
    getAllLaunches,
    existsLaunchWithId,
    abortedLaunchById
}
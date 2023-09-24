const launches = require('./launches.mongo.js')
const planets = require('./planets.mongo.js')
const Default_FlightNumber = 100
const launch = {
    flightNumber: 100,
    mission: "kepler mission",
    rocket: "rocket",
    lunchDate: new Date("December 27,2030"),
    target: "Kepler-452 b",
    customers: ['ZTM', 'NASA'],
    upcoming: true,
    success: true
}

saveLaunch(launch)

async function existsLaunchWithId(launchId) {

    return await launches.find({
        flightNumber:launchId
    })
}

async function getLatestFlightNumber() {
    let latestFlightNumb = await launches.findOne({}).sort('-flightNumber')
    if (!latestFlightNumb) {
        return (Default_FlightNumber)
    }
    return latestFlightNumb.flightNumber
}

async function saveLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target,
    })

    if (!planet) {
        throw new Error('No matching Planet found')
    }
    await launches.updateOne({
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true
    })
}



async function addNewLaunches(launch) {
    const NewFlightNum = await getLatestFlightNumber() + 1
    const addNewLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['Node Developer', 'react js '],
        flightNumber: NewFlightNum
    })
    await saveLaunch(addNewLaunch)
}



async function abortedLaunchById(launchId) {
    try {
        console.log(launchId)
        const aborted = await launches.updateOne(
          { flightNumber: launchId },
          { upcoming: false, success: false }
        );
      
        return aborted.ok === 1 && aborted.nModified === 1;
      } catch (error) {
        console.error('Error updating launch:', error);
        return false; // or throw an error or handle it in an appropriate way
      }
      
}


async function getAllLaunches() {
    const latestLaunch = await launches.find({})
    return latestLaunch

  
    
}

module.exports = {
    addNewLaunches,
    getAllLaunches,
    existsLaunchWithId,
    abortedLaunchById
}
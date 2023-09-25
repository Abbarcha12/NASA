const launches = require('./launches.mongo.js')
const planets = require('./planets.mongo.js')
const Default_FlightNumber = 100
const axios = require('axios')
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

    return await launches.findOne({
        flightNumber: launchId
    })
}

async function getLatestFlightNumber() {
    let latestFlightNumb = await launches.findOne({}).sort('-flightNumber')
    if (!latestFlightNumb) {
        return (Default_FlightNumber < "latest flightNumber Not found")
    }
    return latestFlightNumb.flightNumber
}

async function getAllLaunches() {
    const latestLaunch = await launches.find({})
    return latestLaunch

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
        const aborted = await launches.updateOne({
            flightNumber: launchId
        }, {
            $set: {
                success: false,
                upcoming: false

            }
        })

        if (aborted.modifiedCount === 1) {
            return {
                success: true,
                message: 'Launch updated successfully'
            };
        } else {
            return {
                success: false,
                message: 'Launch not found or not updated'
            };
        }
    } catch (error) {
        console.error('Error updating launch:', error);
        throw error;
    }
}
const SPACE_URL = "https://api.spacexdata.com/v5/launches/query"


const loadLaunchData = async () => {
  const response= await axios.post(SPACE_URL, {
        query: {},
        pagination:false,
        options: [{
            populate: [{
                    path: 'rocket',
                    select: {
                        name: 1
                    }
                },
                {
                    path: 'payloads',
                    select: {
                        'customers': 1
                    }
                }
            ]
        }]
    })
    const loadData= response.data.docs
    for(const  launchDoc of loadData){
        const payloads=launchDoc['payloads']
        const customers=payloads.flatMap((payload)=>{
            return payload['customers']
        })

        const launch={
            flightNumber :launchDoc['flight_number'] ,
            mission:launchDoc['name'],
            rocket:launchDoc['rocket']['name'],
            lunchDate:launchDoc['date_local'],
            upcoming:launchDoc['upcoming'],
            success:launchDoc['success'],
            customer:customers,
            
            
        }
        console.log(launch.flightNumber,launch.mission)
    }

    
}



module.exports = {
    loadLaunchData,
    addNewLaunches,
    getAllLaunches,
    existsLaunchWithId,
    abortedLaunchById
}
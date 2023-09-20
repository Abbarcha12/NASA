
const launches =new Map()
let latestFlightNumber = 100;
const launch ={
    flightNumber:100,
    mission:"kepler mission",
    rocket:"rocket",
    lunchDate:new Date("December 27,2030"),
    target:"kepler-422",
    customer:['ZTM','NASA'],
    upcoming:true,
    success:true
}
launches.set(launch.flightNumber,launch)

function existsLaunchWithId(launchId){
    return launches.has(launchId)
}
function addNewLaunches(launch){
    latestFlightNumber++;
    launches.set(latestFlightNumber,Object.assign(launch,{
        success:true,
        upcoming:true,
        customer:['Node Developer',"self Learning"],
        flightNumber:latestFlightNumber
    }))
}

function abortedLaunchById(launchId){
const aborted=launches.get(launchId)
aborted.upcoming=false
aborted.success=false
return aborted

}
module.exports={
    addNewLaunches,
    launches,
    existsLaunchWithId,
    abortedLaunchById
}
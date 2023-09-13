
const launches =new Map()

const launch ={
    flightNumber:100,
    mission:"kepler mission",
    rocket:"rocket",
    lunchDate:new Date("December 27,2030"),
    destination:"kepler-422",
    customer:['ZTM','NASA'],
    upcoming:true,
    success:true
}
launches.set(launch.flightNumber,launch)


module.exports={
    launches
}
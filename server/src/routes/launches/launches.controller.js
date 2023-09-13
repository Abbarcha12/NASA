const {launches} = require('../../models/lunches.model')


const getAllLaunches= async (req,res)=>{
    return res.status(200).json(Array.from(launches.values()))
}

module.exports={
    getAllLaunches
}

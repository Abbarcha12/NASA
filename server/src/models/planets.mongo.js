const mongoose =require('mongoose')

const planetSchema= new mongoose.Schema({
    keplerName:{
    type:String,required:[true,'Kepler name is required']},
   
})

module.exports= mongoose.model('planets',planetSchema)
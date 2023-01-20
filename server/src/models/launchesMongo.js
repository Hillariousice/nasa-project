const mongoose = require('mongoose')


const launchesSchema = new mongoose.Schema({
    flightNumber: {
        type:Number,
        required:true,
    },
    mission:{type:String,
        required:true,},
    rocket:{type:String,
        required:true},
    launchDate:{type:Date,
        required:true},
    destination:{ type: String,
    required:true},
    customer:[String],
    upcoming:{type:Boolean,required:true},
    success:{type:Boolean,required:true,default:true},
})


 module.exports= mongoose.model('Launch',launchesSchema)

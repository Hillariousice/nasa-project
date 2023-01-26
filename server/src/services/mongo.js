const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connection.once('open',()=>{
    console.log('MongoDB connection ready!')
})

mongoose.connection.on('error',(err)=>{
    console.error(err)
})

const MONGO_URL =process.env.MONGO_URL



async function mongoConnect(){
    await mongoose.connect(MONGO_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
       })
}

 async function mongoDisconnect(){
    await mongoose.disconnect()
}

module.exports={
    mongoConnect,
    mongoDisconnect
}
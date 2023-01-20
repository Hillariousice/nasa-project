const mongoose = require('mongoose')
const http =require('http')

const app = require('./app')
const {loadPlanetsData} = require('./models/planetsModel')

const PORT = process.env.PORT || 8000

mongoose.connection.once('open',()=>{
    console.log('MongoDB connection ready!')
})

mongoose.connection.on('error',(err)=>{
    console.error(err)
})

async function startServer(){
   await mongoose.connect(MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
   })
    await loadPlanetsData()
} 

const MONGO_URL ="mongodb+srv://hillarygreen:hillarygreen25@nasacluster.w9uz9hn.mongodb.net/nasa?retryWrites=true&w=majority"
const server = http.createServer(app)

server.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})
startServer()
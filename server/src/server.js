const {mongoConnect} = require('./services/mongo')
const http =require('http')
const path = require('path')
 require('dotenv').config()

const app = require('./app')
const {loadPlanetsData} = require('./models/planetsModel')
const {loadLaunchData}=require('./models/launchesModel')

const PORT = process.env.PORT || 8000



async function startServer(){
   await mongoConnect()
    await loadPlanetsData()
    await loadLaunchData()
} 


const server = http.createServer(app)

server.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})
startServer()
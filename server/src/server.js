
const http =require('http')

const app = require('./app')
const {loadPlanetsData} = require('./models/planetsModel')

const PORT = process.env.PORT || 8000

async function startServer(){
    await loadPlanetsData()
} 
const server = http.createServer(app)

server.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})
startServer()
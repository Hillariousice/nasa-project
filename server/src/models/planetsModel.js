const path = require('path')
const planets = require('./planetsMongo')
const {parse }= require('csv-parse')
const fs = require('fs')


function isHabitablePlanet(planet){
    return planet['koi-disposition'] === 'CONFIRMED' &&
    planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6
}

function loadPlanetsData(){
   return new Promise((resolve,reject)=>{
    fs.createReadStream(path.join(__dirname,'..','..','data','kepler_data.csv'))
    .pipe(parse({
        comment:'#',
        columns:true,
    }))
    .on('data',(data)=>{
    if(isHabitablePlanet(data)){
       savePlanet(data)
    }
    })
    .on('error',(err)=>{
        console.log(err)
        reject(err)
    })
    .on('end', async()=>{
        console.log(habitablePlanets.map((planet)=>{
            return planet['kepler_name']
        }))
        const countPlanetsFound = (await getAllPlanets()).length
        console.log(`${countPlanetsFound} habitable planets found!`)
        resolve()
    })
  
   }) 
}
 async function getAllPlanets(){
    return await planets.find({})
}


async  function savePlanet(planet){
   try{
    planets.updateOne({
        keplerName:data.kepler_name
    },{
        keplerName:data.kepler_name
    },{
        upsert:true
    })
   }catch(err){
    console.error(`Could not save planet ${err}`)
   }
}

module.exports={
 getAllPlanets,
    loadPlanetsData
}
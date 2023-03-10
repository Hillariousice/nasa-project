const launchesDB =require('./launchesMongo')
const planets = require('./planetsMongo')
const launches = new Map()
const axios = require('axios')



const DEFAULT_FLIGHT_NUMBER = 100

const SPACEX_API_URL ='https://api.spacexdata.com/v4/launches/query'

async function populateLaunches(){
    console.log('Downloading launch data...')
     const response =await axios.post(SPACEX_API_URL,{
        query:{},
        options:{
            pagination:false,
            populate:[
                {
                    path:'rocket',
                    select:{
                        name:1
                    }
                },{
                    path:'payloads',
                    select:{
                     'customers':1
                    }
                }
            ]
        }
    })

if(response.status !== 200){
    console.log('Problem downloading launch data')
    throw new Error('Launch data download failed')
}

    const launchDocs =response.data.docs
    for(const launchDoc of launchDocs){
        const payloads = launchDoc['payloads']
        const customers = payloads.flatMap((payload)=>{
            return payload['customers']
        })
        const launch ={
            flightNumber:launchDoc['flight_number'],
            mission:launchDoc['name'],
            rocket:launchDoc['rocket']['name'],
            launchDate: launchDoc['date_local'],
            destination :launchDoc['flight_number'],
            upcoming:launchDoc['upcoming'],
            success: launchDoc['success'],
            customer:customers
        }
        console.log(`${launch.flightNumber} ${launch.mission}`)
     await saveLaunch(launch)
    }

}

async function loadLaunchData(){
    const firstLaunch = await findLaunch({
        flightNumber:1,
        rocket:'Falcon 1',
        mission:'FalconSat'
    })
    if(firstLaunch){
        console.log('Launch data already loaded')
        
    }else{
       await populateLaunches()
    }
   
}

async function findLaunch(filter){
    return await launchesDB.findOne(filter)
}

 async function existsLaunchWithId(launchId){
    return  await findLaunch({
        flightNumber:launchId
    })

}

async function getAllLaunches(skip,limit){
    return await launchesDB.find({},{'_id':0,'__v':0})
    .sort({flightNumber: 1})
    .skip(skip)
    .limit(limit)
}




async function scheduleNewLaunch(launch){
    const planet = planets.findOne({
        keplerName: launch.destination,
    })
    if(!planet){
    throw new Error('No such planet was found.')
    }
    const newFlightNumber = await getLatestFlightNumber()+1
    
   const newLaunch = Object.assign(launch,{
                success:true,
                upcoming:true,
                customer:['ZeroToMastery','NASA'],
                flightNumber:newFlightNumber,
          })
          await saveLaunch(newLaunch)
}

async function abortLaunchById(launchId){
//    const aborted = launches.get(launchId)
// aborted.upcoming =false
// aborted.success=false
// return aborted
 const aborted = await launchesDB.updateOne({ 
 flightNumber:launchId,
},{
    upcoming:false,
    success:false
})
return aborted.modifiedCount === 1;
}

 async function getLatestFlightNumber(){ 
    const latestLaunch = await launchesDB.findOne({})
    .sort('-flightNumber')
if(!latestLaunch){
return DEFAULT_FLIGHT_NUMBER
}
    return latestLaunch.flightNumber

}

async function saveLaunch(launch){ 
    
    await launchesDB.findOneAndUpdate({
        flightNumber:launch.flightNumber,
      },launch,{upsert:true})
}
module.exports ={
    loadLaunchData,
   scheduleNewLaunch,
    existsLaunchWithId,
    abortLaunchById,
    getAllLaunches
}
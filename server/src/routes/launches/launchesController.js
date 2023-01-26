const {existsLaunchWithId,abortLaunchById, getAllLaunches, scheduleNewLaunch }= require('../../models/launchesModel')
const { getPagination} = require('../../services/query')

function httpGetAllLaunches(req,res){
 const {skip,limit} = getPagination(req.query)
 const launches = getAllLaunches(skip,limit)
   return res.status(200).json(launches)
   
}

async function httpAddNewLaunch(req,res){
const launch = req.body

if(!launch.mission||!launch.rocket||!launch.launchDate||!launch.destination){
return res.status(400).json({
    error:'Mission required launch property'
})
}
launch.launchDate = new Date(launch.launchDate)
if(isNaN(launch.launchDate)){
    return res.status(400).json({
        error:'Invalid launch date'
    })
}
 await scheduleNewLaunch(launch)
   console.log(scheduleNewLaunch(launch))
     return res.status(201).json(launch)
}


 async function httpAbortLaunch(req,res){
    const launchId = Number(req.params.id)
    const existLaunch =await existsLaunchWithId(launchId)
 if(!existLaunch){
    return res.status(400).json({
        error:'Launch not found'
    })
 }
 const aborted = abortLaunchById(launchId)
 if(!aborted){
    return res.status(400).json({
        error:'Launch not aborted'
    })
 }
    return res.status(200).json(aborted)
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
}
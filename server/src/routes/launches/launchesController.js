const {launches, addNewLaunch,existsLaunchWithId,abortLaunchById }= require('../../models/launchesModel')


function httpGetAllLaunches(req,res){
    for(const value of launches.values()){

   return res.status(200).json(Array.from(launches.values()))
    }
}

function httpAddNewLaunch(req,res){
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
addNewLaunch(launch)
   console.log(addNewLaunch(launch))
     return res.status(201).json(launch)
}


function httpAbortLaunch(req,res){
    const launchId = +req.params.id
 if(!existsLaunchWithId(launchId)){
    return res.status(400).json({
        error:'Launch not found'
    })
 }
 const aborted = abortLaunchById(launchId)
    return res.status(201).json(aborted)
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
}
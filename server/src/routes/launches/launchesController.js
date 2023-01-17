const {launches, addNewLaunch }= require('../../models/launchesModel')


function httpGetAllLaunches(req,res){
    for(const value of launches.values()){

   return res.status(200).json(Array.from(launches.values()))
    }
}

function httpAddNewLaunches(req,res){
const launch = req.body
launch.launchDate = new Date(launch.launchDate)
    addNewLaunch(launch)
    res.status(201)
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunches
}
const {planets }= require('../../models/planetsModel')


function httpGetAllPlanets(req,res){
   return res.status(200).json(planets)
}

module.exports = {
    httpGetAllPlanets
}
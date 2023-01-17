const launches = new Map()


let latestFlightNumber = 100

const launch = {
    flightNumber:100,
    mission:'Kepler Exploration X',
    rocket:'Explorer IS1',
    launchDate: new Date('December 27,2030'),
    destination :'Kepler-422 b',
    customer:['NASA','ZTM'],
    upcoming:true,
    success: true,
}


launches.set(launch.flightNumber,launch)

function addNewLaunch(launch){
    latestFlightNumber++;
    launches.set(latestFlightNumber,Object.assign(launch,{
        success:true,
        upcoming:true,
        customer:['ZeroToMastery','NASA'],
        flightNumber:latestFlightNumber,
  }))
}

module.exports ={
    launches,
    addNewLaunch
}
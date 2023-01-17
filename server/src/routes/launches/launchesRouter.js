const express = require('express')
const {httpGetAllLaunches,httpAddNewLaunches} = require('./launchesController')

const launchesRouter = express.Router()


launchesRouter.get('/launches', httpGetAllLaunches)
launchesRouter.post('/launches', httpAddNewLaunches)


module.exports =launchesRouter
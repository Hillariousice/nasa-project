const express = require('express')
const {httpGetAllPlanets} = require('./planetsController')

const planetsRouter = express.Router()


planetsRouter.get('/', httpGetAllPlanets)


module.exports = planetsRouter
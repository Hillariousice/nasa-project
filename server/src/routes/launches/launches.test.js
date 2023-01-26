const request = require('supertest')
const app = require('../../app')
const {mongoConnect,mongoDisconnect}= require('../../services/mongo')


describe('Launches API',()=>{
    beforeAll(async()=>{
      await  mongoConnect()
    })
    afterAll(async()=>{
        await  mongoDisconnect()
      })
    describe('Test GET/launches',()=>{
        test('It should respond with 200 success',async()=>{
            const response = await request(app)
            .get('/v1/launches')
            .expect('Content-Type',/json/)
            .expect(200)
        })
    })
    
    describe('Test POST/launch',()=>{
        const completeLaunchData ={
            mission:"USS Enterprise",
            rocker:'NCC 1701-D',
            destination:'Kepler-62 f',
            launchDate:'March 13, 2028'
        }
        const launchWithoutDate ={
            mission:"USS Enterprise",
            rocker:'NCC 1701-D',
            destination:'Kepler-62 f',
           
        }
        const launchDataWithInvalidDate ={
            mission:"USS Enterprise",
            rocker:'NCC 1701-D',
            destination:'Kepler-62 f',
            launchDate:'cat'
        }
        test('It should respond with 201 created',async()=>{
            const response = await request(app)
            .post('/v1/launches')
            .send(completeLaunchData)
            .expect('Content-Type',/json/)
            .expect(201)
    
            const requestDate = new Date(completeLaunchData.launchDate).valueOf()
            const responseDate = new Date(response.body.launchDate).valueOf()
            expect(responseDate).toMatchObject(requestDate)
            expect(response.body).toMatchObject(launchWithoutDate)
        })
        test('It should  catch missing required properties',async()=>{
            const response = await request(app)
            .post('/v1/launches')
            .send(launchWithoutDate)
            .expect('Content-Type',/json/)
            .expect(400)
            expect(response.body).toStrictEqual({
                error:'Mission required launch property'
            })
        })
        test('It should catch invalid dates',async()=>{
            const response = await request(app)
            .post('/v1/launches')
            .send(launchDataWithInvalidDate)
            .expect('Content-Type',/json/)
            .expect(400)
            expect(response.body).toStrictEqual({
                error:'Invalid launch date'
            })
        })
    })
})

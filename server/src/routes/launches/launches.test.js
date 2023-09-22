const request = require('supertest')
const app = require('../../app')

describe('Test GET/launches', () => {
    test('It should respond with 200 success', async () => {
        const response = await request(app)
            .get('launches')
            .expect('Content-Type', /json/)
            .expect(200)

    })
})
describe('Test POST /launch', () => {
    test('It should response with 201 created ', async () => {
        const completeLauchData = {
            mission: "Node js Developer",
            rocket: "stay Strong ",
            target: "Becoming a Node developer in this month",
            launchDate: "22 september, 2028"

        }
        const LaunchDataWithInvalidData = {
            mission: "Node js Developer",
            rocket: "stay Strong ",
            target: "Becoming a Node developer in this month",
            launchDate: "Developer "

        }
        const launchDataWithOutLauchDate = {
            mission: "Node js Developer",
            rocket: "stay Strong ",
            target: "Becoming a Node developer in this month",


        }
        const response = await request(app)
            .post('/launches')
            .send(completeLauchData)
            .expect('Content-Type', /json/)
            .expect(201)
        const requestData = new Date(completeLauchData.launchDate).valueOf()
        const responseDate = new Date(response.body.launchDate).valueOf()
        expect(responseDate).toBe(requestData)
        expect(response.body).toMatchObject(launchDataWithOutLauchDate)
    })
    test('It should catch missing required properties  ', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithOutLauchDate)
            .expect('Content-Type', /json/)
            .expect(400)

        expect(response.body).toStringEqual({
            error: "Missing required launch property"
        })
    })
    test('It should catch invalid dates', async () => {
        const response = await request(app)
            .post('/launches')
            .send(LaunchDataWithInvalidData)
            .expect('Content-Type', /json/)
            .expect(400)

        expect(response.body).toStringEqual({
            error: "Invalid Date "
        })

    })
})
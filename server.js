// DEPENDENCIES
const express = require('express')
const app = express()
const cars = require('./controllers/cars_controller')
const users = require('./controllers/users_controller')

// CONFIGURATION / MIDDLEWARE
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ROOT
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Tailgating all over the Backend'
    })
})

// CONTROLLERS  
const carsController = require('./controllers/bands_controller')
app.use('/cars', carsController)

const userController = require('./controllers/events_controller')
app.use('/user', userController)

// LISTEN
app.listen(process.env.PORT, () => {
    console.log(`Tailgatin' on port: ${process.env.PORT}`)
})
// DEPENDENCIES
const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config()
const {cars_controller: carsController, users_controller: usersController} = require ("./controllers")
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => {
        console.log('Connected to mongo!')
    }
)

// CONFIGURATION / MIDDLEWARE

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ROOT
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Tailgating all over the Backend'
    })
})

// CONTROLLERS  
app.use('/cars', carsController)

app.use('/users', usersController)

// LISTEN
app.listen(process.env.PORT, () => {
    console.log(`Tailgatin' on port: ${process.env.PORT}`)
})
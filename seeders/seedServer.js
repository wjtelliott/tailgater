/**
 * Run this file to seed the mongoose server we have
 */

// Connect to Mongo
require('dotenv').config()
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => {
        console.log('Connected to mongo! Seeding server...')
    }
)

// Import models
const { userSchema: Users, carSchema: Cars } = require('../models/');


const seedData = async () => {
    const data = await Users.findOne({});
    if (data != null) {
        console.log('Server is already seeded. Closing');
        return;
    }

    await Users.insertMany(require('./user-seed-data'));
    await Cars.insertMany(require('./car-seed-data'));

    console.log('Server is seeded! Rock on.');
}

seedData();

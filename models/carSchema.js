const
    mongoose = require('mongoose'),
    { Schema } = mongoose,

    carSchema = new Schema({
        make: { type: String, required: true },
        model: { type: String, required: true },
        year: { type: Number, required: true },
        color: String,
        milage: Number,
        condition: Number,
        //? should this be required?
        imageUrl: String,
        userId: [{
            type: Schema.Types.ObjectId, ref: 'users'
        }],
    });

module.exports = mongoose.model('cars', carSchema);
const
    mongoose = require('mongoose'),
    { Schema } = mongoose,

    userSchema = new Schema({
        name: { type: String, required: true },

        //* Email to log in
        email: { type: String, required: true },
        phone: String,

        //? We want the passwords here?
        psw: { type: String, required: true },
        city: String,
        state: String
    });

module.exports = mongoose.model('users', userSchema);
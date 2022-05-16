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

/**
 * Call this when we don't want to show a password to the client
 */
userSchema.methods.revokePassword = function() {
    const { psw, ...otherProperties } = this._doc;
    this._doc = otherProperties;
    return this;
}

module.exports = mongoose.model('users', userSchema);
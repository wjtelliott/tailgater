const
    mongoose = require('mongoose'),
    { Schema } = mongoose,

    userSchema = new Schema({
        name: { type: String, required: true },
        userLoginId: { type: String, required: true },
        //* Email used to log in
        email: { type: String, required: true },
        phone: String,
        city: String,
        state: String
    });

/**
 * Call this when we don't want to show a loginID to the client
 */
userSchema.methods.revokeLogin = function() {
    const { userLoginId, ...otherProperties } = this._doc;
    this._doc = otherProperties;
    return this;
}

module.exports = mongoose.model('users', userSchema);
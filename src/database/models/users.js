const mongoose = require("mongoose")
const { Schema } = mongoose

const userSchema = {
    username: String,
    completeName: String,
    email: String,
    celphoneNumber: Number,
    addresses: [String],
    password: String
}

function createUserModel () {
    const User = mongoose.model("User", userSchema)
    return User
}

module.exports = {
    createUserModel
}
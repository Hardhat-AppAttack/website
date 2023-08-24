const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        max: 50
    },

    contact: {
        type: String,
        min: 10,
        max: 13,
        unique: false, 
        required: true
    },
    
    email: {
        type: String,
        trim: true,
        required: true,
        max: 50,
        unique: true
    },

    id: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        max: 10,
        min: 10
    },

    password: {
        type: String, 
        required: true
    }
}, {timestamps: true})

const user = mongoose.model('AppAttack_SignUp', userSchema)
module.exports = user
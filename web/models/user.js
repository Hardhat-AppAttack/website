const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        max: 50
    },

    // contact: {
    //     type: String,
    //     minlength: 10,
    //     maxlength: 13,
    //     unique: false, 
    //     required: true
    // },
    
    email: {
        type: String,
        trim: true,
        required: true,
        max: 50,
        unique: true
    },

    std_id: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        maxlength: 10,
        minlength: 10
    },

    is_admin: {
        type: Boolean,
        required: true
    },

    password: {
        type: String, 
        required: true
    }

    // verified: {
    //     type: Boolean
    // }
}, {timestamps: true})

const user = mongoose.model('AppAttack_SignUp', userSchema)
module.exports = user
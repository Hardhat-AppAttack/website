const mongoose = require('mongoose');
const Schema = mongoose.Schema

const formSchema = new Schema({

    name: {
        type: String,
        trim: true,
        required: true,
        max: 50

    },

    id: {
        type: Object,
        required: true,
        max: 50,
        unique: true

    },

    email: {
    
        type: String,
        trim: true,
        required: true,
        max: 25,
 
    },

    message: {
      type: String,
      required: true,
      max: 500
    }


}, {timestamps: true})

const contactForm = mongoose.model('Appattack_GetInTouch', formSchema);
module.exports = contactForm


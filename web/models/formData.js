const mongoose = require('mongoose');
const Schema = mongoose.Schema

const formSchema = new Schema({

    // name: {
    //     type: String,
    //     trim: true,
    //     required: true,
    //     max: 50

    // },

    std_id: {
        type: String,
        required: true,
        maxlength: 10,
        minlength: 10,
        unique: true

    },

    // email: {
    
    //     type: String,
    //     trim: true,
    //     required: true,
    //     max: 25,
 
    // },

    message: {
      type: String,
      required: true,
      maxlength: 500
    }


}, {timestamps: true})

const contactForm = mongoose.model('Appattack_GetInTouch', formSchema);
module.exports = contactForm


const mongoose = require('mongoose');
const Schema = mongoose.Schema

const recruitFormSchema = new Schema({


    given_name: {
        type: String,
        trim: true,
        required: true,
        max: 50

    },

    family_name: {
        type: String,
        trim: true,
        required: true,
        max: 50

    },

    std_id: {
        type: Object,
        required: true,
        maxlength: 10,
        minlength: 10,
        unique: true,
        validate: {
            validator: async std_id => await recruitForm.where({ std_id }).countDocuments() === 0,
            message: ({value}) => `ID ${value} has already been used before to apply!`
        }

    },

    enrolled_unit: {
        type: String,
        required: true,
        max: 50
    },

    target_grade: {
        type: String,
        required: true,
        max: 50
    },

    reason_to_join: {
        type: String,
        required: true,
        max: 500
    },

    team: {
    
        type: String,
        
        required: true,
        max: 25,
 
    },

    
    prev_exp: {
    
        type: String,
        
        required: true,
        max: 200,
 
    },

    
    leadership_interest: {
    
        type: Boolean,
        required: true
 
    },

    available_days: {
      type: String,
      required: true,
      max: 50
    },

    available_timing: {
        type: Object,
        required: true,
        max: 50
      }


}, {timestamps: true})

const recruitForm = mongoose.model('Appattack_Recruitment', recruitFormSchema);
module.exports = recruitForm


const mongoose = require('mongoose');
const validate = require('mongoose-validator');

module.exports = mongoose.model('research-resources', new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    week: {
        type: Number, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    time_taken_to_complete: {
        type: String,
        required: true
    },
    url: {
        type: String,
        reuired: true,
        validate: validate({
            validator: 'isURL',
            message: 'Invalid URL'
        }),
    }
}, { collection: 'research-resources' }))
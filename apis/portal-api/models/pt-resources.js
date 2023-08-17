const mongoose = require('mongoose');
const validate = require('mongoose-validator');

module.exports = mongoose.model('pen-test-resources', new mongoose.Schema({
    name: String,
    created: {
        type: Date,
        default: Date.now
    },
    level: Number,
    description: String,
    time_taken_to_complete: String,
    url: {
        type: String,
        reuired: true,
        validate: validate({
            validator: 'isURL',
            message: 'Invalid URL'
        }),
    }
}, { collection: 'pt-resources' }))
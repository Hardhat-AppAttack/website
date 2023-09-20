const mongoose = require('mongoose');
const validate = require('mongoose-validator');

module.exports = mongoose.model('research-resources', new mongoose.Schema({
    name: String,
    created: {
        type: Date,
        default: Date.now
    },
    week: Number,
    description: String,
    time_taken_to_complete: String,
    url: String
}, { collection: 'research-resources' }))
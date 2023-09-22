const mongoose = require('mongoose');
const validate = require('mongoose-validator');

const web_rev_resource_schema = new mongoose.Schema({
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
    tutorial_type: {
        type: String,
        required: true,
        enum: ['language', 'tool', 'web development concepts']
    },
    description: {
        type: String,
        required: true
    },
    time_taken_to_complete: String,
    url: {
        type: String,
        reuired: true,
        validate: validate({
            validator: 'isURL',
            message: 'Invalid URL'
        }),
    }
}, { collection: 'web-dev-resources' })

const web_dev_tools_schema = new mongoose.Schema({
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
    url: {
        type: String,
        reuired: true,
        validate: validate({
            validator: 'isURL',
            message: 'Invalid URL'
        }),
    }
}, { collection: 'web-dev-tools' })

const web_dev_resources = mongoose.model('web-dev-resource', web_rev_resource_schema);

const web_dev_tools = mongoose.model('web-dev-tools', web_dev_tools_schema);

module.exports = {
    web_dev_resources,
    web_dev_tools
}
const mongoose = require('mongoose');
const validate = require('mongoose-validator');

const pt_src_resources_schema = new mongoose.Schema({
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
    team: {
        type: String,
        require: true,
        enum: ['PT', 'SRC']
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
}, { collection: 'pt-src-resources' })

const pt_src_tools_resources_schema = new mongoose.Schema({
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
    team: {
        type: String,
        require: true,
        enum: ['PT', 'SRC']
    },
    os: {
        type: String,
        required: true,
        enum: ['windows', 'linux', 'mac-os']
    },
    description: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
        validate: validate({
            validator: 'isURL',
            message: 'Invalid URL'
        })
    }
}, {collection: 'pt-src-tools-resources'})

const pt_src_resources = mongoose.model('pt-src-resources', pt_src_resources_schema);

const pt_src_tools_resources = mongoose.model('pt-src-tools-resources', pt_src_tools_resources_schema);

module.exports = {
    pt_src_resources,
    pt_src_tools_resources
}
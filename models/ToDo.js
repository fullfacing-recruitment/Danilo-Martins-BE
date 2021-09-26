const { Double } = require('bson');
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true
    },

    description: {
        type: String,
        default: "",
    },

    priority: {
        type: Number,
        enum: [0, 1, 2],  // lowest to highest priority
        default: 0  // priority of a new item is low by default
    },

    deadline: Number,  // the date will be an integer number representing the number of milliseconds ellapsed since midnight, January 1, 1970 UTC
    
    created: {
        type: Number,  // date, in ms, when the item was created
        required: true
    },

    lastModified: {
        type: Number, // date, in ms, when the item was last modified
        required: true
    },
});

const ToDo = mongoose.model("ToDo", todoSchema);

module.exports = ToDo; 
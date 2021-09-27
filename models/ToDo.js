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
        enum: [0, 1, 2],  // allowed values, lowest to highest priority
        default: 0  // priority of a new item is low by default
    },

    deadline: Date,  // the date will be an integer number representing the number of milliseconds ellapsed since midnight, January 1, 1970 UTC
    
    // a field holding the creation date of the item. 
    created: {
        type: Date,  // date, in ms, when the item was created
        required: true
    },

    // a field holding the last modification date of the item.
    lastModified: {
        type: Date, // date, in ms, when the item was last modified
        required: true
    },

    // a field that shows whether or not a to-do item has been completed
    completed: {
        type: Boolean,
        required: true,
        default: false
    }
});

const ToDo = mongoose.model("ToDo", todoSchema);

module.exports = ToDo; 
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    item: String,

});

const ToDo = mongoose.model("ToDo", todoSchema);

module.exports = ToDo; 
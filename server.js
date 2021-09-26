const express = require('express');
const mongoose = require('mongoose');

// set up express app
const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost/ToDos', { useNewUrlParser: true, useUnifiedTopology: true}, ()=>console.log("Connected to database"));
mongoose.Promise = global.Promise;

//set up static files (html, css, images, videos...)
app.use(express.static('public'));

app.use(express.json());

require("./Controllers/toDoController")(app);

// error handling middleware
app.use(function(err, req, res, next){
    console.error("ERROR HAPPENED");
    console.error(err); // to see properties of message in our console
    res.status(422).send({error: err.message});
});


// listen for requests
app.listen(process.env.port || 4000, "localhost", function(){
    console.log('now listening for requests');
});


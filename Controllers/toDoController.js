const express = require("express");
const ToDo = require("../models/ToDo");

// This is what is returned when todoController(app) is invoked
module.exports = app =>{

    app.get('/todo', (req, res)=>{
        //getting data from MongoDB and rendering the data. {} finds all the objects
        // basically saying "find all ({}) objects from the Todo collection"
        console.log("Making GET request");

        ToDo.find({}, (err, data)=>{
            if (err) throw err;
            // res.render('todo', {todos: data});
            res.send(data);
        });      
    });

    app.post('/todo', (req, res)=>{
        //getting data from the view and posting it to MongoDB
        // I think urlEncodedParser coverts a query string into a json format
        // the save method saves the req.body content to the DB
        console.log("Making POST request");

        ToDo(req.body).save((err, data)=>{
            if (err) throw err;
            //refresing the page and with the new todos. 
            res.json({todos:data});
        });
        
    });

    app.delete('/todo/:item', (req, res)=>{
        var item = req.params.item.replace(/\-/g, ' ');
        console.log("Making DELETE request");
        console.log(req.body);
        ToDo.find({item:item}).deleteOne((err, data)=>{
            if (err) throw err;
            res.json({todos:data});
        });
       
        // data = data.filter(todo => {
        //     return todo.item.replace(/ /g, "-") !== req.params.item;
        // });
        // console.log(data);
        // res.json({todos:data});
    });
}
const { urlencoded } = require("express");
const express = require("express");
const ToDo = require("../models/ToDo");

// This is what is returned when todoController(app) is invoked
module.exports = app =>{

    app.get('/todo', (req, res, next)=>{
        console.log("Making GET request");

        let hide = [];  // a list of the fields to hide

        // console.log(req.query.show);
        if (typeof(req.query.show)!=="undefined") {
            hide = JSON.parse(req.query.show);
        }

        let projection = {_id: 0, __v: 0};  // hiding fields that are irrelevant to the user, by default

        hide.forEach(prop => {projection[[prop]] = 0});

        // console.log(projection);

        let sortParameter = req.query.sort;  // should be either "priority" or "deadline"
        let order = req.query.order;  // ascending (1) or descending (-1)

        // the list of to-dos will be sorted according to created date, from most recent to oldest, by default
        if(! (sortParameter && order)) {
            sortParameter = "created";  
            order = -1;
        }


        ToDo.find({},  projection)
            .sort({[sortParameter]: order})
            .then(data => {
                res.send(data);
            })
            .catch(next);
    });

    app.post('/todo', (req, res)=>{
        console.log("Making POST request");

        const now = (new Date()).valueOf();
        ToDo({...req.body, created: now, lastModified: now}).save((err, data)=>{
            if (err) throw err;
            //refresing the page and with the new todos. 
            res.json({todos:data});
        });
        
    });

    app.delete('/todo', (req, res)=>{
        console.log("Making DELETE request");
        ToDo.deleteOne({item: req.body.item}, (err, data)=>{
            if (err) throw err;
            res.json({todos:data});
        });
    });  

    app.patch('/todo', (req, res)=>{
        console.log("Making PATCH request");
        const field = req.body.field;
        if (field === "created" || field === "lastModified" || field === "_id")
            throw "Cannot modify created date, last modified date and the _id";  // certain paramenters cannot be modified by the user

        // when uptating an item, the lastModified date is automatically set to the current time
        ToDo.findOne({item: req.body.item})
            .updateOne({[field]: req.body.newValue, lastModified:( new Date()).valueOf()}, (err, data)=>{
                if (err) throw err;
                res.json({todos:data});
            });
    });

}
const { urlencoded } = require("express");
const express = require("express");
const ToDo = require("../models/ToDo");

// This is what is returned when todoController(app) is invoked
module.exports = app =>{

    app.get('/todo', (req, res, next)=>{
        console.log("Making GET request");

        let hide = [];  // a list of the fields to hide

        // if there are fields to be hidden
        if (typeof(req.query.hide) !== "undefined") {
            hide = JSON.parse(req.query.hide);  // create a list of fields to hide
        }

        let projection = {_id: 0, __v: 0};  // hiding fields that are irrelevant to the user, by default

        hide.forEach(prop => {projection[[prop]] = 0});  // hide additional fields specified by the URL parameters

        // for describing how the documents will be sorted
        let sortParameter = req.query.sort;  // should be either "priority" or "deadline"
        let order = req.query.order;  // ascending (1) or descending (-1)

        // the list of to-dos will be sorted according to created date, from most recent to oldest, by default
        if (! (sortParameter && order)) {
            sortParameter = "created";  
            order = -1;
        }

        var page, limit;

        ToDo.count({}, (err, count) => { // find number of documents in the database
            if (err) throw err;
            page = 0;  // the page number, 0 by default
            limit = count;  // by default, all documents will be returned

            if (! (typeof(req.query.page) === "undefined" || typeof(req.query.limit) === "undefined")){
                if (page*limit < count) {  // the skip value must be less than the total number of documents in the database
                    page = parseInt(req.query.page);  // page number from the URL parameters
                    limit = parseInt(req.query.limit);  // number of documents to return
                }
            }
    
            ToDo.find({}, projection, {skip: page*limit, limit: limit})
                .sort({[sortParameter]: order})
                .then(data => {
                    res.send(data);
                })
                .catch(next);
        });  
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
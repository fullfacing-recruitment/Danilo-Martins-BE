const ToDo = require("../models/ToDo");

// This is what is returned when todoController(app) is invoked
module.exports = app => {

    // GET
    app.get('/todo', (req, res, next)=>{
        console.log("Making GET request");

        //#region Fields to display
        let hide = [];  // a list of the fields to hide

        if (typeof(req.query.hide) !== "undefined") // if there are fields to be hidden
            hide = JSON.parse(req.query.hide);  // create a list of fields to hide

        let projection = {__v: 0};  // hiding fields that are irrelevant to the user, by default

        hide.forEach(prop => {projection[[prop]] = 0});  // hide additional fields specified by the URL parameters
        //#endregion Fields to display


        //#region Sorting
        // for describing how the documents will be sorted
        let sortParameter = req.query.sort;  // should be either "priority" or "deadline"
        let order = req.query.order;  // ascending (1) or descending (-1)

        // by default, the list of to-dos will be sorted according to created date, from most recent to oldest
        if (! (sortParameter && order)) {
            sortParameter = "created";  
            order = -1;
        }
        //#endregion Sorting


        //#region Filtering by status
        let filter = {}  // the documents will be retrieved according to this filter
        const status = req.query.status;

        // the status of a to-do can either be "completed", "overdue" or "on track" (not completed and not overdue)
        if (status !== "undefined"){
           switch (status){
               case "completed":
                   filter.completed = true;
                   break;
                case "overdue":
                    // overdue items are not complete and their deadlines have passed the current date
                    filter = { ...filter, completed: false, deadline: {$lt: new Date()} };  
                    break;
                case "on track":
                    // overdue items are not complete and their deadlines have not passed the current date
                    filter = {...filter, completed: false, deadline: {$gte: new Date()} };
           }
        }
        //#endregion Filtering by status


        //#region Pagination
        var page, limit;

        ToDo
            .count({})
            .then(count => { // find number of documents in the database
                // if (err) throw err;
                page = 0;  // the page number, 0 by default
                limit = count;  // by default, all documents will be returned

                if (! (typeof(req.query.page) === "undefined" || typeof(req.query.limit) === "undefined")){
                    if (page * limit < count) {  // the skip value must be less than the total number of documents in the database
                        page = parseInt(req.query.page);  // page number from the URL parameters
                        limit = parseInt(req.query.limit);  // number of documents to return
                    }
                }
                
                // find the to-do items according to the filters, items to hide and pagination defined above
                ToDo.find(filter, projection, {skip: page*limit, limit: limit})
                    .sort({[sortParameter]: order})  // sorting the items
                    .then(data => {
                        res.send(data);
                    });
            })
            .catch(next);
        //#endregion Pagination
    });


    // POST
    app.post('/todo', (req, res, next)=>{
        console.log("Making POST request");

        const now = new Date();  // a variable holding the current date
        ToDo({...req.body, created: now, lastModified: now})
            .save()
            .then(data => res.send(data))
            .catch(next);    
    });

    
    // DELETE
    app.delete('/todo/:id', (req, res, next)=>{
        console.log("Making DELETE request");

        ToDo
            .deleteOne({_id: req.params.id})
            .then( data => {
                res.json({todos:data});
            })
            .catch(next);
    });  


    // PATCH
    app.patch('/todo/:id', (req, res, next)=>{
        console.log("Making PATCH request");

        const body = req.body;
        const props = Object.keys(body);

        if (props.includes("created") || props.includes("_id")) {
            // deleting properties that must not be modified
            delete body.created;
            delete body._id;
            console.error("Creation date or _id cannot be modified");
        }

        // when uptating an item, the lastModified date is automatically set to the current time
        ToDo
            .findByIdAndUpdate(req.params.id, {...body, lastModified: new Date()}, {new: true})
            .then(doc => {
                res.json({todos:doc});
            })
            .catch(next);
    });
}
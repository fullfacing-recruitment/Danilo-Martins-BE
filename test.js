const axios = require('axios');
var dDay = (new Date(2021, 11, 2)).valueOf();  // get the date in ms since midnight, January 1, 1970 UTC
var created = (new Date()).valueOf();  // simulate that the todo item was created now
var lastModified = (new Date()).valueOf();  // simulate that the todo item was created now
const testing = "POST"
// console.log(day);

switch(testing){
    case "POST": 
        axios
        .post("http://localhost:4000/todo", 
        {
            item: "Go home",
            deadline: dDay,
            priority: 1
        })
        .then( res => {
            console.log(`statusCode: ${res.status}`);
            // console.log(res);
        })
        .catch(error => {
            console.error(error);
        });
        break;

    case "PATCH":
        axios
        .patch("http://localhost:4000/todo", 
        {
            item: "Go to gym",
            deadline: dDay,
            created: created,
            lastModified: lastModified,
            priority: 1
        })
        .then( res => {
            console.log(`statusCode: ${res.status}`);
            // console.log(res);
        })
        .catch(error => {
            console.error(error);
        });
        break;

    }
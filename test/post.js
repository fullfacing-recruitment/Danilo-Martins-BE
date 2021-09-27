const axios = require('axios');

const uri = "http://localhost:4000/todo";

// deadline parameters
const day = Math.round(Math.random()*28);
const month = Math.round(Math.random()*12);
const year = 2021;

var dueDate = new Date(year, month, day);  // deadline
// var created = new Date();  // simulate that the todo item was created now
// var lastModified = new Date();  // simulate that the todo item was created now

var itemName = "Fishing";
var priority = Math.round(Math.random()*2)

axios
    .post(uri, 
    {
        item: itemName,
        deadline: dueDate,
        priority: priority
    })
    .then( res => {
        console.log(`statusCode: ${res.status}`);
        console.log(res.data);
    })
    .catch(error => {
        console.error(error);
});

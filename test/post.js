const axios = require('axios');

const uri = "http://localhost:4000/todo";

// deadline parameters
const day = Math.round(Math.random()*28);
const month = Math.round(Math.random()*12);
const year = 2021;

var dueDate = new Date(year, month, day);  // deadline

var itemName = process.argv[2];
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

const axios = require('axios');

const uri = "http://localhost:4000/todo";

// parameters to help with sorting the to-do list
const sort = "";  // can be priority, ""(or commented out, for sorting from newest to oldest) or "deadline"
const order = 1;  // 1 for ascending order, -1 for descending or commented out, for sorting from newest to oldest

// fields to hide
const hide = []; // the following fields can be hidden: "priority", "_id", "created", "lastModified", "description", "deadline". Add to list if needed

// query by status
const status = ""; // can also be "overdue", "completed" and "on track"

// pagination parameters
const page = 1;  // page number
const limit = 4;  // maximum number of elements to return

let payload = {sort: sort, order: order, hide: JSON.stringify(hide), status: status, page: page, limit: limit};
const params = new URLSearchParams(payload);


// Getting the to-dos according to the specifications above
axios
    .get(`${uri}?${params}`)
    .then(res => {
            console.log(`statusCode: ${res.status}`);
            console.log(res.data);
    })
    .catch(error => {
        console.error(error);
    });
const axios = require('axios');

const uri = "http://localhost:4000/todo";

// deadline parameters
const day = Math.round(Math.random()*28);
const month = Math.round(Math.random()*12);
const year = 2023;  // all patched documents will be due in 2023, for testing

var dueDate = new Date(year, month, day);  // deadline


// Getting the id of a particular valid item from the database
axios
    .get(uri)
    .then(res => {
        const id = res.data.filter(obj => obj.item === "Fishing")[0]._id;

        // modifing the item found
        axios
            .patch(`http://localhost:4000/todo/${id}`, 
            {
                // other fields that can be edited are: description, item, priority, completed.
                deadline: dueDate,
            })
            .then( res => {
                console.log(`statusCode: ${res.status}`);
                console.log(res.data);
            })
    })
    .catch(error => {
        console.error(error);
    });
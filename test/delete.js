const axios = require('axios');

const uri = "http://localhost:4000/todo";

const itemName = "Fishing";

// Getting the id of a particular valid item from the database
axios
    .get(uri)
    .then(res => {
        const id = res.data.filter(obj => obj.item === itemName)[0]._id;

        // modifing the item found
        axios
            .delete(`http://localhost:4000/todo/${id}`)
            .then( res => {
                console.log(`statusCode: ${res.status}`);
                console.log(res.data);
            })
    })
    .catch(error => {
        console.error(error);
    });
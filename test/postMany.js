const {fork}  = require("child_process");

const items = ["Fishing", "swimming", "grocery shopping", "sleep", "Eat", "Relax", "Study", "Shower"];
for (item of items)
    fork('./test/post.js', [item]);
const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    name: {type: String, required: true},
    position: {type: String, required: true},
    office: {type: String, required: true},
    salary: {type: Number, required: true}
});



module.exports = mongoose.model("Post", postSchema);



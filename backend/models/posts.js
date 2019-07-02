const mongoose = require('mongoose')
const schema = mongoose.Schema;

var postSchema = new schema({
    "title": {
        "type": String,
        "required": true
    },
    "content":{
        "type": String,
        "required": true
    }
})

module.exports = mongoose.model('Post',postSchema)
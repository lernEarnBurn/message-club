const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: "User", required: true},
    content: {type: String, required: true}
})




module.exports = mongoose.Model("Message", messageSchema)
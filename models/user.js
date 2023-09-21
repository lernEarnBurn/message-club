const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    membership: {type: String, enum: ['none', 'regular', 'admin'], default: 'none'},
})

module.exports = mongoose.Model('User', userSchema)
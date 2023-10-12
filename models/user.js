const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    membership: {type: String, enum: ['none', 'member', 'admin'], default: 'none'},
})

userSchema.virtual('fullName').get(function () {
    return this.firstname + ' ' + this.lastname
})

module.exports = mongoose.model('User', userSchema)
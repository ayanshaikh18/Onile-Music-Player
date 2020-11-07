const mongoose = require('mongoose')

var UserScheme = new mongoose.Schema({
    email : { type: String },
    password : { type: String }
},{collection:"Users"})

var User = mongoose.model('User',UserScheme)

module.exports = { User }
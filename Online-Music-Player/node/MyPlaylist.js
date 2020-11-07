const mongoose = require('mongoose')

var PlaylistScheme = new mongoose.Schema({
    Name : { type: String },
    UserId : { type : String},
    PosterPath : { type: String },
    Songs : [String]
},{collection:"MyPlaylists"})

var MyPlaylist = mongoose.model('MyPlaylist',PlaylistScheme)

module.exports = { MyPlaylist }
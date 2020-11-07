const mongoose = require('mongoose')

var PlaylistScheme = new mongoose.Schema({
    Name : { type: String },
    PosterPath : { type: String },
    Songs : [String]
},{collection:"Playlists"})

var Playlist = mongoose.model('Playlist',PlaylistScheme)

module.exports = { Playlist }
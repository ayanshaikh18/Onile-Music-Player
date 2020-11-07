const mongoose = require('mongoose')

var SongScheme = new mongoose.Schema({
    SongName : { type: String },
    SongPath : { type: String },
    Catagory : { type: String },
    PosterPath : { type: String },
    ArtistName : { type: String },
    UploadTime : { type : Date }
},{collection:"Songs"})

var Song = mongoose.model('Song',SongScheme)

module.exports = { Song }
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const path = require('path')
const cors = require('cors')
const formidable = require('formidable')
const { empty } = require('rxjs');
const { time } = require('console');
const fs = require('fs')

var { Song } = require('./Song')
var { Playlist } = require('./Playlist')
mongoose.connect(
    'mongodb://localhost:27017/AT_Project',
    {
	    useNewUrlParser: true,
	    useUnifiedTopology: true
    },
    (err)=>{
        if(err)
            throw err;
});

var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
	console.log("connection succeeded"); 
})

const CatagoryScheme = new mongoose.Schema({
    Name : String
    },{collection:"Catagories"})

var Catagory = mongoose.model("Catagory",CatagoryScheme)

const songDir = '../../Online-Music-Player/src/assets/songs/'
const imgDir = '../../Online-Music-Player/src/assets/images/'

var app = express()
app.use(cors({origin:"*"}))
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ 
	extended: true
}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.post('/addCatagory',(req,res)=>{
    Catagory.find({"Name" : req.body.Name},(err,cat)=>{
        if(err) throw err
        if(Array.isArray(cat)){
            if(cat.length != 0)
                res.send({"msg":"used"})
            else{
                var newCat = new Catagory(req.body)
                newCat.save(err=>{
                    if(err) throw err
                    res.send({"msg":"added"})
                })
            }
        }
    })
})

app.get('/allCatagories',(req,res)=>{
    Catagory.find((err,catagories)=>{
        if(err) throw err
        res.send(catagories)
    })
})

app.delete('/deleteCatagory/:id',(req,res)=>{
    Catagory.findOneAndRemove(
        { _id : req.params.id },
        (err,cat)=>{
            if(err) throw err;
            console.log("Catagory Removed")
            res.send({"msg":"removed"})
        }
    )
})

app.put('/updateCatagory',(req,res)=>{
    Catagory.findOneAndUpdate(
        { _id : req.body._id},
        req.body,
        {new:true},
        (err,cat)=>{
            if(err) throw err
            console.log("Catagory Updated")
            res.send({"msg":"updated"})
        }
    )
})

app.post('/uploadSong',(req,res)=>{
    var songPath = ""
    var posterPath = ""
    var form = new formidable.IncomingForm()
    form.parse(req)
    form.on('fileBegin',(name,file)=>{
        if(name=="song"){
            songPath = path.join(__dirname,songDir)+Date.now()+file.name
            file.path = songPath
        }
        else if(name=="poster"){
            posterPath = path.join(__dirname,imgDir)+Date.now()+file.name
            file.path = posterPath
        }
    })
    form.on('end', ()=>{
        res.send({
            "song" : songPath,
            "poster" : posterPath,
        })
    })
})

app.post('/uploadPlaylistPoster',(req,res)=>{
    var posterPath = ""
    var form = new formidable.IncomingForm()
    form.parse(req)
    form.on('fileBegin',(name,file)=>{
        if(name=="poster"){
            posterPath = path.join(__dirname,imgDir)+Date.now()+file.name
            file.path = posterPath
        }
    })
    form.on('end', ()=>{
        console.log("Uploaded")
        res.send({
            "poster" : posterPath,
        })
    })
})

app.post("/addSong",(req,res)=>{
    var song = new Song(req.body)
    song.save((err,data)=>{
        if(err) throw err
        console.log("Song Added")
        res.send({"msg":"added"})
    })
})

app.get("/allSongs",(req,res)=>{
    Song.find((err,songs)=>{
        res.send(songs)
    })
})

app.get("/getSong/:id",(req,res)=>{
    Song.find({"_id":req.params.id},(err,song)=>{
        if(err) throw err
        res.send(song[0])
    })
})

app.get("/deleteFiles/:songPath/:posterPath",(req,res)=>{
    var sPath = req.params.songPath
    var pPath = req.params.posterPath
    console.log(sPath+" "+pPath)
    fs.unlink(songDir+sPath,(err)=>{
        if(err) throw err
        fs.unlink(imgDir+pPath,(err)=>{
            if(err) throw err
            res.send({"msg":"removed"})
        })
    })

})

app.delete("/deleteSong/:id",(req,res)=>{
    Song.findOneAndRemove(
        { _id : req.params.id },
        (err,cat)=>{
            if(err) throw err;
            console.log("Song Removed")
            res.send({"msg":"removed"})
        }
    )
})

app.put("/updateSong",(req,res)=>{
    Song.findOneAndUpdate(
        { _id : req.body._id},
        req.body,
        {new:true},
        (err,cat)=>{
            if(err) throw err
            console.log("Catagory Updated")
            res.send({"msg":"updated"})
        }
    )
})

app.post("/postPlaylist",(req,res)=>{
    var playList = new Playlist(req.body)
    playList.save((err,data)=>{
        if(err) throw err
        console.log("Playlist posted")
        res.send({"msg":"added"})
    })
})

app.get("/getPlaylists",(req,res)=>{
    Playlist.find((err,data)=>{
        if(err) throw err
        res.send(data)
    })
})

app.get('/test',(req,res)=>{
    Song.aggregate([
        {
            $group : {
                _id : Catagory.aggregate({
                    $group:{
                        _id : Catagory 
                    }
                })
            }
        }
    ]).exec((err,data)=>{
        if(err) throw err
        res.send(data)
    })
})
app.listen(8000,()=>console.log("server started"))
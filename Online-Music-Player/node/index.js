const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const formidable = require('formidable')
const path = require('path')
const nodemailer = require('nodemailer')

const { User } = require('./User')
const { Song } = require('./Song')
const { Playlist } = require('./Playlist')
const { MyPlaylist } = require('./MyPlaylist')

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

var app = express()
app.use(bodyParser.json())

const imgDir = '../src/assets/images/'

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

app.get('/login/:email',(req,res)=>{
    
    User.find({"email":req.params.email},(err,data)=>{
        if(err) throw err
        if(data.length==0)
            res.send({"msg":"no"})
        else
            res.send(data[0])
    })
})

app.post('/signup',(req,res)=>{
    console.log(req.body)
    db.collection('Users').find({
        "email" : req.body.Email
        }).toArray((err,result)=>{
            if (err) throw err;
            if(result.length != 0)
                res.send({"msg":"used"})
            else{
                db.collection('Users').insertOne(req.body,(err,result)=>{
                    if(err) throw err;
                    res.send({
                        "msg" : "registered"
                    })
                })
            }
        })      
})

app.get('/sendMail/:email',(req,res)=>{
    var email = req.params.email
    var otp = ""
    for(var i=0;i<6;i++)
        otp+=(Math.floor((Math.random() * 10) + 1))%10;
    var transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : '18ceuog004@ddu.ac.in',
            pass : 'Ayan786@'
        }
    })
    var mailOptions = {
        'from' : '18ceuog004@ddu.ac.in',
        'to' : email,
        'subject' : 'Resetting Password of your Beat Buzz Account',
        'text' : 'Your Verification code is '+otp+'. Use this code to reset your password. Thank You'
    }
    transporter.sendMail(mailOptions,(err,info)=>{
        if(err) throw err
        res.send({'otp':otp})
    })
})

app.get('/changePwd/:email/:pwd',(req,res)=>{
    var email = req.params.email
    var password = req.params.pwd
    User.updateOne(
        { "email" : email },
        { 'password' : password },
        (err,num)=>{
            if(err) throw err
            res.send({"msg":"changed"})
        }
    )
})

app.get("/allSongs",(req,res)=>{
    Song.find().sort({"SongName":"1"}).exec((err,songs)=>{
        res.send(songs)
    })
})

app.get("/getSong/:id",(req,res)=>{
    Song.find({"_id":req.params.id},(err,song)=>{
        if(err) throw err
        res.send(song[0])
    })
})

app.get("/getSongsByDate",(req,res)=>{
    Song.find().sort({"UploadTime":"-1"}).limit(5).exec((err,songs)=>{
            if(err) throw err
            res.send(songs)
    })
})

app.get("/getPlaylists",(req,res)=>{
    Playlist.find((err,data)=>{
        if(err) throw err
        res.send(data)
    })
})

app.get("/getPlaylist/:id",(req,res)=>{
    Playlist.find({"_id":req.params.id},(err,data)=>{
        if(err) throw err
        res.send(data[0])
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

app.post("/postMyPlaylist",(req,res)=>{
    var playList = new MyPlaylist(req.body)
    playList.save((err,data)=>{
        if(err) throw err
        console.log("Playlist posted")
        res.send({"msg":"added"})
    })
})

app.get("/getMyPlaylists",(req,res)=>{
    MyPlaylist.find((err,data)=>{
        if(err) throw err
        res.send(data)
    })
})

app.get("/getMyPlaylist/:id",(req,res)=>{
    MyPlaylist.find({"_id":req.params.id},(err,data)=>{
        if(err) throw err
        res.send(data[0])
    })
})

app.listen(3000,()=>console.log("server started"))
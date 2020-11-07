import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { CatagoriesService } from 'src/app/Shared/catagories.service';
import { Catagory } from 'src/app/Shared/catagory';
import { Song } from 'src/app/Shared/song';
import { SongService } from 'src/app/Shared/song.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-song',
  templateUrl: './new-song.component.html',
  styleUrls: ['./new-song.component.css']
})
export class NewSongComponent implements OnInit {

  public formData = new FormData()
  public songFile = null
  public posterFile = null
  public songName:string;
  public hasMsg:boolean = false 
  public msg:string = ""
  public catagories:Catagory[]

  public SongName; public Catagory; public ArtistName ; public catagory ; public SongPath; public PosterPath
  
  constructor(private http:HttpClient,
              private catService:CatagoriesService,
              private songService:SongService,
              private cookie:CookieService,
              private router:Router) { }

  ngOnInit(): void {
    if(!this.cookie.check('Admin'))
      this.router.navigate([''])
    this.catService.getAllCatagories().subscribe(data=>this.catagories = data)
  }

  public songError:boolean = false ; public ext1:string
  public posterError:boolean = false ; ext2:string
  fileChange(event,type){
    
    switch(type){
      case 'song': 
                  this.songFile = (event.target as HTMLInputElement).files[0]
                  console.log(this.songFile)
                  this.ext1 = this.songFile.name.split('.')[(this.songFile.name.split('.').length - 1)]
                  if(this.ext1 !="mp3" && this.ext1 !="mpeg")
                    this.songError = true
                  else
                    this.songError = false
                  break
      case 'poster':
                   this.posterFile = (event.target as HTMLInputElement).files[0]
                   this.ext2 = this.posterFile.name.split('.')[(this.posterFile.name.split('.').length - 1)]
                   if(this.ext2 !="jpg" && this.ext2 && "png" && this.ext2 !="jpeg")
                      this.posterError = true
                    else
                      this.posterError = false
                   break 
    }
  }

  onSubmit(event,cat){
    event.preventDefault()
    if(cat==-1){
      this.hasMsg = true
      return
    }
    this.catagory = cat
    if(this.ext1 !="mp3" && this.ext1 !="mpeg"){
      alert("Please Select .mp3 or .mpeg file for song")
      this.songError = true
      return
    }
    if(this.ext2 !="jpg" && this.ext2 !="jpeg" && this.ext2 != "png"){
      alert("Please Select .jpg, .jpeg or .png file for Poster")
      this.posterError = true
      return
    }
    if(this.songFile==null || this.posterFile==null){
      alert("Plz upload Files")
      return 
    }
    this.formData.append('song',this.songFile)
    this.formData.append('poster',this.posterFile)
    this.http.post('http://localhost:8000/uploadSong',this.formData).subscribe(data=>{
        console.log(data)
        var tmp = data["song"].split("\\")
        this.SongPath = tmp[tmp.length-1]
        
        var tmp = data["poster"].split("\\")
        this.PosterPath = tmp[tmp.length-1]
        
        var song = new Song()
        song.ArtistName = this.ArtistName
        song.SongName = this.SongName
        song.SongPath = this.SongPath
        song.PosterPath = this.PosterPath
        song.Catagory =  this.catagory    
        song.UploadTime = new Date()

        this.songService.postSong(song).subscribe(data=>{
          if(data["msg"]=="added"){
            this.msg = "Song Uplaoded Successfully";
          }
        })
    })
  }

}

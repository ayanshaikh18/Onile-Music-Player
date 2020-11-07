import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MyPlaylist } from 'src/app/Shared/my-playlist';
import { MyPlaylistService } from 'src/app/Shared/my-playlist.service';
import { PlaylistService } from 'src/app/Shared/playlist.service';
import { Song } from 'src/app/Shared/song';
import { SongService } from 'src/app/Shared/song.service';

@Component({
  selector: 'app-my-playlist',
  templateUrl: './my-playlist.component.html',
  styleUrls: ['./my-playlist.component.css']
})
export class MyPlaylistComponent implements OnInit {
  msg
  msgClass

  allSongs:Song[]
  public name:string
  public posterPath:string
  public posterError:boolean = false
  public ext2
  public formData = new FormData()
  public posterFile = null
  public selectedSongs:string[] = []

  constructor(private songService:SongService,
              private http:HttpClient,
              private playlistService:PlaylistService,
              private cookie:CookieService,
              private router:Router,
              private myplaylistService:MyPlaylistService) { }

  ngOnInit(): void {
    if(!this.cookie.check("UserId")){
      this.router.navigate(['/login','Please Login'])
    }
    this.songService.getAllSongs().subscribe(data=>this.allSongs=data)
  }

  fileChanged(event){
    this.posterFile = (event.target as HTMLInputElement).files[0]
    this.ext2 = this.posterFile.name.split('.')[(this.posterFile.name.split('.').length - 1)]
    if(this.ext2 !="jpg" && this.ext2 && "png" && this.ext2 !="jpeg")
      this.posterError = true
    else
      this.posterError = false
  }

  submit(){
    if(this.ext2 !="jpg" && this.ext2 !="jpeg" && this.ext2 != "png"){
      alert("Please Select .jpg, .jpeg or .png file for Poster")
      this.posterError = true
      return
    }
    if(this.posterFile==null){
      alert("Plz upload File")
      return 
    }
    
    this.formData.append('poster',this.posterFile)
    
    this.http.post('http://localhost:3000/uploadPlaylistPoster',this.formData).subscribe(data=>{
      var tmp = data["poster"].split("\\")
      this.posterPath = tmp[tmp.length-1]

      var playList = new MyPlaylist()
      playList.Name = this.name
      playList.PosterPath = this.posterPath
      playList.Songs = this.selectedSongs
      playList.UserId = this.cookie.get('UserId')
      this.myplaylistService.postPlaylist(playList).subscribe(data=>{
        if(data['msg']=='added'){
          this.msg = "Playlist Created Succesfyll"
          this.msgClass = "text-success"
        }
        else{
          this.msg = "Something Went Wrong"
          this.msgClass = "text-danger"
        }
      })
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CatagoriesService } from 'src/app/Shared/catagories.service';
import { Catagory } from 'src/app/Shared/catagory';
import { Playlist } from 'src/app/Shared/playlist';
import { PlaylistService } from 'src/app/Shared/playlist.service';
import { Song } from 'src/app/Shared/song';
import { SongService } from 'src/app/Shared/song.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  songCount:number 
  playListCount:number
  catagoryCount:number

  catagories:Catagory[]
  songs:Song[]
  playlists:Playlist[]

  catagoryWiseSong = new Map()
  constructor(private cookie:CookieService,
              private router:Router,
              private songService:SongService,
              private catServices : CatagoriesService,
              private playlistService:PlaylistService) { }

  ngOnInit(): void {

    if(!this.cookie.check('Admin'))
      this.router.navigate([''])
    this.playlistService.getPlaylists().subscribe(data=>{
      this.playListCount = data.length
      this.playlists = data
    })
    this.songService.getAllSongs().subscribe(data=>{
      this.songCount = data.length
      this.songs = data
      for(var s of this.songs){
        if(this.catagoryWiseSong.has(s.Catagory)){
          var cnt = parseInt (this.catagoryWiseSong.get(s.Catagory))+1
          this.catagoryWiseSong.set(s.Catagory,cnt)
        }
        else{
          this.catagoryWiseSong.set(s.Catagory,1)
        }
      }
    })
    this.catServices.getAllCatagories().subscribe(data=>{
      this.catagoryCount = data.length
      this.catagories = data
    })
  }

}

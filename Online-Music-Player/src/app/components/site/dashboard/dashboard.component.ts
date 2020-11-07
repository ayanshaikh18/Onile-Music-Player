import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/Shared/song';
import { Track } from 'ngx-audio-player'
import * as $ from 'jQuery'

import { SongService } from 'src/app/Shared/song.service';
import { PlaylistService } from 'src/app/Shared/playlist.service';
import { Playlist } from 'src/app/Shared/playlist';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MyPlaylistService } from 'src/app/Shared/my-playlist.service';
import { MyPlaylist } from 'src/app/Shared/my-playlist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  msaapPageSizeOptions = [2];
  msaapDisplayVolumeControls = true;
  msaapDisablePositionSlider = false;
  msaapPlaylist: Track[] = []
  autoPlay : boolean = false
  hasSong:boolean = false
  
  constructor(private songService:SongService,
              private playlistService:PlaylistService,
              private router:Router,
              private cookie:CookieService,
              private myplaylistService:MyPlaylistService) { }

  public allSongs:Song[]
  public sortedSongs : Song[]

  public allPlaylists:Playlist[]
  public allMyPlaylists:MyPlaylist[] = []

  ngOnInit(): void {
    if(!this.cookie.check("UserId")){
      this.router.navigate(['/login','Please Login'])
    }
    this.songService.getAllSongs().subscribe(data=>{ this.allSongs = data })
    this.songService.getSongOrderByDate().subscribe(data=> this.sortedSongs = data)
    this.playlistService.getAllPlaylists().subscribe(data=>this.allPlaylists=data)
    this.myplaylistService.getAllPlaylists().subscribe(data=>{
      for(var p of data){
        if(p['UserId']==this.cookie.get("UserId"))
          this.allMyPlaylists.push(p)
      }
    })
  }

  playSong(name,path,artist){
    this.msaapPlaylist.pop()
    this.msaapPlaylist.unshift({
      title : name+" - "+artist,
      link : '../../../assets/songs/'+path
    })
    this.hasSong = true
    $('#mplayer').addClass('show-to-screen')
    this.autoPlay = true
  }

  showPlaylist(id){
    this.router.navigate(['playlist',id])    
  }
  showMyPlaylist(id){
    this.router.navigate(['myplaylist',id])    
  }
}

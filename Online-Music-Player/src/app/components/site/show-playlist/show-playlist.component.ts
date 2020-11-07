import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Track } from 'ngx-audio-player';
import { CookieService } from 'ngx-cookie-service';
import { Playlist } from 'src/app/Shared/playlist';
import { PlaylistService } from 'src/app/Shared/playlist.service';
import { Song } from 'src/app/Shared/song';
import { SongService } from 'src/app/Shared/song.service';

@Component({
  selector: 'app-show-playlist',
  templateUrl: './show-playlist.component.html',
  styleUrls: ['./show-playlist.component.css']
})
export class ShowPlaylistComponent implements OnInit {

  public id
  public playlist : Playlist = new Playlist()
  public songs : Song[] = []
  
  constructor(private router:Router,
              private route:ActivatedRoute,
              private playlistService:PlaylistService,
              private songService:SongService,
              private cookie:CookieService) { }

  ngOnInit(): void {
    if(!this.cookie.check("UserId")){
      this.router.navigate(['/login','Please Login'])
    }
    this.id = this.route.snapshot.paramMap.get("id")
    this.playlistService.getPlaylist(this.id).subscribe(data=>{
      this.playlist = data
      for(let song of data['Songs']){
        this.songService.getSong(song).subscribe(data1=>{
          this.songs.push(data1)
        })
      }
    })
    
  }

  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  msaapPageSizeOptions = [2];
  msaapDisplayVolumeControls = true;
  msaapDisablePositionSlider = false;
  msaapPlaylist: Track[] = []
  autoPlay : boolean = false
  hasSong:boolean = false


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

}

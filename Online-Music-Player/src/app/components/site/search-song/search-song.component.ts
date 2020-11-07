import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Track } from 'ngx-audio-player';
import { CookieService } from 'ngx-cookie-service';
import { Song } from 'src/app/Shared/song';
import { SongService } from 'src/app/Shared/song.service';

@Component({
  selector: 'app-search-song',
  templateUrl: './search-song.component.html',
  styleUrls: ['./search-song.component.css']
})
export class SearchSongComponent implements OnInit {

  allSongs:Song[]
  searchSong:string
  filterBySongsName:Song[] = []
  filterByArtistName:Song[] = []
  
  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  msaapPageSizeOptions = [2];
  msaapDisplayVolumeControls = true;
  msaapDisablePositionSlider = false;
  msaapPlaylist: Track[] = []
  autoPlay : boolean = false
  hasSong:boolean = false
    
  constructor(private songService:SongService,
    private router:Router,
    private cookie:CookieService) { }

  ngOnInit(): void {
    if(!this.cookie.check("UserId")){
      this.router.navigate(['/login','Please Login'])
    }
    this.songService.getAllSongs().subscribe(data=>{
      this.allSongs = data
    })
    
  }

  search(){
    while(this.filterBySongsName.length)
      this.filterBySongsName.pop()
    while(this.filterByArtistName.length)
      this.filterByArtistName.pop()
    var tmp = this.searchSong.replace(/\s/g, "").toLowerCase();
    if(tmp=="") return
    for(var song of this.allSongs){
      var curSongName = song.SongName.replace(/\s/g, "").toLowerCase();
      if(curSongName.includes(tmp))
        this.filterBySongsName.push(song)
      var curArtistName = song.ArtistName.replace(/\s/g, "").toLowerCase();
      if(curArtistName.includes(tmp))
        this.filterByArtistName.push(song)
    }
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
  

}

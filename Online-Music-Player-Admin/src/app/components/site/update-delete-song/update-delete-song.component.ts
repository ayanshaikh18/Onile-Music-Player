import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/Shared/song';
import { SongService } from 'src/app/Shared/song.service';
import * as $ from 'jquery'
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-update-delete-song',
  templateUrl: './update-delete-song.component.html',
  styleUrls: ['./update-delete-song.component.css']
})
export class UpdateDeleteSongComponent implements OnInit {

  allSongs:Song[]
  msg:string
  msgClass:string = "text-success"
  constructor(private songService:SongService,
              private http:HttpClient,
              private cookie:CookieService,
              private router:Router) { }

  ngOnInit(): void {
    if(!this.cookie.check('Admin'))
      this.router.navigate([''])
    this.songService.getAllSongs().subscribe(songs=>this.allSongs=songs)
  }

  delete(id,sPath,pPath){
    this.http.get("http://localhost:8000/deleteFiles/"+sPath+"/"+pPath).subscribe((data)=>{
      if(data['msg']=="removed"){
        this.songService.deleteSong(id).subscribe((data)=>{
          if(data["msg"]=="removed"){
            this.msg = "Song Deleted Successfully"
            this.msgClass = "text-success"
            this.songService.getAllSongs().subscribe(songs=>this.allSongs=songs)
          }
          else{
            this.msg="Something Went Wrong"
            this.msgClass="text-danger"
          }
        })
      }
      else{
        this.msg="Something Went Wrong"
        this.msgClass="text-danger"
      }
    })
  }

}

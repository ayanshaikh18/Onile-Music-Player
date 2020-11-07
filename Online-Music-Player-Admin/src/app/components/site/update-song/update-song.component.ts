import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CatagoriesService } from 'src/app/Shared/catagories.service';
import { Catagory } from 'src/app/Shared/catagory';
import { Song } from 'src/app/Shared/song';
import { SongService } from 'src/app/Shared/song.service';

@Component({
  selector: 'app-update-song',
  templateUrl: './update-song.component.html',
  styleUrls: ['./update-song.component.css']
})
export class UpdateSongComponent implements OnInit {

  public formData = new FormData()
  public songFile = null
  public posterFile = null
  public id
  public oldSong:Song = new Song()
  catagories:Catagory[]
  public msg:string=""
  public msgClass="text-success"
  public hasMsg:boolean = false 
  
  constructor(private songService:SongService,
              private router:Router,
              private route:ActivatedRoute,
              private catService:CatagoriesService,
              private cookie:CookieService) { }

  ngOnInit(): void {
    if(!this.cookie.check('Admin'))
      this.router.navigate([''])
    this.id = this.route.snapshot.paramMap.get("id")
    this.songService.getSong(this.id).subscribe(data=>{
      this.oldSong = data
    })
    this.catService.getAllCatagories().subscribe(data=>this.catagories=data)
  }

  fileChange(event,type){
    
    switch(type){
      case 'song': 
                  this.songFile = (event.target as HTMLInputElement).files[0]
                  break
      case 'poster':
                   this.posterFile = (event.target as HTMLInputElement).files[0]
                   break 
    }
  }

  onSubmit(event,cat){
    if(cat==null || cat==-1){
      this.hasMsg = true
      return
    }
    this.songService.updateSong(this.oldSong).subscribe(data=>{
      if(data["msg"]=="updated"){
        this.msg = "Updated Successfully"
        this.msgClass = "text-success"
      }
      else{
        this.msg = "Something Went Wrong"
        this.msgClass = "text-danger"
      }
    })
  }
}

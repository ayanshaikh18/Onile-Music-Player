import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Song } from './song';

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class SongService {

  baseUrl = "http://localhost:8000"

  constructor(private http:HttpClient) { }


  getSong(id):Observable<Song>{
    return this.http.get<Song>(this.baseUrl+"/getSong/"+id)
  }
  
  postSong(song:Song){
    return this.http.post(this.baseUrl+"/addSong",JSON.stringify(song),httpOptions)
  }

  getAllSongs():Observable<Song[]>{
    return this.http.get<Song[]>(this.baseUrl+"/allSongs")
  }

  deleteSong(id){
    return this.http.delete<any>(this.baseUrl+"/deleteSong/"+id)
  }

  updateSong(song:Song){
    return this.http.put(this.baseUrl+"/updateSong",song,httpOptions)
  }
}

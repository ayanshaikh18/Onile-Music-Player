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

  baseUrl = "http://localhost:3000"

  constructor(private http:HttpClient) { }
  
  getSong(id):Observable<Song>{
    return this.http.get<Song>(this.baseUrl+"/getSong/"+id)
  }
  getAllSongs():Observable<Song[]>{
    return this.http.get<Song[]>(this.baseUrl+"/allSongs")
  }

  getSongOrderByDate():Observable<Song[]>{
    return this.http.get<Song[]>(this.baseUrl+"/getSongsByDate")
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Playlist } from './playlist';

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private http:HttpClient) { }

  basUrl = "http://localhost:3000/"
  postPlaylist(playlist:Playlist){
    return this.http.post(this.basUrl+"postPlaylist",playlist,httpOptions)
  }

  getAllPlaylists():Observable<Playlist[]>{
    return this.http.get<Playlist[]>(this.basUrl+'getPlaylists')
  }

  getPlaylist(id):Observable<Playlist>{
    return this.http.get<Playlist>(this.basUrl+"getPlaylist/"+id)
  }
}

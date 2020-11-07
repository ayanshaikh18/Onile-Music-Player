import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyPlaylist } from './my-playlist';

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class MyPlaylistService {

  constructor(private http:HttpClient) { }
  baseUrl = "http://localhost:3000/"

  postPlaylist(playlist:MyPlaylist){
    return this.http.post(this.baseUrl+"postMyPlaylist",playlist,httpOptions)
  }
  
  getAllPlaylists():Observable<MyPlaylist[]>{
    return this.http.get<MyPlaylist[]>(this.baseUrl+'getMyPlaylists')
  }

  getPlaylist(id):Observable<MyPlaylist>{
    return this.http.get<MyPlaylist>(this.baseUrl+"getMyPlaylist/"+id)
  }
}

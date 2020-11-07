import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from './user';

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = "http://localhost:3000"
  constructor(private _http:HttpClient) { }

  getUser(Email : string) :Observable<User> {
    return this._http.get<any>(this.baseUrl+"/login/"+Email)
  }

  postUser(user : User){
    return this._http.post(this.baseUrl+"/signup",
    JSON.stringify(user),
    httpOptions)
  }

  sendMail(email){
    return this._http.get(this.baseUrl+"/sendMail/"+email)
  }

  changePassword(email,newPassword){
    alert(email)
    return this._http.get<any>(this.baseUrl+"/changePwd/"+email+"/"+newPassword)
  }
}

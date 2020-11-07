import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Catagory } from './catagory';
import { Observable } from 'rxjs';

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class CatagoriesService {

  baseUrl = "http://localhost:8000"

  constructor(private http:HttpClient) { }

  createCatagory(cat:Catagory){
    return this.http.post(this.baseUrl+"/addCatagory",JSON.stringify(cat),httpOptions)  
  }

  getAllCatagories():Observable<Catagory[]>{
    return this.http.get<Catagory[]>(this.baseUrl+"/allCatagories")
  }

  deleteCatagory(id):Observable<any>{
    return this.http.delete<any>(this.baseUrl+"/deleteCatagory/"+id)
  }

  updateCatagory(cat:Catagory):Observable<any>{
    return this.http.put(this.baseUrl+"/updateCatagory",cat,httpOptions)
  }
}

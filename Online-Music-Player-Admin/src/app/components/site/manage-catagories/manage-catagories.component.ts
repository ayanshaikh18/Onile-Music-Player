import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Catagory } from 'src/app/Shared/catagory';
import { CatagoriesService } from 'src/app/Shared/catagories.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-catagories',
  templateUrl: './manage-catagories.component.html',
  styleUrls: ['./manage-catagories.component.css']
})
export class ManageCatagoriesComponent implements OnInit {

  public catagories:Catagory[]
  public hasMsg1:boolean = false
  public msg1:string
  public color1:string

  public hasMsg:boolean = false
  public msg:string
  public color:string

  public title1:string ="Add New Catagory"
  public action:string = "Add"
  public selectedCat:Catagory
  public Name:string

  constructor(private http:HttpClient,
              private catService:CatagoriesService,
              private cookie:CookieService,
              private router:Router) { }

  getData(){
    this.catService.getAllCatagories().subscribe(data=>this.catagories = data)
  }

  ngOnInit(): void {
    if(!this.cookie.check('Admin'))
      this.router.navigate([''])
    this.getData()
  }

  onSubmit(){
    if(this.action == "Update"){
      this.updateData();
      return;
    }
    var cat = new Catagory()
    cat.Name= this.Name
    this.catService.createCatagory(cat).subscribe(data=>{
      console.log(data)
      if(data["msg"]=="added"){
        this.hasMsg = true
        this.msg = "Catagory Added"
        this.color = "green"
        this.getData()
      }
      else{
        this.hasMsg = true
        this.msg = "Catagory is already there"
        this.color = "red"
      }
    })
  }
  
  delete(id){
    this.catService.deleteCatagory(id).subscribe(data=>{
      if(data["msg"]=="removed"){
        this.hasMsg1 = true
        this.msg1 ="Catagory Deleted Successfully"
        this.color1 = "green"
        this.getData()
      }
      else{
        this.hasMsg1 = true
        this.msg1 ="Something Went Wrong!!!"
        this.color1 = "red"
      }
    })
  }

  update(id){
    this.title1 = "Update Catagory"
    this.action = "Update"
    this.catagories.forEach(cat=>{
      if(cat._id==id){
        this.selectedCat = cat
        this.Name = cat.Name
      }
    })
  }

  updateData(){
    this.selectedCat.Name = this.Name
    this.catService.updateCatagory(this.selectedCat).subscribe(data=>{
      if(data['msg']=="updated"){
        this.hasMsg = true
        this.msg = "Catagory updated Successfully"
        this.color = "green"
        this.getData()
      }
      else{
        this.hasMsg = true
        this.msg ="Something Went Wrong!!!"
        this.color = "red"        
      }
    })
  }

}

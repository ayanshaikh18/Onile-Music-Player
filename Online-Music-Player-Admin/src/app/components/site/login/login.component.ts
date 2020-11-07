import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public Email : string;
  public Password : string;
  public hasError : boolean = false;
  public msg : string;
  public hasMsg : boolean = false;
  
  ngOnInit() : void {
    this.msg = this.route.snapshot.paramMap.get("msg")
    this.hasMsg = true
  }

  constructor(private router:Router,
              private route:ActivatedRoute,
              private cookie:CookieService){
  }
  
  user=[]
 
  login(){
    if(this.Email == "18ceuog004@ddu.ac.in" && this.Password == "Ayan786@"){
      this.cookie.set('Admin','Loggedin')
      this.router.navigate(["dashboard"])
    }
    else{
      this.hasError = true;
      this.msg = "Invalid Credentials";
    }
  }
}
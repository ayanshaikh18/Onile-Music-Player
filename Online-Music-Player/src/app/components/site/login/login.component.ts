import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { UserService } from 'src/app/Shared/user.service';

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
  public hasMsg : boolean = false
  public msgCol : string
  
  ngOnInit() : void {
    if(this.cookieService.check('UserId'))
      this.router.navigate(['/dashboard'])
    this.msg = this.route.snapshot.paramMap.get("msg")
    this.hasMsg = true
    if(this.msg == "Please Login")
      this.msgCol = "red"
    else
      this.msgCol = "green"
  }

  constructor(private _userService : UserService,
              private router:Router,
              private route:ActivatedRoute,
              private cookieService:CookieService){
  }
  
  user=[]
 
  login(){
    
    this._userService.getUser(this.Email).subscribe(data=>{
      console.log(data)
      if(data['password'] === this.Password){
        this.hasError = false;
        this.cookieService.set('UserId',data['_id'])
        this.router.navigate(['/dashboard'])
      }
      else{
        this.hasError = true;
      }
    })
  }
}
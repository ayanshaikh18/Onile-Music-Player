import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';
import { User } from 'src/app/Shared/user';
import { UserService } from 'src/app/Shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public Email:string;
  public Password:string;
  public ConfirmPassword:string;
  public hasError:boolean = false;
  public errorMsg:string="";

  constructor(private _userService : UserService,
              private router:Router) { }

  ngOnInit(): void {
  }

  signup(){
    console.log(this.Email+" "+this.Password+" "+this.ConfirmPassword)
    if(this.Password != this.ConfirmPassword){
      this.hasError = true;
      this.errorMsg = "Passwords don't match";    
      return;
    }
    this.hasError=false;
    var user = new User();
    user.email=this.Email;
    user.password=this.Password
    this._userService.postUser(user).subscribe(data=>{
      console.log(data)
      if(data["msg"]=="registered"){
        this.router.navigate(["login","Registed Successfully"]);
      }
      else if(data["msg"]=="used"){
        this.hasError = true;
        this.errorMsg = "Email Already Registered"
      }
    });    
  }

}

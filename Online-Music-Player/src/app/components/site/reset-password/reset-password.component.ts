import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/Shared/user';
import { UserService } from 'src/app/Shared/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private userService:UserService,
              private cookie:CookieService,
              private router:Router) { }
  Password
  ConfirmPassword
  hasError:boolean = false
  errorMsg:string = ""

  ngOnInit(): void {
  }

  submit(){
    if(!this.cookie.check('Verified')){
      this.hasError = true;
      return
    }
    if(this.Password != this.ConfirmPassword){
      this.hasError = true;
      this.errorMsg = "Passwords don't match";    
      return;
    }
    this.userService.changePassword(this.cookie.get('email'),this.Password)
          .subscribe(data=>{
            if(data['msg']=="changed"){
              this.router.navigate(['login','Password Updated Successfully'])
            }
          })
  }

}

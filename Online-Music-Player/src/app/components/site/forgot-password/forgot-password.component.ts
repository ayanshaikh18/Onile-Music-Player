import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/Shared/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  Email:string
  hasError:boolean=false
  
  constructor(private userService:UserService,
              private cookie:CookieService,
              private router:Router) { }

  ngOnInit(): void {
  }

  send(){
    this.userService.getUser(this.Email).subscribe(data=>{
      if(data['msg']=='no'){
        this.hasError = true
        return
      }
      this.userService.sendMail(this.Email).subscribe(data=>{
        var otp = data['otp']
        this.cookie.set('otp',otp)
        this.cookie.set('email',this.Email)
        this.router.navigate(['checkOtp'])
      })
    })
  }

}

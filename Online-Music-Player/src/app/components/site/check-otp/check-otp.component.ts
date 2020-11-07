import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-check-otp',
  templateUrl: './check-otp.component.html',
  styleUrls: ['./check-otp.component.css']
})
export class CheckOtpComponent implements OnInit {

  otp
  hasError:boolean = false
  constructor(private router:Router,private cookie:CookieService) { }

  ngOnInit(): void {
  }

  submit(){
    if(this.otp==this.cookie.get('otp')){
      this.hasError = false
      this.cookie.set('Verified','true')
      this.router.navigate(['resetPassword'])
    }
    else{
      this.hasError = true
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private cookie:CookieService,private router:Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.cookie.delete('UserId')
    this.router.navigate(['/index'])
  }

}

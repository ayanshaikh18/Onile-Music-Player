import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { NgxAudioPlayerModule } from 'ngx-audio-player'

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { IndexComponent } from './components/site/index/index.component';
import { DashboardComponent } from './components/site/dashboard/dashboard.component';
import { SearchSongComponent } from './components/site/search-song/search-song.component';
import { LoginComponent } from './components/site/login/login.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { SignupComponent } from './components/site/signup/signup.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ShowPlaylistComponent } from './components/site/show-playlist/show-playlist.component';
import { MyPlaylistComponent } from './components/site/my-playlist/my-playlist.component';
import { CookieService } from 'ngx-cookie-service';
import { ViewMyPlaylistComponent } from './components/site/view-my-playlist/view-my-playlist.component';
import { ForgotPasswordComponent } from './components/site/forgot-password/forgot-password.component';
import { CheckOtpComponent } from './components/site/check-otp/check-otp.component';
import { ResetPasswordComponent } from './components/site/reset-password/reset-password.component'

const appRoutes: Routes=[
  { path:'index',component:IndexComponent },
  { path:'login',component:LoginComponent },
  { path:'forgotPassword',component:ForgotPasswordComponent },
  { path:'checkOtp',component:CheckOtpComponent},
  { path:'resetPassword',component:ResetPasswordComponent },
  { path:'login/:msg',component:LoginComponent },
  { path:'signup',component:SignupComponent },
  { path:'playlist/:id',component:ShowPlaylistComponent },
  { path:'myplaylist/:id',component:ViewMyPlaylistComponent },
  { path:'dashboard', component:DashboardComponent },
  { path:'searchSong',component:SearchSongComponent },
  { path: 'myPlaylist',component : MyPlaylistComponent},
  { 
    path:"",
    redirectTo:"/index",
    pathMatch:'full'
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    IndexComponent,
    DashboardComponent,
    SearchSongComponent,
    LoginComponent,
    SidebarComponent,
    SignupComponent,
    ShowPlaylistComponent,
    MyPlaylistComponent,
    ViewMyPlaylistComponent,
    ForgotPasswordComponent,
    CheckOtpComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    NgxAudioPlayerModule,
    NoopAnimationsModule
  ],
  providers: [ CookieService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

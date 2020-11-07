import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import {CookieService } from 'ngx-cookie-service'

import { AppComponent } from './app.component';
import { LoginComponent } from './components/site/login/login.component';
import { DashboardComponent } from './components/site/dashboard/dashboard.component';
import { NewSongComponent } from './components/site/new-song/new-song.component';
import { NewPlaylistComponent } from './components/site/new-playlist/new-playlist.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { ManageCatagoriesComponent } from './components/site/manage-catagories/manage-catagories.component';
import { UpdateDeleteSongComponent } from './components/site/update-delete-song/update-delete-song.component';
import { UpdateSongComponent } from './components/site/update-song/update-song.component';

const appRoutes: Routes=[
  { path:'login',component:LoginComponent },
  { path:'login/:msg',component:LoginComponent },
  { path:'dashboard', component:DashboardComponent },
  { path:'newSong',component:NewSongComponent },
  { path:'editSong',component:UpdateDeleteSongComponent },
  { path:'updateSong/:id',component:UpdateSongComponent },
  { path:'newPlaylist',component:NewPlaylistComponent },
  { path:'catagories',component:ManageCatagoriesComponent },
  { 
    path:"",
    redirectTo:"/login",
    pathMatch:'full'
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NewSongComponent,
    NewPlaylistComponent,
    SidebarComponent,
    FooterComponent,
    ManageCatagoriesComponent,
    UpdateDeleteSongComponent,
    UpdateSongComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }

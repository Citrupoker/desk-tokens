import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import {NoContentComponent} from './components/no-content/no-content';
import { NavbarComponent} from './components/navbar/navbar.component'
import {UserService} from "./services/user.service";
import {HttpModule} from "@angular/http";
import {CollapseModule} from 'ngx-bootstrap';
import { routing } from './app.routing';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NoContentComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CollapseModule.forRoot(),
    routing
  ],
  providers: [UserService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }

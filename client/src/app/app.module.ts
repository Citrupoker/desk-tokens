import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ClientLoginComponent } from './components/client/client-login.component';
import { ClientRegisterComponent } from './components/client/client-register.component';
import { EmployerLoginComponent } from './components/employer/employer-login.component';
import { EmployerRegisterComponent } from './components/employer/employer-register.component';
import { HomeComponent } from './components/home/home.component';
import {NoContentComponent} from './components/no-content/no-content';
import { NavbarComponent} from './components/navbar/navbar.component'
import {ClientService} from "./services/client.service";
import {HttpModule} from "@angular/http";
import {CollapseModule} from 'ngx-bootstrap';
import { routing } from './app.routing';
import { AdminComponent } from './components/admin/admin.component';
import { AdminGuard } from './guards/admin.guard';
import { ClientGuard } from './guards/client.guard';
import { EmployerGuard } from './guards/employer.guard';
import {EmployerService} from "./services/employer.service";
import {EmployerDashboardComponent} from './components/employer/employer-dashboard.component';
import {ClientDashboardComponent} from './components/client/client-dashboard.component';
@NgModule({
  declarations: [
    AppComponent,
    ClientLoginComponent,
    ClientRegisterComponent,
    EmployerLoginComponent,
    EmployerRegisterComponent,
    HomeComponent,
    NoContentComponent,
    NavbarComponent,
    AdminComponent,
    EmployerDashboardComponent,
    ClientDashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CollapseModule.forRoot(),
    routing
  ],
  providers: [ClientService, EmployerService,AdminGuard,ClientGuard,EmployerGuard, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }

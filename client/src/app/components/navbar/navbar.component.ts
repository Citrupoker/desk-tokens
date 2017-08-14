import { Component } from '@angular/core';
import {Router} from '@angular/router';
import{ JwtHelper} from 'angular2-jwt';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html'
})
export class NavbarComponent {
  public isCollapsed:boolean = false;
  public status:{isopen:boolean} = {isopen: false};
  jwtHelper: JwtHelper = new JwtHelper();
  constructor(private router: Router){

  }

  public collapsed(event:any):void {
    console.log(event);
  }

  public expanded(event:any):void {
    console.log(event);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  isLoggedIn(){
    return !!localStorage.getItem('token')
  }
  logout(){
    localStorage.clear();
  }
  useJwtHelper() {
    var token = localStorage.getItem('token');

    console.log(
      this.jwtHelper.decodeToken(token),
      this.jwtHelper.getTokenExpirationDate(token),
      this.jwtHelper.isTokenExpired(token)
    );
  }
}

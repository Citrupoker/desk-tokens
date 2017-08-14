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
  decoded: any;
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
  isAdmin(){
    var token = localStorage.getItem('token');
    if(token){
      this.decoded = this.jwtHelper.decodeToken(token);
      if(this.decoded._doc.role === 'Admin'){
        return 'Admin';
      }
      if(this.decoded._doc.role === 'Client'){
        return 'Client';
      }
    }

  return false;
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

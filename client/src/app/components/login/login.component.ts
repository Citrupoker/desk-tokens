import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import{ JwtHelper} from 'angular2-jwt';
@Component({
  templateUrl: 'login.component.html'
})

export class LoginComponent {
  model: any = {};
  loading = false;
  jwtHelper: JwtHelper = new JwtHelper();
  constructor(
    private router: Router,
    private userService: UserService){}

  login() {
    this.loading = true;
    this.userService.login(this.model)
      .subscribe(
        data => {
          localStorage.setItem('token', JSON.parse(data['_body']).token);
          var token = localStorage.getItem('token');
          var decoded = this.jwtHelper.decodeToken(token);
          if(decoded._doc.role === 'Admin'){
            this.router.navigate(['/admin']);
          }
          if(decoded._doc.role === 'Client'){
            this.router.navigate(['/profile']);
          }

        },
        error => {
          this.loading = false;
          console.log(error);
        });
  }

  logout(){
      localStorage.clear();
  }

  isLoggedIn(){
    return !!localStorage.getItem('token')
  }

}

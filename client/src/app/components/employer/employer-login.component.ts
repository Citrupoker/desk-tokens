import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { EmployerService } from '../../services/employer.service';
import{ JwtHelper} from 'angular2-jwt';
@Component({
  templateUrl: 'employer-login.component.html'
})

export class EmployerLoginComponent {
  model: any = {};
  loading = false;
  jwtHelper: JwtHelper = new JwtHelper();
  constructor(
    private router: Router,
    private employerService: EmployerService){}

  login() {
    this.loading = true;
    this.employerService.login(this.model)
      .subscribe(
        data => {
          this.loading = false;
          if(JSON.parse(data['_body']).token !== undefined) {
            localStorage.setItem('token', JSON.parse(data['_body']).token);
            var token = localStorage.getItem('token');
            var decoded = this.jwtHelper.decodeToken(token);
            if (decoded._doc.role === 'Admin') {
              this.router.navigate(['/admin']);
            }
            if (decoded._doc.role === 'Employer') {
              this.router.navigate(['/employer-dashboard']);
            }
          }else{
            console.log('Wrong credentials')
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

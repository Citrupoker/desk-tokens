import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ClientService } from '../../services/client.service';
import{ JwtHelper} from 'angular2-jwt';
@Component({
  templateUrl: 'client-login.component.html'
})

export class ClientLoginComponent {
  model: any = {};
  loading = false;
  jwtHelper: JwtHelper = new JwtHelper();
  constructor(
    private router: Router,
    private clientService: ClientService){}

  login() {
    this.loading = true;
    this.clientService.login(this.model)
      .subscribe(
        data => {
          this.loading = false;
          if(JSON.parse(data['_body']).token !== undefined){
            localStorage.setItem('token', JSON.parse(data['_body']).token);
            var token = localStorage.getItem('token');
            var decoded = this.jwtHelper.decodeToken(token);
            if(decoded._doc.role === 'Admin'){
              this.router.navigate(['/admin']);
            }
            if(decoded._doc.role === 'Client'){
              this.router.navigate(['/client-dashboard']);
            }
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

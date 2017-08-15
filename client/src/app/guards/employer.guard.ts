import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
@Injectable()
export class EmployerGuard implements CanActivate {
  jwtHelper: JwtHelper = new JwtHelper();
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.getRole() === 'Employer') {
      return true;
    }

    // not logged in so redirect to client page with the return url
    this.router.navigate(['/client'], { queryParams: { returnUrl: state.url }});
    return false;
  }

  getRole() {
    const token = localStorage.getItem('token');
    if(token){
      const decoded = this.jwtHelper.decodeToken(token);
      if (decoded._doc.role === 'Admin') {
        return 'Admin';
      }
      if (decoded._doc.role === 'Employer') {
        return 'Employer';
      }
      return false;

    }
  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { EmployerService } from '../../services/employer.service';

@Component({
  templateUrl: 'employer-register.component.html'
})

export class EmployerRegisterComponent {
  model: any = {};
  loading = false;

  constructor(
    private router: Router,
    private employerService: EmployerService){}

  register() {
    this.loading = true;
    this.employerService.create(this.model)
      .subscribe(
        data => {
          this.router.navigate(['/employer/employer-login']);
        },
        error => {
          this.loading = false;
        });
  }
}

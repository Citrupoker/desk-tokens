import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ClientService } from '../../services/client.service';

@Component({
  templateUrl: 'client-register.component.html'
})

export class ClientRegisterComponent {
  model: any = {};
  loading = false;

  constructor(
    private router: Router,
    private clientService: ClientService){}

  register() {
    this.loading = true;
    this.clientService.create(this.model)
      .subscribe(
        data => {
          this.router.navigate(['/client/client-login']);
        },
        error => {
          this.loading = false;
        });
  }
}

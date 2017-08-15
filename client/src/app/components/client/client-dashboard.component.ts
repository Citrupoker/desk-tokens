import { Component, OnInit } from '@angular/core';
import {Http, Headers} from '@angular/http';
@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit {
  thing: any;
  constructor(private http: Http) {

  }

  getThing() {
    let headers = new Headers();
    headers.append('Authorization', localStorage.getItem('token'))
    this.http.get('/client/profile', {headers: headers})
      .subscribe(
        data => this.thing = data,
        err => console.log(err),
        () => console.log('Request Complete')
      );
  }

  ngOnInit() {
    this.getThing();
  }

}

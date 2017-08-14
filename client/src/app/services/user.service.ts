import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { User } from '../models/user';
import 'rxjs/Rx';

@Injectable()
export class UserService {
  constructor(private http: Http) { }

  getAll() {
    return this.http.get('/api').map((response: Response) => response.json());
  }

  getById(_id: string) {
    return this.http.get('/api/' + _id).map((response: Response) => response.json());
  }

  create(user: User) {
    return this.http.post('/api/register', user);
  }

  login(user: User) {
    return this.http.post('/api/authenticate', user);
  }
  update(user: User) {
    return this.http.put('/api/' + user._id, user);
  }

  delete(_id: string) {
    return this.http.delete('/api/' + _id);
  }
}

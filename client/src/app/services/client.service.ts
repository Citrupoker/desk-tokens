import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Client} from '../models/client';
import 'rxjs/Rx';

@Injectable()
export class ClientService {
  constructor(private http: Http) { }

  getAll() {
    return this.http.get('/client').map((response: Response) => response.json());
  }

  getById(_id: string) {
    return this.http.get('/client/' + _id).map((response: Response) => response.json());
  }

  create(client: Client) {
    return this.http.post('/client/register', client);
  }

  login(client: Client) {
    return this.http.post('/client/authenticate', client);
  }
  update(client: Client) {
    return this.http.put('/client/' + client._id, client);
  }

  delete(_id: string) {
    return this.http.delete('/client/' + _id);
  }
}

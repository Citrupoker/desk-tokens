import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Employer} from '../models/employer';
import 'rxjs/Rx';

@Injectable()
export class EmployerService {
  constructor(private http: Http) { }

  getAll() {
    return this.http.get('/employer').map((response: Response) => response.json());
  }

  getById(_id: string) {
    return this.http.get('/employer/' + _id).map((response: Response) => response.json());
  }

  create(employer: Employer) {
    return this.http.post('/employer/register', employer);
  }

  login(employer: Employer) {
    return this.http.post('/employer/authenticate', employer);
  }
  update(employer: Employer) {
    return this.http.put('/employer/' + employer._id, employer);
  }

  delete(_id: string) {
    return this.http.delete('/employer/' + _id);
  }
}

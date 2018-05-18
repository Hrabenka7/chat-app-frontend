import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

  private baseUrl = environment.apiUrl + '/profile';

  constructor(private httpClient: HttpClient) { }

// ####################################### GET ONE ######################## //

  getOne(id: string): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseUrl}/${id}`, options)
      .toPromise();
  }

// ####################################### UPDATE USER ######################## //

  update(user): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.put(`${this.baseUrl}/me`, user, options)
      .toPromise();
  }
 
// ####################################### ADD NEW SKILL ######################## //

  addSkill(newSkill): Promise<any> {
    const options = {
      withCredentials: true
    };

    const data = {
      newSkill
    };

    return this.httpClient.put(`${this.baseUrl}/edit-my-skills`, data, options)
      .toPromise();
  }

}

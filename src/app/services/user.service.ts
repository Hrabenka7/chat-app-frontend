import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class UserService {

  private baseUrl = environment.apiUrl + '/profile';

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

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

  uploadPicture(fd): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.put(`${this.baseUrl}/me/picture`, fd, options)
      .toPromise()
      .then((data) => this.authService.setUser(data));
  }

}

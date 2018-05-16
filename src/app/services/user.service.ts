import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {

  private baseUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }


  getOne(id: string): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseUrl}/profile/${id}`, options)
      .toPromise();
  }

  /* create(movie): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.post(`${this.baseUrl}/movies`, movie, options)
      .toPromise();
  }

  update(movie): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.put(`${this.baseUrl}/movies/${movie._id}`, movie, options)
      .toPromise();
  }

  deleteOne(id: string): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.delete(`${this.baseUrl}/movies/${id}`, options)
      .toPromise();
  } */
}

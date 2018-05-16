import { Injectable } from '@angular/core'; // decorator of services and other classes that are intended to be injected (use across the app)
import { HttpClient, HttpResponse } from '@angular/common/http';  /* front-end & back-end communication via Http protocol
+ full HTTP response, including a typed response body */
import { Observable } from 'rxjs/Observable'; // async, Observable sends notifications and Observer consumes them.
import { Subject } from 'rxjs/Subject'; // inherits both Observable and Observer, publication and subscription combined in one source
import 'rxjs/add/operator/toPromise'; // adds toPromise property to Observable type

import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

  private user: any;
  private userChange: Subject<any> = new Subject();

  private baseUrl = environment.apiUrl + '/auth';   // path of backend

  userChange$: Observable<any> = this.userChange.asObservable();  // userChange of type Subject will act like Observable now

  constructor(private httpClient: HttpClient) { }

  private setUser(user?: any) {  // user?: ??????
    this.user = user;
    this.userChange.next(user);  // .next() => all subscribers will listen to this event
    return user;
  }

  // #################### SIGN UP FUNCTION #################################### //
  signup(user: any): Promise<any> {
    const options = {
      withCredentials: true
    };

    return this.httpClient.post(`${this.baseUrl}/signup`, user, options)
      .toPromise()
      .then((data) => this.setUser(data));
  }

  // ##################### LOGIN FUNCTION ##################################### //
  login(user: any): Promise<any> {
    const options = {
      withCredentials: true
    };

    return this.httpClient.post(`${this.baseUrl}/login`, user, options)
      .toPromise()
      .then((data) => this.setUser(data));
  }

  // ################################ LOGOUT FUNCTION ##########################//
   logout(): Promise<any> {
     const options = {
       withCredentials: true
     };
     return this.httpClient.post(`${this.baseUrl}/logout`, {}, options)
       .toPromise()
       .then(() => this.setUser());
   }

   // ################################ GET-USER FUNCTION ##########################//
   getUser(): any {
     return this.user;
   }

  // ################################ ME FUNCTION ##########################//
  me(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseUrl}/me`, options)
    .toPromise()
    .then((user) => this.setUser(user))
    .catch((err) => {
      if (err.status === 404) {
          this.setUser();
        }
      });
  }
}

import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable()
export class InitAuthGuardService {

  constructor(private authService: AuthService) { }

  canActivate(): Promise<boolean> {
    return this.authService.me()
      .then((user) => {
        return true;
      })
      .catch((error) => {
        console.error(error);
        return false;
      });
  }

}

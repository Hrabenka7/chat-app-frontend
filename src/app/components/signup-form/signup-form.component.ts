import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  feedbackEnabled = false;
  error = null;
  processing = false;
  firstName: string;
  lastName: string;
  cohort = '';
  email: string;
  password: string;
  terms: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  submitForm(form) {
    this.error = '';
    this.feedbackEnabled = true;

    // form has no errors
    if (form.valid) {
      this.processing = true;
      const user = {
        firstName: this.firstName,
        lastName: this.lastName,
        cohort: this.cohort,
        email: this.email,
        password: this.password,
      };

      // sign up the user
      this.authService.signup(user)
        .then((result) => {
          this.router.navigate(['/chat']);
        })
        .catch((err) => {
          this.error = err.error.code;
          this.processing = false;
          this.feedbackEnabled = false;
        });
    }
  }

}

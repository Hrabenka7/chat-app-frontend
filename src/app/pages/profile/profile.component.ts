import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: Object;
  idUser: string;
  disabledForm: boolean;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // this.disabledForm = true;
    this.activatedRoute.params.subscribe((params) => {
      this.idUser = params.id;
      this.userService.getOne(this.idUser)
        .then((data) => {
          setTimeout(() => {
            this.user = data;
          }, 1000);
        });
    });
  }

  submitForm(user) {
    this.userService.update(user)
    .then((data) => {
      this.router.navigate(['/profile', this.idUser]);
      this.disabledForm = false;
    })
    .catch((err) => {
      console.log(err);
    });
  }

}


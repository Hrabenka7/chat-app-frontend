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

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
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

  /*   handleDeleteClick() {
      this.movieService.deleteOne(this.idMovie)
        .then(() => {
          this.router.navigate(['/']);
        })
        .catch(err => {
          console.log(err);
        });
    } */
}

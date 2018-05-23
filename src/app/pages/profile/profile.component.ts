import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;
  idUser: string;
  canEdit = true;
  newSkill: string;
  selectedFile: File = null;
  imageUploaded = false;


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

  addSkill() {
    this.user.skills.push(this.newSkill);
    this.newSkill = '';
  }

  deleteSkill(skill) {
    const index = this.user.skills.indexOf(skill);
    this.user.skills.splice(index, 1);
  }

  submitForm(form) {
    this.userService.update(this.user)
    .then((data) => {
      this.user = data;
      this.canEdit = !this.canEdit;
      this.router.navigate(['/profile', this.idUser]);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleEditClick() {
    this.canEdit = !this.canEdit;
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload(event) {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.userService.uploadPicture(fd)
      .then((result) => {
        this.imageUploaded = true;
        this.user.picture = result.picture;
        console.log(result);
      });
  }

}


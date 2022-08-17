import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ModalService } from 'src/app/services/modal.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-create-photo',
  templateUrl: './create-photo.component.html',
  styleUrls: ['./create-photo.component.css']
})
export class CreatePhotoComponent implements OnInit {

  form = new FormGroup({
    url: new FormControl<string>('', [
      Validators.required
    ])
  })

  constructor(
    public photoService: PhotoService,
    private authService: AuthenticationService,
    private modalService: ModalService) { }

  get url() {
    return this.form.controls.url as FormControl
  }

  ngOnInit(): void {
  }

  submit() {
    this.photoService.create({
      url: this.form.value.url as string
    })
      .subscribe( photo => {
        console.log(photo)
        this.photoService.createUserPhoto({
          photoId: String(photo.id),
          userId: this.authService.currentUser.id
        })
          .subscribe(up => console.log(up))
        this.authService.currentUser.photoId = photo.id
        this.modalService.close()
    })

    this.authService.currentUser.photoUrl = this.form.value.url as string

    if (this.authService.currentUser.photoId){
      this.authService.deleteOldPhoto()
    }
  }

}

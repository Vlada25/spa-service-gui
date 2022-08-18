import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalTypes } from 'src/app/enums/modal-types';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ModalService } from 'src/app/services/modal.service';
import { PersonService } from 'src/app/services/person.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit {

  login = ModalTypes.login
  register = ModalTypes.register
  photo = ModalTypes.photo

  phoneForm = new FormGroup({
    phone: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(18)
    ])
  })

  get phone() {
    return this.phoneForm.controls.phone as FormControl
  }
  
  constructor(
    public authService: AuthenticationService,
    public photoService: PhotoService,
    private personService: PersonService,
    public modalService: ModalService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  deletePhoto() {
    this.authService.deleteOldPhoto()
    location.reload()
  }

  showOrders() {
    this.router.navigate(['/orders'])
  }

  submitPhone() {
    if (this.authService.currentUser.isPersonExists) {
      this.personService.getClientByUserId(this.authService.currentUser.id)
        .subscribe(client => {
          this.personService.updateClient({
            id: client.id,
            phoneNumber: this.phoneForm.value.phone as string
          })
            .subscribe(() => 
              this.authService.currentUser.phoneNumber = this.phoneForm.value.phone as string)
        })
    }
    else {
      this.personService.createClient({
        userId: this.authService.currentUser.id,
        phoneNumber: this.phoneForm.value.phone as string
      })
        .subscribe(() => 
          this.authService.currentUser.phoneNumber = this.phoneForm.value.phone as string)
    }
  }

}

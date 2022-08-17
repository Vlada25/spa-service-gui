import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalTypes } from 'src/app/enums/modal-types';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ModalService } from 'src/app/services/modal.service';
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
  
  constructor(
    public authService: AuthenticationService,
    public photoService: PhotoService,
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

}

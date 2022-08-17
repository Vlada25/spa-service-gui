import { Component, Input } from '@angular/core';
import { ModalTypes } from 'src/app/enums/modal-types';
import { ISpaService } from 'src/app/models/spa-service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-spa-service',
  templateUrl: './spa-service.component.html',
  styleUrls: ['./spa-service.component.css']
})
export class SpaServiceComponent{

  @Input() spaService: ISpaService

  constructor(
    private authService: AuthenticationService,
    public modalService: ModalService) {}
  
  signUpForProcedur() {
    if (!this.authService.isAuthorized()){
      this.modalService.open(ModalTypes.login)
    }
    else {
      this.modalService.open(ModalTypes.order)
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ModalTypes } from 'src/app/enums/modal-types';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-admins-page',
  templateUrl: './admins-page.component.html',
  styleUrls: ['./admins-page.component.css']
})
export class AdminsPageComponent implements OnInit {

  photo = ModalTypes.photo
  serviceType = ModalTypes.serviceType
  
  constructor(
    public modalService: ModalService) { }

  ngOnInit(): void {
  }

}

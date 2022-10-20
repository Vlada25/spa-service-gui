import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalTypes } from 'src/app/enums/modal-types';
import { ModalService } from 'src/app/services/modal.service';
import { PersonService } from 'src/app/services/person.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admins-page',
  templateUrl: './admins-page.component.html',
  styleUrls: ['./admins-page.component.css']
})
export class AdminsPageComponent implements OnInit {

  photo = ModalTypes.photo
  serviceType = ModalTypes.serviceType
  
  constructor(
    public modalService: ModalService,
    public personService: PersonService,
    public userService: UserService,
    public router: Router) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe(() => {})
  }

  viewOrders() {
    this.router.navigate(['/adminOrders'])
  }
}

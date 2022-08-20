import { Component, OnInit } from '@angular/core';
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
    public userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe(() => {})
  }

  createPersonsForUsers() {
    this.userService.users.forEach(user => {
      if (user.roles.includes('Master')) {
        this.userService.createMaster(user.id)
          .subscribe(master => console.log(master))
      }
      else {
        this.userService.createClient(user.id)
          .subscribe(client => console.log(client))
      }
    });

    console.log('done!')
  }
}

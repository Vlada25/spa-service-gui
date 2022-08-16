import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-admins-page',
  templateUrl: './admins-page.component.html',
  styleUrls: ['./admins-page.component.css']
})
export class AdminsPageComponent implements OnInit {

  constructor(public modalService: ModalService) { }

  ngOnInit(): void {
  }

}

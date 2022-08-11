import { Component, OnInit } from '@angular/core';
import { ServiceTypeService } from 'src/app/services/service-type.service';

@Component({
  selector: 'app-services-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.css']
})
export class ServicesPageComponent implements OnInit{

  substr = ''

  constructor(public serviceTypeService: ServiceTypeService) {}

  ngOnInit(): void {
    this.serviceTypeService.getAll().subscribe( () => {})
  }
}

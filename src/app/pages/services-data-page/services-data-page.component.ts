import { Component, OnInit } from '@angular/core';
import { SpaServiceService } from 'src/app/services/spa-service.service';

@Component({
  selector: 'app-services-data-page',
  templateUrl: './services-data-page.component.html',
  styleUrls: ['./services-data-page.component.css']
})
export class ServicesDataPageComponent implements OnInit {

  serviceName = 'All'

  constructor(public spaServiceService: SpaServiceService) { }

  ngOnInit(): void {
    this.spaServiceService.getAll().subscribe( () => {})
  }

}

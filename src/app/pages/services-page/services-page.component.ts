import { Component, OnInit } from '@angular/core';
import { IServiceType } from 'src/app/models/service-type';
import { PhotoService } from 'src/app/services/photo.service';
import { ServiceTypeService } from 'src/app/services/service-type.service';

@Component({
  selector: 'app-services-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.css']
})
export class ServicesPageComponent implements OnInit{

  substr = ''
  loading = false

  constructor(
    public serviceTypeService: ServiceTypeService
    ) {}

  ngOnInit(): void {
    this.loading = true
    this.serviceTypeService.getAll().subscribe( () => {
      this.loading = false
    })
  }
}

import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IServiceType } from 'src/app/models/service-type';

@Component({
  selector: 'app-service-type',
  templateUrl: './service-type.component.html',
  styleUrls: ['./service-type.component.css']
})
export class ServiceTypeComponent{

  @Input() serviceType: IServiceType
  
  description = false

  constructor(private router: Router) {}
  
  goToServicesDataPage() {
    this.router.navigate(['servicesData'])
  }
}

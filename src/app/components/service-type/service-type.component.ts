import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IServiceType } from 'src/app/models/service-type';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ServiceTypeService } from 'src/app/services/service-type.service';

@Component({
  selector: 'app-service-type',
  templateUrl: './service-type.component.html',
  styleUrls: ['./service-type.component.css']
})
export class ServiceTypeComponent{

  @Input() serviceType: IServiceType
  
  description = false

  constructor(
    private router: Router,
    public authService: AuthenticationService,
    private serviceTypeService: ServiceTypeService) {}
  
  goToServicesDataPage(serviceTypeName: string, serviceTypeId: string | undefined) {
    this.router.navigate(['servicesData/', serviceTypeId, serviceTypeName])
  }

  deleteServiceType() {
    this.serviceTypeService.delete(this.serviceType.id).subscribe(()=>{})
  }
}

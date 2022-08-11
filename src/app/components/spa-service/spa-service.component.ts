import { Component, Input } from '@angular/core';
import { ISpaService } from 'src/app/models/spa-service';

@Component({
  selector: 'app-spa-service',
  templateUrl: './spa-service.component.html',
  styleUrls: ['./spa-service.component.css']
})
export class SpaServiceComponent{

  @Input() spaService: ISpaService
  
}

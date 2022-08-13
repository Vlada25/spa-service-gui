import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpaServiceService } from 'src/app/services/spa-service.service';

@Component({
  selector: 'app-services-data-page',
  templateUrl: './services-data-page.component.html',
  styleUrls: ['./services-data-page.component.css']
})
export class ServicesDataPageComponent implements OnInit {

  serviceName = 'All'

  constructor(
    public spaServiceService: SpaServiceService,
    private activatedRout: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.serviceName = this.activatedRout.snapshot.params['name']
    this.spaServiceService.getByServiceTypeId(this.activatedRout.snapshot.params['id']).subscribe( () => {})
  }

}

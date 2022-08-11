import { Component, OnInit } from '@angular/core';
import { IAddress } from 'src/app/models/address/address';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-services-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.css']
})
export class ServicesPageComponent implements OnInit{

  addresses: IAddress[] = []

  constructor(private addressService: AddressService) {}

  ngOnInit(): void {
    this.addressService.getAll().subscribe( addresses => {
      this.addresses = addresses
    })
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { IAddress } from 'src/app/models/address/address';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent{

  @Input() address: IAddress

}

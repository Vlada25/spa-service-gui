import { Component, Input, OnInit } from '@angular/core';
import { IOrder } from 'src/app/models/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

  @Input() order: IOrder
  
  constructor() { }

}

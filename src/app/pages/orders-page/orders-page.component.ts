import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css']
})
export class OrdersPageComponent implements OnInit {

  loading = false

  constructor(
    public orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.loading = true
    this.orderService.getAll().subscribe( () => {
      this.loading = false
    })
  }

}

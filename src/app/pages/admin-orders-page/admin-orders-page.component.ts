import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-admin-orders-page',
  templateUrl: './admin-orders-page.component.html',
  styleUrls: ['./admin-orders-page.component.css']
})
export class AdminOrdersPageComponent implements OnInit {

  date = ''
  clientSurname = ''
  masterSurname = ''
  status = 'All'
  
  constructor(
    public orderService: OrderService,
    public scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.orderService.getAll().subscribe(orders => 
      {
        orders.forEach(o => {
          this.scheduleService.getById(o.scheduleId).subscribe(sch => {
            o.masterSurname = sch.masterSurname
            o.date = sch.startTime.split('T')[0]
          })
        })
      })
  }

}

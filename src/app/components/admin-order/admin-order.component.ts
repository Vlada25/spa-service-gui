import { Component, Input, OnInit } from '@angular/core';
import { IOrder } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css']
})
export class AdminOrderComponent implements OnInit {

  @Input() order: IOrder

  startTime: string
  endTime: string
  date: string

  constructor(
    public scheduleService: ScheduleService,
    public orderService: OrderService
    ) { }

  ngOnInit(): void {
    this.scheduleService.getById(this.order.scheduleId)
      .subscribe(sch => {
        this.date = sch.startTime.split('T')[0]
        this.startTime = sch.startTime.split('T')[1].split(':')[0] + ":" + sch.startTime.split('T')[1].split(':')[1]
        this.endTime = sch.endTime.split('T')[1].split(':')[0] + ":" + sch.endTime.split('T')[1].split(':')[1]
      })
  }

  setStatus(status: string) {
    this.orderService.update(this.order.id, {
      clientName: this.order.clientName,
      clientSurname: this.order.clientSurname,
      status: status
    }).subscribe(() => {
      location.reload()
    })
  }
}

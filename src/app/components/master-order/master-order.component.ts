import { Component, Input, OnInit } from '@angular/core';
import { IOrder } from 'src/app/models/order';
import { ISchedule } from 'src/app/models/schedule';
import { OrderService } from 'src/app/services/order.service';
@Component({
  selector: 'app-master-order',
  templateUrl: './master-order.component.html',
  styleUrls: ['./master-order.component.css']
})
export class MasterOrderComponent implements OnInit {

  @Input() schedule: ISchedule
  order: IOrder

  startTime: string
  endTime: string
  date: string
  
  constructor(public orderService: OrderService) { }

  ngOnInit(): void {
    this.date = this.schedule.startTime.split('T')[0]
    this.startTime = this.schedule.startTime.split('T')[1].split(':')[0] + ":" + this.schedule.startTime.split('T')[1].split(':')[1]
    this.endTime = this.schedule.endTime.split('T')[1].split(':')[0] + ":" + this.schedule.endTime.split('T')[1].split(':')[1]

    this.orderService.getByScheduleId(this.schedule.id)
      .subscribe(order => {this.order = order})
  }

  isStarted(): boolean {
    if (this.order.status == "Not Started")
      return false

    return true
  }

  setStatus(status: string) {
    var order = this.orderService.currentOrder
    this.orderService.update(order.id, {
      clientName: order.clientName,
      clientSurname: order.clientSurname,
      status: status
    }).subscribe(() => {
      location.reload()
    })
  }
}

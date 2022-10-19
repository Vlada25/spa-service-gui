import { Component, Input, OnInit } from '@angular/core';
import { IOrder } from 'src/app/models/order';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit{

  @Input() order: IOrder

  startTime: string
  endTime: string
  date: string
  
  constructor(public scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.scheduleService.getById(this.order.scheduleId)
      .subscribe(sch => {
        this.date = sch.startTime.split('T')[0]
        this.startTime = sch.startTime.split('T')[1].split(':')[0] + ":" + sch.startTime.split('T')[1].split(':')[1]
        this.endTime = sch.endTime.split('T')[1].split(':')[0] + ":" + sch.endTime.split('T')[1].split(':')[1]
      })
  }
}

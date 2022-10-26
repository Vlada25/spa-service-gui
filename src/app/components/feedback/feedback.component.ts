import { Component, Input, OnInit } from '@angular/core';
import { IFeedback } from 'src/app/models/feedback';
import { IOrder } from 'src/app/models/order';
import { ISchedule } from 'src/app/models/schedule';
import { FeedbackService } from 'src/app/services/feedback.service';
import { OrderService } from 'src/app/services/order.service';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  @Input() feedback: IFeedback

  schedule: ISchedule
  order: IOrder

  constructor(
    public orderService: OrderService,
    public scheduleService: ScheduleService
  ) { }

  ngOnInit(): void {
    this.orderService.getById(this.feedback.orderId)
      .subscribe(o => {
        this.order = o
        this.scheduleService.getById(o.scheduleId)
          .subscribe(s => this.schedule = s)
      })
  }

}

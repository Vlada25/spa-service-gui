import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IFeedback } from 'src/app/models/feedback';
import { IOrder } from 'src/app/models/order';
import { FeedbackService } from 'src/app/services/feedback.service';
import { OrderService } from 'src/app/services/order.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { SpaServiceService } from 'src/app/services/spa-service.service';

@Component({
  selector: 'app-feedbacks-page',
  templateUrl: './feedbacks-page.component.html',
  styleUrls: ['./feedbacks-page.component.css']
})
export class FeedbacksPageComponent implements OnInit {

  feedbacks: IFeedback[]
  serviceName: string

  constructor(
    private activatedRout: ActivatedRoute,
    public scheduleService: ScheduleService,
    public orderService: OrderService,
    public feedbackService: FeedbackService
    ) { }

  ngOnInit(): void {
    this.feedbacks = []
    this.scheduleService.getByServiceId(this.activatedRout.snapshot.params['id'])
      .subscribe(schedules => {
        schedules.forEach(s => {
          this.serviceName = s.serviceName
          this.orderService.getByScheduleId(s.id)
            .subscribe(o => {
              this.feedbackService.getByOrderId(o.id)
                .subscribe(feedbacks => 
                  feedbacks.forEach(f => this.feedbacks.push(f)))
            })
        })
      })
  }
}

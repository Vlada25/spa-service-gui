import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IOrder } from 'src/app/models/order';
import { FeedbackService } from 'src/app/services/feedback.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.css']
})
export class AddFeedbackComponent implements OnInit {

  @Input() order: IOrder

  form = new FormGroup({
    comment: new FormControl<string>(''),
    mark: new FormControl<string>('', [
      Validators.required
    ])
  })
  
  constructor(
    public feedbackService: FeedbackService,
    public modalService: ModalService) { }

  get comment() {
    return this.form.controls.comment as FormControl
  }

  get mark() {
    return this.form.controls.mark as FormControl
  }

  ngOnInit(): void {
  }

  submit() {
    this.feedbackService.create({
      mark: Number(this.form.value.mark),
      comment: this.form.value.comment as string,
      orderId: this.order.id as string
    }).subscribe(() => {
      this.modalService.close()
      alert("Feedback saved")
    })
  }
}

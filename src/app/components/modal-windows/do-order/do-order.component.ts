import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISpaService } from 'src/app/models/spa-service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { OrderService } from 'src/app/services/order.service';
import { PersonService } from 'src/app/services/person.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-do-order',
  templateUrl: './do-order.component.html',
  styleUrls: ['./do-order.component.css']
})
export class DoOrderComponent implements OnInit {

  @Input() spaService: ISpaService
  
  form = new FormGroup({
    master: new FormControl<string>('', [
      Validators.required
    ]),
    time: new FormControl<string>('', [
      Validators.required
    ])
  })
  
  constructor(
    public scheduleService: ScheduleService,
    public orderService: OrderService,
    public userService: UserService,
    public personService: PersonService,
    public authService: AuthenticationService
  ) { }

  get master() {
    return this.form.controls.master as FormControl
  }

  get time() {
    return this.form.controls.time as FormControl
  }

  ngOnInit(): void {
    this.personService.getMastersByAddressId(this.spaService.addressId)
      .subscribe(() => {})
  }

  doOrder() {

  }

}

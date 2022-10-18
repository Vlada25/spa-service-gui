import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IServiceType } from 'src/app/models/service-type';
import { ISpaService } from 'src/app/models/spa-service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ModalService } from 'src/app/services/modal.service';
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
  @Input() serviceType: IServiceType

  untilTime: string
  
  form = new FormGroup({
    masterFio: new FormControl<string>(''),
    time: new FormControl<string>('', [
      Validators.required
    ])
  })
  
  constructor(
    public scheduleService: ScheduleService,
    public orderService: OrderService,
    public userService: UserService,
    public personService: PersonService,
    public authService: AuthenticationService,
    public modalService: ModalService
  ) { }

  get time() {
    return this.form.controls.time as FormControl
  }

  get masterFio() {
    return this.form.controls.masterFio as FormControl
  }

  ngOnInit(): void {
    this.personService.getMastersByAddressId(this.spaService.addressId)
      .subscribe(() => {})

    this.scheduleService.getAll().subscribe(() => {})

    var t = 20 * 60 - this.serviceType.lastingInMinutes
    this.untilTime = Math.floor(t / 60) + ":" + (t % 60)
    if (t % 60 == 0) this.untilTime += "0"
  }

  submit() {
    var fio = this.form.value.masterFio as string
    var startTime = this.form.value.time as string

    var timeParts = startTime.split('T')[1].split(':')

    if (!this.validateDateTime()){
      console.log("You cannot book this time!")
    }
    else {
      var mins = Number(timeParts[0]) * 60 + Number(timeParts[1]) + this.serviceType.lastingInMinutes
      var newTime = Math.floor(mins / 60) + ":" + (mins % 60)
      var endTime = startTime.split('T')[0] + "T" + newTime

      if (fio != '' && fio != 'Select master'){
        var masterFioArr: string[] = (this.form.value.masterFio as string).split(' ')
        var master = this.personService.mastersByAddress
          .find(m => 
            m.surname == masterFioArr[0] &&
            m.name == masterFioArr[1] &&
            m.middleName == masterFioArr[2])

        this.scheduleService.create({
            masterId: master?.id,
            serviceId: this.spaService.id,
            startTime: startTime,
            endTime: endTime,
            masterSurname: master?.surname,
            masterName: master?.name,
            serviceName: this.serviceType.name,
            servicePrice: this.spaService.price,
            address: this.spaService.address.country + ", " + this.spaService.address.city + 
              ", " + this.spaService.address.street + ", " + this.spaService.address.house,
            addressId: this.spaService.addressId,
            serviceTypeId: this.serviceType.id
          })
          .subscribe(sch => {
            this.orderService.create({
              clientId: this.authService.currentUser.id,
              scheduleId: sch.id,
              status: "Not Started",
              clientSurname: this.authService.currentUser.surname,
              clientName: this.authService.currentUser.name,
            }).subscribe(() => {
              this.modalService.close()
              alert("You are registered on " + startTime.split('T')[0] + 
                ", from " + startTime.split('T')[1] + " till " + endTime.split('T')[1] + ".")
            })
          })
    }}
  }

  validateDateTime(): boolean {
    var startTime = this.form.value.time as string

    var day = Number(startTime.split('T')[0].split('-')[2])
    var month = Number(startTime.split('T')[0].split('-')[1])
    var year = Number(startTime.split('T')[0].split('-')[0])

    var timeParts = startTime.split('T')[1].split(':')

    var totalStartTime = Number(timeParts[0]) * 60 + Number(timeParts[1])
    var totalEndTime =  Number(timeParts[0]) * 60 + Number(timeParts[1]) + this.serviceType.lastingInMinutes

    if (Number(timeParts[0]) > Number(this.untilTime.split(':')[0]) ||
    Number(timeParts[0]) < 8){
      return false
    }
    else if (!this.validateCurrentDateTime(day, month, year, totalStartTime)){
      return false
    }
    else {
      var schedulesByDate = this.scheduleService.schedules.filter(sch => {
        var schDay = Number(sch.startTime.split('T')[0].split('-')[2])
        var schMonth = Number(sch.startTime.split('T')[0].split('-')[1])
        var schYear = Number(sch.startTime.split('T')[0].split('-')[0])

        var masterFioArr: string[] = (this.form.value.masterFio as string).split(' ')
        var master = this.personService.mastersByAddress
          .find(m => 
            m.surname == masterFioArr[0] &&
            m.name == masterFioArr[1] &&
            m.middleName == masterFioArr[2])

        return (schYear == year && schMonth == month && schDay == day && sch.masterId == master?.id)
      })

      if (schedulesByDate.length == 0) {
        return true
      }
      else {
        var schedulesByTime = schedulesByDate.filter(sch => {
          var schStartTime = Number(sch.startTime.split('T')[1].split(':')[0]) * 60 + Number(sch.startTime.split('T')[1].split(':')[1])
          var schEndTime = Number(sch.endTime.split('T')[1].split(':')[0]) * 60 + Number(sch.endTime.split('T')[1].split(':')[1])

          return ((totalStartTime >= schStartTime && totalStartTime <= schEndTime) ||
            (totalEndTime >= schStartTime && totalEndTime <= schEndTime))
        })

        console.log(schedulesByTime)

        if (schedulesByTime.length != 0){
          return false
        }
      }
      return true
    }
  }

  validateCurrentDateTime(day: number, month: number, year: number, totalStartTime: number): boolean {
    var currentDate = new Date()
    var mins = currentDate.getHours() * 60 + currentDate.getMinutes()

    var curYear = Number(currentDate.toISOString().split('T')[0].split('-')[0])
    var curMonth = Number(currentDate.toISOString().split('T')[0].split('-')[1])
    var curDay = Number(currentDate.toISOString().split('T')[0].split('-')[2])

    if (year < curYear){
      return false
    }
    else if (year == curYear){
      if (month < curMonth){
        return false
      }
      else if (month == curMonth){
        if (day < curDay){
          return false
        }
        else if (day == curDay){
          if (totalStartTime < mins + 5){
            return false
          }
          return true
        }
        return true
      }
      return true
    }
    return true
  }
}

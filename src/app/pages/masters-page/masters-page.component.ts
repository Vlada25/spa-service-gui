import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PersonService } from 'src/app/services/person.service';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-masters-page',
  templateUrl: './masters-page.component.html',
  styleUrls: ['./masters-page.component.css']
})
export class MastersPageComponent implements OnInit {

  date = ''
  
  constructor(
    public scheduleService: ScheduleService,
    public personService: PersonService,
    public authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.getByLogin(localStorage.getItem('login') as string)
        .subscribe(user => {
          this.personService.getMasterByUserId(user.id)
            .subscribe(master => {
              this.scheduleService.getByMasterId(master.id).subscribe(() => {})
            })
        })
  }

}

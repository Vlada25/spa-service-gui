import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ISchedule } from '../models/schedule';
import { OrderService } from './order.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  schedules: ISchedule[] = []

  constructor(
    private httpClient: HttpClient,
    private orderService: OrderService
  ) { }

  getAll(): Observable<ISchedule[]> {
    return this.httpClient.get<ISchedule[]>('https://localhost:7142/Schedules')
      .pipe(
        tap(sch => this.schedules = sch)
      )
  }

  create(schedule: ISchedule, clientId: string): Observable<ISchedule> {
    return this.httpClient.post<ISchedule>('https://localhost:7142/Schedules', schedule)
      .pipe(
        tap(sch => {
          console.log(sch)
          this.orderService.create({
            scheduleId: String(sch.id),
            clientId: clientId
          }).subscribe(() => {})
        })
      )
  }
}

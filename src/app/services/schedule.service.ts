import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ISchedule } from '../models/schedule';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  schedules: ISchedule[] = []
  schedule: ISchedule

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ISchedule[]> {
    return this.httpClient.get<ISchedule[]>(environment.apiUrl + 'Schedules')
      .pipe(
        tap(sch => this.schedules = sch)
      )
  }

  getById(id: string | undefined): Observable<ISchedule> {
    return this.httpClient.get<ISchedule>(environment.apiUrl + 'Schedules/' + id)
      .pipe(
        tap(sch => this.schedule = sch)
      )
  }

  getByMasterId(masterId: string | undefined): Observable<ISchedule[]> {
    return this.httpClient.get<ISchedule[]>(environment.apiUrl + 'Schedules/Masters/' + masterId)
      .pipe(
        tap(sch => this.schedules = sch)
      )
  }

  create(schedule: ISchedule): Observable<ISchedule> {
    return this.httpClient.post<ISchedule>(environment.apiUrl + 'Schedules', schedule)
      .pipe(
        tap(sch => console.log(sch))
      )
  }
}

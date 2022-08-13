import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ISpaService } from '../models/spa-service';

@Injectable({
  providedIn: 'root'
})
export class SpaServiceService {

  spaServices: ISpaService[] = []

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ISpaService[]> {
    return this.httpClient.get<ISpaService[]>('https://localhost:7142/Services/GetAll')
      .pipe(
        tap(services => this.spaServices = services)
      )
  }

  getByServiceTypeId(serviceTypeId: string): Observable<ISpaService[]> {
    return this.httpClient.get<ISpaService[]>('https://localhost:7142/Services/GetByServiceTypeId/' + serviceTypeId)
      .pipe(
        tap(services => this.spaServices = services)
      )
  }
}

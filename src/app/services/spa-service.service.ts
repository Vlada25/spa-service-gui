import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ISpaService } from '../models/spa-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpaServiceService {

  spaServices: ISpaService[] = []

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ISpaService[]> {
    return this.httpClient.get<ISpaService[]>(environment.apiUrl + 'Services')
      .pipe(
        tap(services => this.spaServices = services)
      )
  }

  getByServiceTypeId(serviceTypeId: string): Observable<ISpaService[]> {
    return this.httpClient.get<ISpaService[]>(environment.apiUrl + 'Services/ServiceTypes/' + serviceTypeId)
      .pipe(
        tap(services => this.spaServices = services)
      )
  }
}

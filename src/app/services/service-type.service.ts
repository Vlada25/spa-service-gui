import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable, tap } from 'rxjs';
import { IServiceType } from '../models/service-type';

@Injectable({
  providedIn: 'root'
})
export class ServiceTypeService {

  serviceTypes: IServiceType[] = []

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<IServiceType[]> {
    return this.httpClient.get<IServiceType[]>('https://localhost:7043/api/ServiceTypes/GetAll')
      .pipe(
        tap(servTypes => this.serviceTypes = servTypes)
      )
  }
}

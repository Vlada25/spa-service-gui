import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable, tap } from 'rxjs';
import { IServiceType } from '../models/service-type';
import { PhotoService } from './photo.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceTypeService {

  serviceTypes: IServiceType[] = []
  serviceType: IServiceType

  constructor(
    private httpClient: HttpClient,
    private photoService: PhotoService) { }

  getAll(): Observable<IServiceType[]> {
    return this.httpClient.get<IServiceType[]>('https://localhost:7142/ServiceTypes')
      .pipe(
        tap(servTypes => {
          for (let i = 0; i < servTypes.length; i++){
            this.photoService.get(servTypes[i].photoId).subscribe( p => {
              servTypes[i].photoSrc = "data:image/jpg;base64," + p
            })
          }
          this.serviceTypes = servTypes
        })
      )
  }

  get(id: string | undefined): Observable<IServiceType> {
    return this.httpClient.get<IServiceType>('https://localhost:7142/ServiceTypes/' + id)
      .pipe(
        tap(st => this.serviceType = st)
      )
  }

  create(serviceType: IServiceType): Observable<IServiceType> {
    return this.httpClient.post<IServiceType>('https://localhost:7142/ServiceTypes', serviceType)
      .pipe(
        tap(st => {
          this.serviceTypes.push(st)
          console.log(st)
        })
      )
  }

  delete(id: string | undefined): Observable<string> {
    return this.httpClient.delete<string>('https://localhost:7142/ServiceTypes/' + id)
      .pipe(
        tap(mes => console.log(mes))
      )
  }
}

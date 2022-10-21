import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable, tap } from 'rxjs';
import { IServiceType } from '../models/service-type';
import { PhotoService } from './photo.service';
import { environment } from 'src/environments/environment';

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
    return this.httpClient.get<IServiceType[]>(environment.apiUrl + 'ServiceTypes')
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
    return this.httpClient.get<IServiceType>(environment.apiUrl + 'ServiceTypes/' + id)
      .pipe(
        tap(st => this.serviceType = st)
      )
  }

  create(serviceType: IServiceType): Observable<IServiceType> {
    return this.httpClient.post<IServiceType>(environment.apiUrl + 'ServiceTypes', serviceType)
      .pipe(
        tap(st => {
          this.serviceTypes.push(st)
          console.log(st)
        })
      )
  }

  delete(id: string | undefined): Observable<string> {
    return this.httpClient.delete<string>(environment.apiUrl + 'ServiceTypes/' + id)
      .pipe(
        tap(mes => console.log(mes))
      )
  }
}

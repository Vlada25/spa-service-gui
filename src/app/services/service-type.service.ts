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

  constructor(
    private httpClient: HttpClient,
    private photoService: PhotoService) { }

  getAll(): Observable<IServiceType[]> {
    return this.httpClient.get<IServiceType[]>('https://localhost:7142/ServiceTypes/GetAll')
      .pipe(
        tap(servTypes => {
          for (let i = 0; i < servTypes.length; i++){
            this.photoService.get(servTypes[i].photoId).subscribe( p => {
              servTypes[i].photoUrl = p.url
            })
          }
          this.serviceTypes = servTypes
        })
      )
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IPhoto } from '../models/photo';
import { IUrl } from '../models/url';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  photo: IPhoto

  constructor(private httpClient: HttpClient) { }

  get(id: string): Observable<IPhoto> {
    return this.httpClient.get<IPhoto>('https://localhost:7142/Photos/Get/' + id)
      .pipe(
        tap( p => this.photo = p )
      )
  }

  getByUrl(url: IUrl): Observable<IPhoto> {
    return this.httpClient.post<IPhoto>('https://localhost:7258/api/Photos/GetByUrl', url)
      .pipe(
        tap( p => this.photo = p )
      )
  }

  create(photo: IPhoto): Observable<IPhoto> {
    return this.httpClient.post<IPhoto>('https://localhost:7142/Photos/Create', photo)
      .pipe(
        tap(p => {
          this.photo = p
          console.log(p)
        })
      )
  }
}

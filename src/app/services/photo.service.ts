import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IPhoto } from '../models/photo';
import { IUrl } from '../models/url';
import { IUserPhoto } from '../models/userPhoto';

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
    return this.httpClient.post<IPhoto>('https://localhost:7142/Photos/GetByUrl', url)
      .pipe(
        tap( p => this.photo = p )
      )
  }

  create(photo: IPhoto): Observable<IPhoto> {
    return this.httpClient.post<IPhoto>('https://localhost:7142/Photos/Create', photo)
      .pipe(
        tap(p => {
          this.photo = p
        })
      )
  }

  delete(id: string | undefined): Observable<string> {
    return this.httpClient.delete<string>('https://localhost:7142/Photos/Delete/' + id)
      .pipe(
        tap(mes => console.log(mes))
      )
  }

  getPhotoIdByUserId(userId: string): Observable<string> {
    return this.httpClient.get<string>('https://localhost:7142/UserPhotos/GetPhotoIdByUserId/' + userId)
  }

  createUserPhoto(userPhoto: IUserPhoto): Observable<IUserPhoto> {
    return this.httpClient.post<IUserPhoto>('https://localhost:7142/UserPhotos/Create', userPhoto);
  }

  deleteUserPhotoByUserId(userId: string): Observable<string> {
    return this.httpClient.delete<string>('https://localhost:7142/UserPhotos/DeleteByUserId/' + userId)
      .pipe(
        tap(mes => console.log(mes))
      )
  }
}

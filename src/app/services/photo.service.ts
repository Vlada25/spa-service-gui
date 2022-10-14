import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IPhoto } from '../models/photo';
import { IUserPhoto } from '../models/userPhoto';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  photo: Uint8Array

  constructor(private httpClient: HttpClient) { }

  get(id: string): Observable<Uint8Array> {
    return this.httpClient.get<Uint8Array>('https://localhost:7142/Photos/ById/' + id)
      .pipe(
        tap( 
          p => {
            this.photo = p
          })
      )
  }

  getByFilename(filename: string): Observable<Uint8Array> {
    return this.httpClient.get<Uint8Array>('https://localhost:7142/Photos/ByFilename/' + filename)
      .pipe(
        tap( p => this.photo = p )
      )
  }

  create(photo: File): Observable<IPhoto> {
    return this.httpClient.post<IPhoto>('https://localhost:7142/Photos/', photo)
  }

  delete(filename: string | undefined): Observable<string> {
    return this.httpClient.delete<string>('https://localhost:7142/Photos/' + filename)
      .pipe(
        tap(mes => console.log(mes))
      )
  }

  getPhotoByUserId(userId: string): Observable<string> {
    return this.httpClient.get<string>('https://localhost:7142/Photos/Users/' + userId)
  }

  createUserPhoto(userId: string, userPhoto: File): Observable<IUserPhoto> {
    return this.httpClient.post<IUserPhoto>('https://localhost:7142/Photos/Users/' + userId, userPhoto);
  }

  deleteUserPhotoByUserId(userId: string): Observable<string> {
    return this.httpClient.delete<string>('https://localhost:7142/Photos/Users/' + userId)
      .pipe(
        tap(mes => console.log(mes))
      )
  }
}

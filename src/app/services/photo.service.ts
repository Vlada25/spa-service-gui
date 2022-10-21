import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IPhoto } from '../models/photo';
import { IUserPhoto } from '../models/userPhoto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  photo: Uint8Array

  constructor(private httpClient: HttpClient) { }

  get(id: string): Observable<Uint8Array> {
    return this.httpClient.get<Uint8Array>(environment.apiUrl + 'Photos/ById/' + id)
      .pipe(
        tap( 
          p => {
            this.photo = p
          })
      )
  }

  getByFilename(filename: string): Observable<Uint8Array> {
    return this.httpClient.get<Uint8Array>(environment.apiUrl + 'Photos/ByFilename/' + filename)
      .pipe(
        tap( p => this.photo = p )
      )
  }

  create(photo: File): Observable<IPhoto> {
    const body = new FormData();
    body.append("file", photo, photo.name)
    return this.httpClient.post<IPhoto>(environment.apiUrl + 'Photos', body)
      .pipe(
        tap(photo => console.log(photo))
      )
  }

  delete(filename: string | undefined): Observable<string> {
    return this.httpClient.delete<string>(environment.apiUrl + 'Photos/' + filename)
      .pipe(
        tap(mes => console.log(mes))
      )
  }

  getPhotoByUserId(userId: string): Observable<string> {
    return this.httpClient.get<string>(environment.apiUrl + 'Photos/Users/' + userId)
  }

  createUserPhoto(userId: string, userPhoto: File): any {
    const body = new FormData();
    body.append("file", userPhoto, userPhoto.name)
    return this.httpClient.post<IUserPhoto>(environment.apiUrl + 'Photos/Users/' + userId, body);
  }

  deleteUserPhotoByUserId(userId: string): Observable<string> {
    return this.httpClient.delete<string>(environment.apiUrl + 'Photos/Users/' + userId)
      .pipe(
        tap(mes => console.log(mes))
      )
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IUser } from '../models/user';
import { PhotoService } from './photo.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: IUser[] = []
  user: IUser

  constructor(
    private httpClient: HttpClient,
    private photoService: PhotoService) { }

  getAll(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>('https://localhost:7142/Users/GetAll')
      .pipe(
        tap(users => {
          this.users = users
        })
      )
  }

  getUserRoles(login: string): Observable<string[]> {
    return this.httpClient.get<string[]>('https://localhost:7142/Roles/GetUserRoles/' + login)
  }

}

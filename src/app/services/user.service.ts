import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../models/user';
import { IClient } from '../models/client';
import { Observable, tap } from 'rxjs';
import { IMaster } from '../models/master';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: IUser[] = []

  constructor(
    private httpClient: HttpClient) { }

  getAll(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>('https://localhost:7142/Users/GetAll')
      .pipe(
        tap(users => {
          for (let i = 0; i < users.length; i++){
            this.getUserRoles(users[i].userName)
              .subscribe(roles => 
                users[i].roles = roles)
          }
          this.users = users
        })
      )
  }

  getUserRoles(login: string): Observable<string[]> {
    return this.httpClient.get<string[]>('https://localhost:7142/Roles/GetUserRoles/' + login)
  }

  createClient(userId: string): Observable<IClient> {
    return this.httpClient.post<IClient>('https://localhost:7142/Clients/Create', {
      userId: userId,
      phoneNumber: ''
    })
  }

  createMaster(userId: string): Observable<IMaster> {
    return this.httpClient.post<IClient>('https://localhost:7142/Masters/Create', {
      userId: userId,
      phoneNumber: ''
    })
  }

}

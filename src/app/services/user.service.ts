import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../models/user';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: IUser[] = []

  constructor(
    private httpClient: HttpClient) { }

  getAll(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(environment.apiUrl + 'Users')
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
    return this.httpClient.get<string[]>(environment.apiUrl + 'Roles/' + login)
  }
}

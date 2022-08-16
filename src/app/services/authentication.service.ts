import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ILoginUser } from '../models/login-user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  token = ''
  isAdmin = true
  
  constructor(private httpClient: HttpClient) { }

  login(loginUser: ILoginUser): Observable<string> {
    return this.httpClient.post<string>('https://localhost:7142/Accounts/Login', loginUser)
      .pipe(
        tap( t => {
          this.token = t
          console.log(t)
         })
      )
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ILoginUser } from '../models/login-user';
import { IRegisterUser } from '../models/register-user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private token = ''
  isAdmin = true
  
  constructor(private httpClient: HttpClient) { }

  login(loginUser: ILoginUser): Observable<string> {
    return this.httpClient.post<string>('https://localhost:7142/Accounts/Login', loginUser)
      .pipe(
        tap(t => {
          this.setToken(t)
          console.log(t)
          localStorage.setItem('token', 'Bearer ' + t)
         })
      )
  }

  setToken(token: string) {
    this.token = token
  }

  getToken(): string {
    return this.token
  }

  isAuthorized(): boolean {
    return this.token.length == 0 ? false : true
  }

  logOut() {
    this.setToken('')
    localStorage.clear
  }

  register(registerUser: IRegisterUser): Observable<string> {
    return this.httpClient.post<string>('https://localhost:7002/api/Accounts/Register', registerUser)
      .pipe(
        tap(mes => console.log(mes))
      )
  }
}

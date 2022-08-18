import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ILoginUser } from '../models/login-user';
import { IRegisterUser } from '../models/register-user';
import { IUser } from '../models/user';
import { PersonService } from './person.service';
import { PhotoService } from './photo.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private token = ''
  currentUser: IUser
  
  constructor(
    private httpClient: HttpClient,
    private photoService: PhotoService,
    private userService: UserService,
    private personService: PersonService) { }

  login(loginUser: ILoginUser): Observable<{token: string}> {
    return this.httpClient.post<{token: string}>('https://localhost:7142/Accounts/Login', loginUser)
      .pipe(
        tap(({token}) => {
          this.setToken(token)
          localStorage.setItem('token', 'Bearer ' + token)
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
    localStorage.setItem('token', '')
    localStorage.setItem('login', '')
    location.reload()
  }

  register(registerUser: IRegisterUser): Observable<string> {
    return this.httpClient.post<string>('https://localhost:7002/api/Accounts/Register', registerUser)
      .pipe(
        tap(mes => console.log(mes))
      )
  }

  getByLogin(login: string): Observable<IUser> {
    return this.httpClient.get<IUser>('https://localhost:7142/Users/Get/' + login)
      .pipe(
        tap(u => {
          u.isPersonExists = false
          this.photoService.getPhotoIdByUserId(u.id)
            .subscribe(photoId => {
              u.photoId = photoId
              this.photoService.get(photoId)
                .subscribe(photo => u.photoUrl = photo.url)
            })
          this.userService.getUserRoles(u.userName)
            .subscribe(roles => {
              u.roles = roles
              if (roles.length === 0) {
                this.personService.getClientByUserId(u.id)
                  .subscribe(c => {
                    u.phoneNumber = c.phoneNumber
                    u.isPersonExists = true
                  })
              }
            })
          this.currentUser = u
          localStorage.setItem('login', u.userName)
        })
      )
  }

  deleteOldPhoto() {
    this.photoService.delete(this.currentUser.photoId)
      .subscribe(() => {})

    this.photoService.deleteUserPhotoByUserId(this.currentUser.id)
      .subscribe(() => {})
  }

  isAdmin(): boolean { 
    if (this.currentUser != null){
      if (this.currentUser.roles?.includes('Admin')){
        return true;
      }
    }
    return false;
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ILoginUser } from '../models/login-user';
import { IRegisterUser } from '../models/register-user';
import { IUser } from '../models/user';
import { PersonService } from './person.service';
import { PhotoService } from './photo.service';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';

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
    return this.httpClient.post<{token: string}>(environment.apiUrl + 'Accounts/Login', loginUser)
      .pipe(
        tap(({token}) => {
          this.setToken(token)
          localStorage.setItem('token', 'Bearer ' + token)
          localStorage.setItem('login', loginUser.userName)
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
    location.reload()
  }

  register(registerUser: IRegisterUser): Observable<string> {
    return this.httpClient.post<string>(environment.apiUrl + 'Accounts/Clients/Register', registerUser)
      .pipe(
        tap(mes => console.log(mes))
      )
  }

  getByLogin(login: string): Observable<IUser> {
    return this.httpClient.get<IUser>(environment.apiUrl + 'Users/ByLogin/' + login)
      .pipe(
        tap(u => {
          this.photoService.getPhotoByUserId(u.id)
            .subscribe(photo => {
              u.photoSrc = "data:image/jpg;base64," + photo
            })
          this.userService.getUserRoles(u.userName)
            .subscribe(roles => {
              u.roles = roles
              if (roles.includes('Master')) {
                this.personService.getMasterByUserId(u.id)
                  .subscribe(m => {
                    u.phoneNumber = m.phoneNumber
                    u.surname = m.surname
                    u.name = m.name
                    u.middleName = m.middleName
                  })
              }
              else {
                this.personService.getClientByUserId(u.id)
                  .subscribe(c => {
                    u.phoneNumber = c.phoneNumber
                    u.surname = c.surname
                    u.name = c.name
                    u.middleName = c.middleName
                  })
              }
            })
          this.currentUser = u
        })
      )
  }

  deleteOldPhoto() {
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

  isMaster(): boolean { 
    if (this.currentUser != null){
      if (this.currentUser.roles?.includes('Master')){
        return true;
      }
    }
    return false;
  }
}

import { Component, OnInit } from '@angular/core';
import { ILoginUser } from 'src/app/models/login-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit {

  loginUser: ILoginUser;
  isAuthorized = false

  constructor(
    public authService: AuthenticationService,
    public userService: UserService,
    public modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe(() => {})
  }

  login(userName: string, password: string) {
    this.loginUser.userName = userName
    this.loginUser.password = password
    this.authService.login(this.loginUser).subscribe( () => {} )
  }

}

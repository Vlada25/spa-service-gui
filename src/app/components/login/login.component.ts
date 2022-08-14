import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    login: new FormControl<string>('', [
      Validators.required
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6)
    ])
  })

  constructor(
    private authService: AuthenticationService,
    private modalService: ModalService) { }

  get login() {
    return this.form.controls.login as FormControl
  }

  get password() {
    return this.form.controls.password as FormControl
  }

  ngOnInit(): void {
  }

  submit() {
    this.authService.login({
      userName: this.form.value.login as string,
      password: this.form.value.password as string
    }).subscribe( () => {
      this.modalService.close()
    })
  }

}

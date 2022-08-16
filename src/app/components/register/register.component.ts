import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IRegisterUser } from 'src/app/models/register-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form = new FormGroup({
    surname: new FormControl<string>('', [
      Validators.required
    ]),
    name: new FormControl<string>('', [
      Validators.required
    ]),
    middleName: new FormControl<string>('', [
      Validators.required
    ]),
    login: new FormControl<string>('', [
      Validators.required
    ]),
    email: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/)
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(/(?=.*[0-9])(?=.*[a-z])/g),
      Validators.minLength(6)
    ]),
    confirmPassword: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(/(?=.*[0-9])(?=.*[a-z])/g),
      Validators.minLength(6)
    ]),
    roles: new FormControl<string[]>([])
  })

  constructor(
    private authService: AuthenticationService,
    private modalService: ModalService) { }

  get surname() {
    return this.form.controls.surname as FormControl
  }

  get name() {
    return this.form.controls.name as FormControl
  }

  get middleName() {
    return this.form.controls.middleName as FormControl
  }

  get login() {
    return this.form.controls.login as FormControl
  }

  get email() {
    return this.form.controls.email as FormControl
  }

  get password() {
    return this.form.controls.password as FormControl
  }

  get confirmPassword() {
    return this.form.controls.confirmPassword as FormControl
  }

  get roles() {
    return this.form.controls.roles as FormControl
  }

  ngOnInit(): void {
  }

  submit() {
    var regUser: IRegisterUser = 
    {
      surmane: this.form.value.surname as string,
      name: this.form.value.name as string,
      middleName: this.form.value.middleName as string,
      userName: this.form.value.login as string,
      email: this.form.value.email as string,
      password: this.form.value.password as string,
      confirmPassword: this.form.value.confirmPassword as string,
      roles: this.form.value.roles as string[]
    }

    console.log(regUser)

    this.authService.register(regUser).subscribe( () => {
      this.modalService.close()
    })
  }

}

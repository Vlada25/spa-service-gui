import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { PersonService } from './services/person.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
   
  constructor(
    private authService: AuthenticationService,
    private personService: PersonService) {}

  ngOnInit(): void {
    const potentialToken = localStorage.getItem('token')

    if (potentialToken != null){
      this.authService.setToken(potentialToken)
      this.authService.getByLogin(localStorage.getItem('login') as string)
        .subscribe(() => {})
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { OrderService } from 'src/app/services/order.service';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css']
})
export class OrdersPageComponent implements OnInit {

  loading = false
  status = 'All'

  constructor(
    public orderService: OrderService,
    public personService: PersonService,
    public authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.loading = true
    this.authService.getByLogin(localStorage.getItem('login') as string)
        .subscribe(user => {
          this.personService.getClientByUserId(user.id)
            .subscribe(client => {
              this.orderService.getByClientId(client.id).subscribe(() => {
                this.loading = false
              })
            })
        })
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IOrder } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orders: IOrder[]
  
  constructor(
    private httpClient: HttpClient) { }

  getAll(): Observable<IOrder[]> {
    return this.httpClient.get<IOrder[]>('https://localhost:7142/Orders/GetAll')
      .pipe(
        tap(orders => {
          this.orders = orders
        })
      )
  }
}

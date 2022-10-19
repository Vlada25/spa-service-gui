import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IOrder } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orders: IOrder[]
  currentOrder: IOrder
  
  constructor(
    private httpClient: HttpClient) { }

  getAll(): Observable<IOrder[]> {
    return this.httpClient.get<IOrder[]>('https://localhost:7142/Orders')
      .pipe(
        tap(orders => {
          this.orders = orders
        })
      )
  }

  getByClientId(clientId: string | undefined): Observable<IOrder[]> {
    return this.httpClient.get<IOrder[]>('https://localhost:7142/Orders/Clients/' + clientId)
      .pipe(
        tap(orders => {
          this.orders = orders
        })
      )
  }

  getByScheduleId(scheduleId: string | undefined): Observable<IOrder> {
    return this.httpClient.get<IOrder>('https://localhost:7142/Orders/Schedules/' + scheduleId)
      .pipe(
        tap(order => {
          this.currentOrder = order
        })
      )
  }

  create(order: IOrder): Observable<IOrder> {
    return this.httpClient.post<IOrder>('https://localhost:7142/Orders', order)
      .pipe(
        tap(order => console.log(order))
      )
  }

  update(id: string | undefined, order: IOrder): Observable<string> {
    return this.httpClient.put<string>('https://localhost:7142/Orders/' + id, order)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IOrder } from '../models/order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orders: IOrder[]
  currentOrder: IOrder
  
  constructor(
    private httpClient: HttpClient) { }

  getAll(): Observable<IOrder[]> {
    return this.httpClient.get<IOrder[]>(environment.apiUrl + 'Orders')
      .pipe(
        tap(orders => {
          this.orders = orders
        })
      )
  }

  getById(id: string | undefined): Observable<IOrder> {
    return this.httpClient.get<IOrder>(environment.apiUrl + 'Orders/' + id)
  }

  getByClientId(clientId: string | undefined): Observable<IOrder[]> {
    return this.httpClient.get<IOrder[]>(environment.apiUrl + 'Orders/Clients/' + clientId)
      .pipe(
        tap(orders => {
          this.orders = orders
        })
      )
  }

  getByScheduleId(scheduleId: string | undefined): Observable<IOrder> {
    return this.httpClient.get<IOrder>(environment.apiUrl + 'Orders/Schedules/' + scheduleId)
      .pipe(
        tap(order => {
          this.currentOrder = order
        })
      )
  }

  create(order: IOrder): Observable<IOrder> {
    return this.httpClient.post<IOrder>(environment.apiUrl + 'Orders', order)
      .pipe(
        tap(order => console.log(order))
      )
  }

  update(id: string | undefined, order: IOrder): Observable<string> {
    return this.httpClient.put<string>(environment.apiUrl + 'Orders/' + id, order)
  }
}

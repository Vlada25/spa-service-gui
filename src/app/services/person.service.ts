import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IClient } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  currentClient: IClient

  constructor(private httpClient: HttpClient) { }

  getClientByUserId(userId: string): Observable<IClient> {
    return this.httpClient.get<IClient>('https://localhost:7142/Clients/GetByUserId/' + userId)
  }

  createClient(client: IClient): Observable<IClient> {
    return this.httpClient.post<IClient>('https://localhost:7142/Clients/Create', client)
  }
}

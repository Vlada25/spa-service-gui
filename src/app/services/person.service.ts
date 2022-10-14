import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IClient } from '../models/client';
import { IMaster } from '../models/master';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  currentClient: IClient
  mastersByAddress: Array<IMaster>

  constructor(private httpClient: HttpClient) { }

  getClientByUserId(userId: string): Observable<IClient> {
    return this.httpClient.get<IClient>('https://localhost:7142/Clients/Users/' + userId)
      .pipe(
        tap(client => this.currentClient = client)
      )
  }

  updateClient(id: string | undefined, client: IClient): Observable<string> {
    return this.httpClient.put<string>('https://localhost:7142/Clients/' + id, client)
  }

  getMastersByAddressId(addressId: string | undefined): Observable<Array<IMaster>> {
    return this.httpClient.get<Array<IMaster>>('https://localhost:7142/Masters/Addresses/' + addressId)
      .pipe(
        tap(masters => this.mastersByAddress = masters)
      )
  }
}

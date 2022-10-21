import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IClient } from '../models/client';
import { IMaster } from '../models/master';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  currentClient: IClient
  currentMaster: IMaster
  mastersByAddress: Array<IMaster>

  constructor(private httpClient: HttpClient) { }

  getClientByUserId(userId: string): Observable<IClient> {
    return this.httpClient.get<IClient>(environment.apiUrl + 'Clients/Users/' + userId)
      .pipe(
        tap(client => this.currentClient = client)
      )
  }

  getMasterByUserId(userId: string): Observable<IMaster> {
    return this.httpClient.get<IMaster>(environment.apiUrl + 'Masters/Users/' + userId)
      .pipe(
        tap(master => this.currentMaster = master)
      )
  }

  updateClient(id: string | undefined, client: IClient): Observable<string> {
    return this.httpClient.put<string>(environment.apiUrl + 'Clients/' + id, client)
  }

  getMastersByAddressId(addressId: string | undefined): Observable<Array<IMaster>> {
    return this.httpClient.get<Array<IMaster>>(environment.apiUrl + 'Masters/Addresses/' + addressId)
      .pipe(
        tap(masters => this.mastersByAddress = masters)
      )
  }
}

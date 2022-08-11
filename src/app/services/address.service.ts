import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';
import { IAddress } from '../models/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<IAddress[]> {
    return this.httpClient.get<IAddress[]>('https://localhost:7043/api/Addresses/GetAll')
  }
}

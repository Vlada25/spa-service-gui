import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IPhoto } from '../models/photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  photo: IPhoto

  constructor(private httpClient: HttpClient) { }

  get(id: string): Observable<IPhoto> {
    return this.httpClient.get<IPhoto>('https://localhost:7142/Photos/Get/' + id)
      .pipe(
        tap( p => this.photo = p )
      )
  }
}

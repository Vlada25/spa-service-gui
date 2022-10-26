import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IFeedback } from '../models/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  feedbacks: IFeedback[]

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<IFeedback[]> {
    return this.httpClient.get<IFeedback[]>(environment.apiUrl + 'Feedbacks')
      .pipe(
        tap(feedbacks => {
          this.feedbacks = feedbacks
        })
      )
  }

  getByOrderId(orderId: string | undefined): Observable<IFeedback[]> {
    return this.httpClient.get<IFeedback[]>(environment.apiUrl + 'Feedbacks/Orders/' + orderId)
  }

  create(feedback: IFeedback): Observable<IFeedback>{ 
    return this.httpClient.post<IFeedback>(environment.apiUrl + 'Feedbacks', feedback)
  }
}

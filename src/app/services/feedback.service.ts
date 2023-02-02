import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { Feedback } from '../shared/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient) { }


  sendPostRequest(data: Feedback | undefined): Observable<any> {
    return this.http.post<Feedback>(baseURL+"feedback", data);
}

sendPostRequestPut(data: Feedback | undefined): Observable<any> {
  return this.http.put<Feedback>(baseURL+"feedback", data);
}


}

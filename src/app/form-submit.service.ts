import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { ContactFormEntry } from './contact-entry';
import { SubscribeFormEntry } from './subscribe-entry';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormSubmitService {

  constructor(private http: HttpClient) { }


  private contactUrl: string = `${environment.apiUrl}/api/comments`
  private subscribeUrl: string = `${environment.apiUrl}/api/subscribe`

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  submitSubscribeForm(formData: SubscribeFormEntry): Observable<SubscribeFormEntry> {
    return this.http.post<SubscribeFormEntry>(this.subscribeUrl, {'data': formData}, this.httpOptions)
  }

  submitContactForm(formData: ContactFormEntry): Observable<ContactFormEntry> {    
    return this.http.post<ContactFormEntry>(this.contactUrl, {'data': formData}, this.httpOptions)
      // .pipe(
      //   catchError(this.handleError('submitForm', formData))
      // ) //TODO implement this error handling https://angular.io/guide/http#handling-request-errors
  }

}

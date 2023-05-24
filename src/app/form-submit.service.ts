import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ContactFormEntry } from './contact-entry';
import { SubscribeFormEntry } from './subscribe-entry';
import { SubscribeResponse} from "./subscribe-entry";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormSubmitService {

  constructor(private http: HttpClient) { }


  private contactUrl: string = `${environment.apiUrl}/api/comments`
  private subscribeUrl: string = `${environment.apiUrl}/api/auth/local/register`

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    // observe: "response",
  }


  private options2 = {
    observe: 'response',
    responseType: 'json'
  }

  submitSubscribeForm(formData: SubscribeFormEntry) {
    let requestBody = {
      'username': formData.email,
      'email': formData.email,
      'password': formData.password
    }
    return this.http.post(this.subscribeUrl, requestBody, {headers: this.httpOptions.headers, observe:'response', responseType:'json'})
      .pipe(
        catchError(this.handleError)
      );
  };

  submitContactForm(formData: ContactFormEntry): Observable<HttpResponse<any>> {
    return this.http.post<ContactFormEntry>(this.contactUrl, {'data': formData}, {headers: this.httpOptions.headers, observe:'response', responseType:'json'})
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status == 0) {
      // A client side or network error
      console.error('An error occurred:', error.error)
    } else {
      // Backend returned an error code
      console.error(`Backend returned code ${error.status}, body was: `, error.error)
    }
    // Return observable with a user facing error message
    return throwError(() => new Error('Something went wrong! Please try again.'))
  }

}

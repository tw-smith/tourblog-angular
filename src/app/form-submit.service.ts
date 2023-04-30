import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ContactFormEntry } from './contact-entry';
import { SubscribeFormEntry } from './subscribe-entry';
import { SubscribeResponse } from './subscribe-entry';
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
    })
  }

  submitSubscribeForm(formData: SubscribeFormEntry): Observable<SubscribeResponse> {
    let requestBody = {
      'usernameas': formData.email,
      'email': formData.email,
      'password': formData.password
    }
    return this.http.post<SubscribeResponse>(this.subscribeUrl, requestBody, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  submitContactForm(formData: ContactFormEntry): Observable<ContactFormEntry> {    
    return this.http.post<ContactFormEntry>(this.contactUrl, {'data': formData}, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
      // .pipe(
      //   catchError(this.handleError('submitForm', formData))
      // ) //TODO implement this error handling https://angular.io/guide/http#handling-request-errors
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status == 0) {
      // A client side or network error.
      console.error('An error ocurred:', error.error)
    } else {
      // Backend returned an error code
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user facing error message
    return throwError(() => new Error('Something went wrong! Please try again.'))
  }

}

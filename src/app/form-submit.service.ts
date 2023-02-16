import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { ContactFormEntry } from './contact-entry';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormSubmitService {

  constructor(private http: HttpClient) { }


  private createCommentUrl: string = `${environment.apiUrl}/api/comments`

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  submitForm(formData: ContactFormEntry): Observable<ContactFormEntry> {    
    return this.http.post<ContactFormEntry>(this.createCommentUrl, {'data': formData}, this.httpOptions)
      // .pipe(
      //   catchError(this.handleError('submitForm', formData))
      // ) //TODO implement this error handling https://angular.io/guide/http#handling-request-errors
  }

}

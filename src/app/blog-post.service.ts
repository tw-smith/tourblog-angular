import { Injectable } from '@angular/core';
import { Post } from './post';
import { environment } from 'src/environments/environment';

import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private http: HttpClient, private  router: Router) { }

  private handleError = (error: HttpErrorResponse) => {
    if (error.status === 0) {
      // a client or network error occured. Handle accordingly
      console.error('An error occurred:', error.error)
    } else {
      this.router.navigate(['/', '404'])
    }
    return throwError(() => new Error('404'))
  }

  getPost(slug: string): Observable<Post[]>{
    const postUrl = `${environment.apiUrl}/api/posts/${slug}`
    return this.http.get<Post[]>(postUrl).pipe(catchError(this.handleError))
 }
}

import { Injectable } from '@angular/core';
import { SplashURL } from './post';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SplashImageService {

  constructor(private http: HttpClient) { }



  getSplashURL(): Observable<SplashURL>{
    const errorSplashURL = "http://127.0.0.1:1337/api/error-page"
    return this.http.get<SplashURL>(errorSplashURL)
 }


}

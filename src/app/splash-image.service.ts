import { Injectable } from '@angular/core';
import { SplashURL } from './post';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SplashImageService {

  constructor(private http: HttpClient) { }



  getSplashURL(): Observable<SplashURL>{
    const errorSplashURL = `${environment.apiUrl}/api/error-page`
    return this.http.get<SplashURL>(errorSplashURL)
 }


}

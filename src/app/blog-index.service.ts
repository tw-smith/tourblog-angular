import { Injectable } from '@angular/core';
import { PostIndexItem } from './post';


import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogIndexService {

  constructor(private http: HttpClient) {}

  private postsUrl = 'http://127.0.0.1:1337/api/posts-index'

  getPostIndex(): Observable<PostIndexItem[]>{
     return this.http.get<PostIndexItem[]>(this.postsUrl)
  }

}

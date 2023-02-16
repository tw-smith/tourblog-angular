import { Injectable } from '@angular/core';
import { PostIndexItem } from './post';
import { environment } from 'src/environments/environment';


import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogIndexService {

  constructor(private http: HttpClient) {}


  private postsUrl: string  = "" 
  

  getPostIndex(tag: string | null): Observable<PostIndexItem[]>{
    console.log(`tagtagtag is ${tag}`)
    if (tag == null) {
      this.postsUrl = `${environment.apiUrl}/api/posts-index`
    } else {
      this.postsUrl = `${environment.apiUrl}/api/posts-index/${tag}`
    }
     
     return this.http.get<PostIndexItem[]>(this.postsUrl)
  }

}

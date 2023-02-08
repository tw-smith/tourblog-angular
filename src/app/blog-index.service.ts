import { Injectable } from '@angular/core';
import { PostIndexItem } from './post';


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
      console.log("in null getpostindex branch")
      this.postsUrl = `http://127.0.0.1:1337/api/posts-index`
    } else {
      console.log("in not null branch")
      this.postsUrl = `http://127.0.0.1:1337/api/posts-index/${tag}`
    }
     
     return this.http.get<PostIndexItem[]>(this.postsUrl)
  }

}

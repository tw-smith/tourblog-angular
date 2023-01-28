import { Component } from '@angular/core';
import { BlogIndexService } from '../blog-index.service';
import { Post, PostIndexItem } from '../post';
//import { PostListItem } from '../postlist';



@Component({
  selector: 'app-blog-index',
  templateUrl: './blog-index.component.html',
  styleUrls: ['./blog-index.component.css']
})
export class BlogIndexComponent {
  constructor(private blogIndexService: BlogIndexService) {}

  posts: PostIndexItem[] = [];


   getPosts(): void {
    this.blogIndexService.getPostIndex().subscribe(resp => {
      this.posts = resp;
     })
   }

   formatDate(value:string, locale='en-GB') {
    return new Date(value).toLocaleDateString(locale, {day: 'numeric', month: 'long', year: 'numeric'});
   }


  ngOnInit(): void {
    this.getPosts();
  }
}

import { Component, Input } from '@angular/core';
import { BlogIndexService } from '../blog-index.service';
import { PostIndexItem } from '../post';




@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private blogIndexService: BlogIndexService) {}
  @Input() siteTitle!: string;


  posts: PostIndexItem[] = [];
  tags: string[] = [];

   getPosts(): void { //TODO at the moment we make two API calls for post-index, one for navbar tags 
                      // and one for post mosaic view. Surely we can share the data and only make one API call?
    this.blogIndexService.getPostIndex().subscribe(resp => {
      this.posts = resp;
      this.getTags()
     })
   }


   getTags(): void {
      this.tags = [...new Set(this.posts.map(({tag}) => tag))];
   }


   ngOnInit(): void {
    this.getPosts();
  }



}

import { Component } from '@angular/core';
import { BlogIndexService } from '../blog-index.service';
import { Post, PostIndexItem } from '../post';
import { ActivatedRoute, Route, Router } from '@angular/router';
//import { PostListItem } from '../postlist';



@Component({
  selector: 'app-blog-index',
  templateUrl: './blog-index.component.html',
  styleUrls: ['./blog-index.component.css']
})
export class BlogIndexComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogIndexService: BlogIndexService) {
    }

  posts: PostIndexItem[] = [];


   getPosts(): void {
    let tag = String(this.route.snapshot.paramMap.get('tag'));
    console.log(`tag is ${tag}`)
    this.blogIndexService.getPostIndex(tag).subscribe(resp => {
      this.posts = resp;
     })
   }

   formatDate(value:string, locale='en-GB') {
    return new Date(value).toLocaleDateString(locale, {day: 'numeric', month: 'long', year: 'numeric'});
   }


  ngOnInit(): void {

    this.getPosts();
     this.route.params.subscribe((params) => {
      if (params['tag'] == null) {
        console.log('null tag')
        return
      }
      this.router.navigate([`/posts/${params['tag']}`])
      .then(nav => {
        this.getPosts()
        console.log(nav);
      }, err => {
        console.log(err)
      })

     })

      
    }



    
  }


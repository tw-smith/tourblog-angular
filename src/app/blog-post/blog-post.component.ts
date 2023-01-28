import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPostService } from '../blog-post.service';
import { Post } from '../post';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent {
  constructor(
    private route: ActivatedRoute,
    private blogPostService: BlogPostService) {}

  post: Post[] = [];

  getPost(): void {
    const slug = String(this.route.snapshot.paramMap.get('slug'));
    this.blogPostService.getPost(slug).subscribe(resp => {
      this.post = resp
    })
  }

  ngOnInit(): void {
    this.getPost();
  }
}
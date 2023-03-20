import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPostService } from '../blog-post.service';
import { Post } from '../post';
import { ResponsiveService } from '../responsive.service';
import { Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})

export class BlogPostComponent {
  constructor(
    private route: ActivatedRoute,
    private blogPostService: BlogPostService,
    private responsiveService: ResponsiveService) {}

  post: Post[] = [];
  Breakpoints = Breakpoints;
  currentBreakpoint: string = '';
  isHandsetPortrait: boolean = false;
  isHandsetLandscape: boolean = false;
  isTablet: boolean = false;
  isWebLandscape: boolean = true;

  ngOnInit(): void {
    this.responsiveService.breakpointChanged().subscribe((state) => {
      this.isHandsetPortrait = state.breakpoints[Breakpoints.HandsetPortrait];
      this.isHandsetLandscape = state.breakpoints[Breakpoints.HandsetLandscape];
      this.isWebLandscape = state.breakpoints[Breakpoints.WebLandscape];
      this.isTablet = (state.breakpoints[Breakpoints.TabletLandscape] || state.breakpoints[Breakpoints.TabletPortrait])
    })

    this.getPost();
  }

  get postTitle() {
    return (this.post[0] && this.post[0].title) ? this.post[0].title : null
  }

  get postSubTitle() {
    return (this.post[0] && this.post[0].subtitle) ? this.post[0].subtitle : null
  }

  get postContent() {
    return (this.post[0] && this.post[0].content) ? this.post[0].content : null
  }

  getPost(): void {
    const slug = String(this.route.snapshot.paramMap.get('slug'));
    this.blogPostService.getPost(slug).subscribe(resp => {
      if (resp[0].photos !== null) {
        this.sortPhotoArray(resp[0])
      }
      this.post = resp
    })
  }

  sortPhotoArray(post: Post) {
    post.photos.sort(function(a,b) {
      // https://stackoverflow.com/questions/609574/get-the-first-integers-in-a-string-with-javascript
      const regex = /\d+/;
      const a_index = a.url.match(regex).shift();
      const b_index = b.url.match(regex).shift();
      return a_index - b_index;
    })
  }
}
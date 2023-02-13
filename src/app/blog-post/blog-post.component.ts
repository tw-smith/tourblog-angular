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

  getPost(): void {
    const slug = String(this.route.snapshot.paramMap.get('slug'));
    this.blogPostService.getPost(slug).subscribe(resp => {
      this.post = resp
    })
  }


}